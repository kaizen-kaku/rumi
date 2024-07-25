"use client"
import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Components } from 'react-markdown';



interface Message {
  id: string | number;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const renderText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(renderText).join('');
  if (typeof children === 'object' && children !== null && 'props' in children && 'children' in (children as any).props) {
    return renderText((children as any).props.children);
  }
  return '';
};

const CodeBlock: React.FC<{ codeString: string; language: string }> = ({ codeString, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);  // Reset after 3 seconds
  }, [codeString]);

  return (
    <div className="relative my-2">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ padding: '1rem', borderRadius: '0.375rem' }}
        showLineNumbers={true}
        wrapLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
      <button
        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs transition-all duration-200 ease-in-out
          ${copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        onClick={handleCopy}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : 'Copy'}
      </button>
    </div>
  );
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const components: Components = {
    p: ({children}) => <p className="mb-2 last:mb-0">{renderText(children)}</p>,
    ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
    li: ({children}) => <li className="mb-1">{renderText(children)}</li>,
    h1: ({children}) => <h1 className="text-2xl font-bold mb-2">{renderText(children)}</h1>,
    h2: ({children}) => <h2 className="text-xl font-bold mb-2">{renderText(children)}</h2>,
    h3: ({children}) => <h3 className="text-lg font-bold mb-2">{renderText(children)}</h3>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">{renderText(children)}</blockquote>,
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      return !inline && match ? (
        <CodeBlock codeString={codeString} language={match[1]} />
      ) : (
        <code className={`${className} bg-gray-100 text-gray-800 rounded px-1 py-0.5`} {...props}>
          {codeString}
        </code>
      );
    },
    table: ({children}) => (
      <div className="overflow-x-auto my-2">
        <table className="border-collapse border border-gray-300 w-full">
          {children}
        </table>
      </div>
    ),
    th: ({children}) => (
      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold">
        {renderText(children)}
      </th>
    ),
    td: ({children}) => (
      <td className="border border-gray-300 px-4 py-2">
        {renderText(children)}
      </td>
    ),
  };

  return (
    <div className="flex-grow overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[70%] mb-4 p-3 rounded-lg ${
            message.role === 'user'
              ? 'ml-auto bg-secondary text-white'
              : 'mr-auto bg-secondary text-white'
          }`}
        >
          <ReactMarkdown
            className="markdown-content"
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={components}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      ))}
      <style jsx global>{`
        .markdown-content > *:first-child {
          margin-top: 0 !important;
        }
        .markdown-content > *:last-child {
          margin-bottom: 0 !important;
        }
      `}</style>
    </div>
  );
}

export default ChatMessages;