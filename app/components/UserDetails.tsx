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

export default function UserDetails({ user }: { user: User }) {
  return (
    <div className="overflow-x-auto mr-12 ml-12 mt-8">
      <table className="min-w-full bg-secondary text-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Field</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">ID</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Full Name</td>
            <td className="px-6 py-4 whitespace-nowrap">{`${user.first_name} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name}`}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Email</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">First Name</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Last Name</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Middle Name</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.middle_name || 'N/A'}</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Admin</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.admin ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6 px-6">
        <Link href="/administration" className="text-accent hover:text-accent2 transition-colors duration-200">
          Back to User List
        </Link>
      </div>
    </div>
  )
}