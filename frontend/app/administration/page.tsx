// File: app/administration/page.tsx

import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import AccessDenied from "@/app/components/AccessDenied"
import UserTable from "@/app/components/UserTable"
import { getAllUsers } from "@/app/lib/db"
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export default async function AdminPortal() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  if (!session?.user?.admin) {
    return <AccessDenied />
  }

  const users = await getAllUsers()

  return (
    <div className="bg-primary min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-white ml-12">Administration Portal</h1>
      <Link href="/administration/new-user" className="inline-flex items-center ml-12 mt-4 text-accent hover:text-accent2 transition-colors duration-200">
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New User
      </Link>
      <UserTable users={users} />
    </div>
  )
}