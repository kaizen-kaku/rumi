import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRef, useEffect } from 'react';

export default function ChatInput({ input, handleSubmit, handleInputChange, isLoading }: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="px-4 py-4 sm:px-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <textarea
          ref={textareaRef}
          className="flex-1 rounded-l-full border-r-0 bg-secondary px-6 py-3 text-sm placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     selection:bg-primary selection:text-white resize-none overflow-hidden min-h-[44px] max-h-[200px]"
          placeholder="Send a message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-r-full bg-secondary px-6 text-sm font-medium text-white shadow-sm 
                     hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     transition-colors duration-200 self-end h-[44px]"
          disabled={isLoading}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
}