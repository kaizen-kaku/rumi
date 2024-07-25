import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatInput({ input, handleSubmit, handleInputChange, isLoading }: any) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 rounded-l-full border-r-0 bg-secondary px-6 py-3 text-sm placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     selection:bg-primary selection:text-white"
          placeholder="Send a message..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-r-full bg-secondary px-6 text-sm font-medium text-white shadow-sm 
                     hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     transition-colors duration-200"
          disabled={isLoading}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
}