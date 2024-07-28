import { CoreMessage, streamText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/api',
});

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: ollama('llama3.1:8b'),
    system: `You are a helpful assistant. The date is "${new Date().toLocaleString()}"`,
    messages,
  });

  return result.toAIStreamResponse();
}
