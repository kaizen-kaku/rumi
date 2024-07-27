import { CoreMessage, streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';
import { ollama } from 'ollama-ai-provider';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: ollama('llama3.1:8b'),
    system: `You are a helpful assistant. The date is "${new Date().toLocaleString()}"`,
    messages,
  });

  return result.toAIStreamResponse();
}