import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function POST(request: Request) {
  const body = await request.json()

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      'INSERT INTO users (first_name, last_name, middle_name, email, admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [body.first_name, body.last_name, body.middle_name, body.email, body.admin]
    )
    await client.query('COMMIT')

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error creating user:', error)
    return new NextResponse(null, { status: 500 })
  } finally {
    client.release()
  }
}