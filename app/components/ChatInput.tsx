export default function ChatInput({ input, handleSubmit, handleInputChange, isLoading }: any) {
  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t border-gray-200">
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={input}
        placeholder="Type your message..."
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}