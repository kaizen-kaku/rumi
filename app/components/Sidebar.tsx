'use client';

import { Lora } from "next/font/google";
import { XMarkIcon } from "@heroicons/react/24/outline";

const lora = Lora({ subsets: ["latin"] });

export default function Sidebar({ user, open, setOpen, isMobile }: { user: any; open: boolean; setOpen: (open: boolean) => void; isMobile: boolean }) {
  const initials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() 
    : '';
  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : '';

  return (
    <div 
      className={`bg-secondary w-64 h-full fixed top-0 left-0 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-30 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={`${lora.className} text-2xl font-semibold text-white`}>Ollama</h2>
        <button onClick={() => setOpen(false)} className="text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto px-2 py-4">
        <div className="space-y-3">
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 1</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 2</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 3</a>
        </div>
      </nav>
      {user && (
        <div className="px-4 py-2 flex items-center">
          <div className={`${lora.className} w-10 h-10 rounded-full bg-accent2 flex items-center justify-center text-white font-semibold text-md mr-3`}>
            {initials}
          </div>
          <span className="text-white truncate">{displayName}</span>
        </div>
      )}
    </div>
  );
}