import { NextRequest } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Configure for larger payloads
export const maxDuration = 300 // 5 minutes
export const bodySizeLimit = '50mb'

function toBase64(buffer: ArrayBuffer): string {
  const bytes = Buffer.from(buffer)
  return bytes.toString("base64")
}

// Helper function to process large files more efficiently
async function processFileEfficiently(file: File): Promise<string> {
  const CHUNK_SIZE = 1024 * 1024 // 1MB chunks
  const chunks: Uint8Array[] = []
  
  let offset = 0
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + CHUNK_SIZE)
    const arrayBuffer = await chunk.arrayBuffer()
    chunks.push(new Uint8Array(arrayBuffer))
    offset += CHUNK_SIZE
  }
  
  // Combine chunks and convert to base64
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const combined = new Uint8Array(totalLength)
  let position = 0
  
  for (const chunk of chunks) {
    combined.set(chunk, position)
    position += chunk.length
  }
  
  return Buffer.from(combined).toString("base64")
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response("Missing GEMINI_API_KEY", { status: 500 })
    }

    const formData = await req.formData()
    const username = String(formData.get("username") || "").trim()
    if (!username) {
      return new Response("Username is required", { status: 400 })
    }

    const files = formData.getAll("files").filter(Boolean) as File[]
    if (!files.length) {
      return new Response("No files uploaded", { status: 400 })
    }

    // Check file sizes before processing
    const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return new Response(`File ${file.name} is too large. Maximum size is 50MB.`, { status: 413 })
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const parts: Array<{ inlineData: { data: string; mimeType: string } }> = []
    
    // Process files more efficiently for large files
    for (const file of files) {
      console.log(`Processing file: ${file.name}, size: ${file.size} bytes`)
      
      let base64: string
      if (file.size > 10 * 1024 * 1024) { // If file is larger than 10MB
        base64 = await processFileEfficiently(file)
      } else {
        const arrayBuffer = await file.arrayBuffer()
        base64 = toBase64(arrayBuffer)
      }
      
      const mimeType = file.type || "application/octet-stream"
      parts.push({ inlineData: { data: base64, mimeType } })
    }

    const prompt = `You are a brutally honest interview coach . Analyze the provided interview media and generate detailed, critical feedback for BOTH the interviewee and the recruiter.
Return strict JSON matching this TypeScript type:
type Analysis = {
  interviewee: {
    whatWentWell: string[];
    whatCouldImprove: string[];
    actionableTips: string[];
  };
  recruiter: {
    areasMissed: string[];
    suggestedQuestions: string[];
  };
};
Rules:
- Respond with JSON ONLY. No prose, no explanations, no code fences.
- Keep the JSON minimal and valid. Do not include trailing commas.
- Populate each array with 7-8 detailed, brutally honest bullet-style strings.
- Be direct and critical. Don't sugarcoat feedback.
- Focus on specific, actionable insights that will genuinely improve performance.
- For interviewee feedback: identify weaknesses, communication issues, and missed opportunities.
- For recruiter feedback: highlight gaps in questioning, missed red flags, and areas that needed deeper exploration.`

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [...parts, { text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    })

    const text = result.response.text()
    let json: Record<string, unknown>
    try {
      json = JSON.parse(text)
    } catch {
      // try to salvage JSON from potential formatting
      let extracted = text
      // 1) code fence with json
      let fence = extracted.match(/```json[\r\n]+([\s\S]*?)```/i)
      if (fence && fence[1]) {
        extracted = fence[1]
      } else {
        // 2) any code fence
        fence = extracted.match(/```[\r\n]+([\s\S]*?)```/)
        if (fence && fence[1]) extracted = fence[1]
      }
      // 3) slice from first { to last }
      const firstBrace = extracted.indexOf("{")
      const lastBrace = extracted.lastIndexOf("}")
      if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        return new Response("Model did not return valid JSON", { status: 502 })
      }
      const possible = extracted.slice(firstBrace, lastBrace + 1)
      json = JSON.parse(possible)
    }

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: unknown) {
    console.error(err)
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error"
    return new Response(errorMessage, { status: 500 })
  }
}


