declare module "@google/generative-ai" {
  export class GoogleGenerativeAI {
    constructor(apiKey: string)
    getGenerativeModel(options: { model: string }): GenerativeModel
  }

  export interface GenerativeModel {
    generateContent(request: {
      contents: Array<{
        role: string
        parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }>
      }>
      generationConfig?: { responseMimeType?: string }
    }): Promise<{
      response: {
        text(): string
      }
    }>
  }
}





