import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, type } = await req.json()

  let systemPrompt = ""

  if (type === "continue") {
    systemPrompt = `You are a skilled writer helping to continue a blog post. Continue the content naturally from where it left off. Match the tone and style. Output only the continuation, no explanations.`
  } else if (type === "improve") {
    systemPrompt = `You are an expert editor. Improve the following text for clarity, engagement, and flow while maintaining the author's voice. Output only the improved version.`
  } else if (type === "generate") {
    systemPrompt = `You are a creative blog writer. Generate engaging, well-structured blog content based on the given topic or outline. Use clear paragraphs, compelling language, and a professional yet approachable tone.`
  } else if (type === "summary") {
    systemPrompt = `You are an expert at creating concise summaries. Create a brief 2-3 sentence summary that captures the main points and key takeaways of the blog post. Make it engaging and informative.`
  }

  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    system: systemPrompt,
    prompt,
    maxOutputTokens: 2000,
  })

  return result.toUIMessageStreamResponse()
}
