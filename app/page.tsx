"use server"
import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import ChatComponent from '@/app/components/ChatComponent'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div>
      <ChatComponent />
    </div>

  )
}