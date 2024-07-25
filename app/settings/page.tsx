import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import { getAllUsers } from "@/app/lib/db"
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import SettingsTable from "@/app/components/SettingsTable"

export default async function AdminPortal() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  const users = await getAllUsers()

  return (
    <div className="bg-primary min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-white ml-12">Settings</h1>
      <SettingsTable users={users} />
    </div>
  )
}