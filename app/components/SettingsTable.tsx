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

export default function Settings({ users }: { users: User[] }) {
  return (
    <div className="overflow-hidden mr-12 ml-12 mt-8 rounded-lg bg-secondary">
      
    </div>
  )
}