import { NextRequest } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toBase64(buffer: ArrayBuffer): string {
  const bytes = Buffer.from(buffer)
  return bytes.toString("base64")
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

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const parts: Array<{ inlineData: { data: string; mimeType: string } }> = []
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const base64 = toBase64(arrayBuffer)
      const mimeType = file.type || "application/octet-stream"
      parts.push({ inlineData: { data: base64, mimeType } })
    }

    const prompt = `You are a brutally honest interview coach. Analyze the provided interview media and generate detailed, critical feedback for BOTH the interviewee and the recruiter.
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


