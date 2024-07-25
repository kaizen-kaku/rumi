import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import AccessDenied from "@/app/components/AccessDenied"
import UserDetailsEditor from "@/app/components/UserDetailsEditor"
import { getUserById } from "@/app/lib/db"

export default async function UserPage({ params }: { params: { userId: string } }) {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  if (!session?.user?.admin) {
    return <AccessDenied />
  }

  const user = await getUserById(params.userId)

  if (!user) {
    return <div className="text-white">User not found</div>
  }

  return (
    <div className="bg-primary min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-white ml-12">User Details</h1>
      <UserDetailsEditor user={user} />
    </div>
  )
}