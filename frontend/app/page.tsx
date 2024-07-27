import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'
import ChatLayout from '@/app/components/ChatLayout'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return <ChatLayout session={session}/>
}