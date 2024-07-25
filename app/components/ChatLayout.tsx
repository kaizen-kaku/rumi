'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { useChat } from 'ai/react';
import Sidebar from '@/app/components/Sidebar';
import ChatArea from '@/app/components/ChatArea';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';



export default function ChatLayout() {
  const auth = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatHook = useChat();

  return (
    <div className="flex h-screen bg-primary text-text">
      <Sidebar user={auth?.data?.user} open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-surface shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex-1 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <h1 className="text-2xl font-semibold text-white">Ollama</h1>
              <AdjustmentsHorizontalIcon className="h-6 w-6" color="white" />
            </div>
          </div>
        </header>
        
        <ChatArea chatHook={chatHook} />
      </div>
    </div>
  );
}