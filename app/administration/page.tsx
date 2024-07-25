import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import AccessDenied from "@/app/components/AccessDenied"
import UserTable from "@/app/components/UserTable"
import { getAllUsers } from "@/app/lib/db"

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
      <UserTable users={users} />
    </div>
  )
}