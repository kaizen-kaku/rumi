export default function ChatMessages({ messages }: any) {
  return (
    <div className="flex-grow overflow-y-auto p-4">
      {messages.map((message: any) => (
        <div
          key={message.id}
          className={`max-w-[70%] mb-4 p-3 rounded-lg ${
            message.role === 'user'
              ? 'ml-auto bg-blue-500 text-white'
              : 'mr-auto bg-gray-200 text-gray-800'
          }`}
        >
          <div className="break-words">{message.content}</div>
        </div>
      ))}
    </div>
  );
}