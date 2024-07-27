import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params
  const body = await request.json()

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      'UPDATE users SET first_name = $1, last_name = $2, middle_name = $3, email = $4, admin = $5 WHERE id = $6 RETURNING *',
      [body.first_name, body.last_name, body.middle_name, body.email, body.admin, userId]
    )
    await client.query('COMMIT')

    if (result.rows.length === 0) {
      return new NextResponse(null, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error updating user:', error)
    return new NextResponse(null, { status: 500 })
  } finally {
    client.release()
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
    await client.query('COMMIT')

    if (result.rows.length === 0) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error deleting user:', error)
    return new NextResponse(null, { status: 500 })
  } finally {
    client.release()
  }
}