import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatInput({ input, handleSubmit, handleInputChange, isLoading }: any) {
  return (
    <div className="border-t border-surface-light px-4 py-4 sm:px-6">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          className="flex-1 rounded-md border border-surface-light bg-secondary px-3 py-2 text-sm placeholder-text-white focus:border-primary focus:ring-1 focus:ring-primary text-white"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-text shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={isLoading}
        >
          <PaperAirplaneIcon className="h-5 w-5" color="white"/>
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
}