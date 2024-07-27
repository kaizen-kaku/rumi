// File: app/administration/new-user/page.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

export default function NewUser() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    admin: false,
  })
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSubmit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/administration')
      } else {
        console.error('Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="bg-primary min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-white ml-12 mb-6">New User</h1>
      <form onSubmit={handleSubmit} className="bg-secondary rounded-lg p-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="middle_name" className="block text-gray-300 mb-2">Middle Name</label>
          <input
            type="text"
            id="middle_name"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white rounded px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="admin"
              checked={formData.admin}
              onChange={handleChange}
              className="mr-2"
            />
            Admin
          </label>
        </div>
        <div className="flex justify-between">
          <Link href="/administration" className="text-accent hover:text-accent2 transition-colors duration-200">
            Cancel
          </Link>
          <button type="submit" className="bg-accent hover:bg-accent2 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Create User
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-secondary p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Confirm New User</h2>
            <p className="text-gray-300 mb-4">Are you sure you want to create this new user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
              >
                <XCircleIcon className="h-5 w-5 mr-2" />
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="flex items-center bg-accent hover:bg-accent2 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}