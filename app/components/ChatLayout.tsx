'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import Sidebar from '@/app/components/Sidebar';
import ChatArea from '@/app/components/ChatArea';
import { AdjustmentsHorizontalIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function ChatLayout() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatHook = useChat();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-primary text-text">
      <Sidebar user={session?.user} open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />
      
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen && !isMobile ? 'lg:ml-64' : ''}`}>
        <header className="bg-surface shadow-sm z-10 relative">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-white">Chat</h1>
              <AdjustmentsHorizontalIcon className="h-6 w-6" color="white" />
            </div>
          </div>
          {(!sidebarOpen || isMobile) && (
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white lg:left-8"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
        </header>
        {/* <div className="mr-12 ml-12"> */}
        <ChatArea chatHook={chatHook} />
        {/* </div> */}

      </div>

      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}