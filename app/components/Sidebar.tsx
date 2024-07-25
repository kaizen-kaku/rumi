import { Lora } from "next/font/google";
const lora = Lora({ subsets: ["latin"] });


export default function Sidebar({ user, open, setOpen }: { user: any; open: boolean; setOpen: (open: boolean) => void }) {
  const initials = user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '';
  const displayName = user?.firstName ? (user.firstName.length > 10 ? user.firstName : `${user.firstName} ${user.lastName}`) : '';

  return (
    <div className={`bg-secondary w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${open ? "translate-x-0" : "-translate-x-full"} transition duration-200 ease-in-out lg:relative lg:translate-x-0 z-20 flex flex-col`}>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-semibold text-white">Chats</h2>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white">
          Close
        </button>
      </div>
      <nav className="flex-grow">
        {/* Add previous chats here */}
        <div className="space-y-3">
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 1</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 2</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded">Chat 3</a>
        </div>
      </nav>
      {user && (
        <div className="px-4 py-2 flex items-center">
          <div className={`${lora.className} w-10 h-10 rounded-full bg-accent2 flex items-center justify-center text-white font-semibold text-sm mr-3`}>
            {initials}
          </div>
          <span className="text-white truncate">{displayName}</span>
        </div>
      )}
    </div>
  );
}