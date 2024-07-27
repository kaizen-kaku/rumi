"use server"
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function getAllUsers() {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT id, first_name, last_name, middle_name, email, admin FROM users'
    )
    return result.rows
  } finally {
    client.release()
  }
}

export async function getUserById(id: string) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT id, first_name, last_name, middle_name, email, admin FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  } finally {
    client.release()
  }
}