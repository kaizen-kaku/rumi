import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `You are a helpful assistant. The date is "${new Date().toLocaleString()}"`,
    messages,
  });

  return result.toAIStreamResponse();
}