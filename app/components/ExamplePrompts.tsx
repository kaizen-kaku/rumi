import { LightBulbIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const examplePrompts = [
  { icon: LightBulbIcon, text: "Explain quantum computing" },
  { icon: CodeBracketIcon, text: "Write a Python function to calculate Fibonacci numbers" },
  { icon: GlobeAltIcon, text: "What are the top 5 tourist attractions in Tokyo?" },
];

export default function ExamplePrompts() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold text-white mb-6">Example prompts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examplePrompts.map((prompt, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <prompt.icon className="h-6 w-6 text-indigo-400 mr-3" />
            <span className="text-sm text-gray-300">{prompt.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}