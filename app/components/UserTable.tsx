'use client'

import Link from 'next/link'

type User = {
  id: string
  first_name: string
  last_name: string
  middle_name: string | null
  email: string
  admin: boolean
}

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto mr-12 ml-12 mt-8">
      <table className="min-w-full bg-secondary text-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${user.first_name} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.admin ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/administration/${user.id}`} className="text-accent hover:text-accent2 transition-colors duration-200">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 px-6">
        <Link href="/" className="text-accent hover:text-accent2 transition-colors duration-200">
          Back Home
        </Link>
      </div>
    </div>
  )
}