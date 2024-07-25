'use client';

import { useChat } from 'ai/react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

// Define a type that matches what ChatMessages expects
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatComponent() {
  const { messages: rawMessages, input, handleSubmit, handleInputChange, isLoading } = useChat();

  // Map and filter messages to match ChatMessage type
  const messages: ChatMessage[] = rawMessages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      id: message.id,
      role: message.role as 'user' | 'assistant',
      content: message.content
    }));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl h-[80vh] bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
        <ChatMessages messages={messages} />
        <ChatInput
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}