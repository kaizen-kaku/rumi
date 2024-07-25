'use client';

import { useChat } from 'ai/react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatComponent() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat();

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