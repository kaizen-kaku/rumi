'use client';

import { Lora } from "next/font/google";
import { XMarkIcon, ChatBubbleLeftRightIcon, ChatBubbleLeftIcon, BuildingOffice2Icon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import { signOut } from "next-auth/react";

const lora = Lora({ subsets: ["latin"] });

export default function Sidebar({ user, open, setOpen, isMobile }: { user: any; open: boolean; setOpen: (open: boolean) => void; isMobile: boolean }) {
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : '';
  const displayName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : '';

  console.log(user?.admin)
  const title = user?.admin ? 'Administrator' : 'Member'
  return (
    <div
      className={`bg-secondary w-64 h-full fixed top-0 left-0 transform ${open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={`${lora.className} text-2xl font-semibold text-white`}>Ollama</h2>
        <button onClick={() => setOpen(false)} className="text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto px-2 py-2">
        <div className="space-y-1 mb-4">
          <a
            href="#"
            className="flex items-center px-3 py-1.5 text-sm text-accent hover:bg-gray-700 rounded overflow-hidden"
          >
            <ChatBubbleLeftIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Start new chat</span>
          </a>
          {user?.admin && (
            <a
              href="/administration"
              className="flex items-center px-3 py-1.5 text-sm text-accent hover:bg-gray-700 rounded overflow-hidden"
            >
              <BuildingOffice2Icon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Administration Portal</span>
            </a>
          )}
          <a
            href="/settings"
            className="flex items-center px-3 py-1.5 text-sm text-accent hover:bg-gray-700 rounded overflow-hidden"
          >
            <ChatBubbleLeftIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Settings</span>
          </a>
        </div>
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recents</h3>
        <div className="space-y-1">
          {['Chat 1 with a very long title that would usually start to cut itself off here', 'Chat 2', 'Chat 3'].map((chat, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded overflow-hidden"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{chat}</span>
            </a>
          ))}
        </div>
      </nav>
      {user && (
        <div className="px-4 py-2 flex items-start">
          <div className={`${lora.className} w-10 h-10 rounded-full bg-accent2 flex items-center justify-center text-white font-semibold text-md mr-3`}>
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-white truncate">{displayName}</span>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-300">{title}</p>
              {user?.admin && (
                <a
                  href="#"
                  onClick={() => signOut()}
                  className="text-xs text-accent hover:text-accent2 transition-colors duration-200"
                >
                  Logout
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}