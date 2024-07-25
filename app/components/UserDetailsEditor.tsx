'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ConfirmationModal from './ConfirmationModal'

type User = {
  id: string
  first_name: string
  last_name: string
  middle_name: string | null
  email: string
  admin: boolean
}

export default function UserDetailsEditor({ user: initialUser }: { user: User }) {
  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      if (response.ok) {
        setIsEditing(false)
        router.refresh()
      } else {
        console.error('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        router.push('/administration')
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

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
          <EditableRow
            label="Email"
            name="email"
            value={user.email}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <EditableRow
            label="First Name"
            name="first_name"
            value={user.first_name}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <EditableRow
            label="Last Name"
            name="last_name"
            value={user.last_name}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <EditableRow
            label="Middle Name"
            name="middle_name"
            value={user.middle_name || ''}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <EditableRow
            label="Admin"
            name="admin"
            value={user.admin ? 'Yes' : 'No'}
            isEditing={isEditing}
            onChange={handleInputChange}
            type="checkbox"
            checked={user.admin}
          />
        </tbody>
      </table>
      <div className="mt-6 px-6 flex justify-between">
        <Link href="/administration" className="text-accent hover:text-accent2 transition-colors duration-200">
          Back to User List
        </Link>
        <div className="space-x-4">
          {isEditing ? (
            <>
              <button onClick={() => setShowSaveConfirmation(true)} className="bg-accent hover:bg-accent2 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-accent hover:bg-accent2 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Edit User
              </button>
              <button onClick={() => setShowDeleteConfirmation(true)} className="bg-error hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Delete User
              </button>
            </>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showSaveConfirmation}
        onClose={() => setShowSaveConfirmation(false)}
        onConfirm={handleSave}
        title="Confirm Changes"
        message="Are you sure you want to save these changes?"
      />
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  )
}

function EditableRow({ label, name, value, isEditing, onChange, type = 'text', checked }: {
  label: string
  name: string
  value: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  checked?: boolean
}) {
  return (
    <tr className="hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap font-semibold">{label}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          type === 'checkbox' ? (
            <input
              type="checkbox"
              name={name}
              checked={checked}
              onChange={onChange}
              className="form-checkbox h-5 w-5 text-accent"
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className="bg-gray-700 text-white px-2 py-1 rounded"
            />
          )
        ) : (
          value
        )}
      </td>
    </tr>
  )
}