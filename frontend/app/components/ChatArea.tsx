import { useRef, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatArea({ chatHook }: { chatHook: any }) {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = chatHook;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto ml-24 mr-24">
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 mb-2">
        <ChatInput
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}