import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = signInSchema.parse(credentials);

          const client = await pool.connect();
          const result = await client.query(
            "SELECT id, first_name, last_name, middle_name, admin, email, password FROM users WHERE email = $1",
            [email]
          );
          client.release();

          if (result.rows.length === 0) {
            console.log(`Failed login attempt for email: ${email}`);
            return null;
          }

          const user = result.rows[0];

          if (user.password !== password) {
            console.log(`Failed login attempt for email: ${email}`);
            return null;
          }

          console.log(`${email} logged in`);
          return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            middleName: user.middle_name,
            admin: user.admin,
          };
        } catch (error) {
          console.error('Auth Error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.middleName = user.middleName;
        token.admin = user.admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.middleName = token.middleName as string;
        session.user.admin = token.admin as boolean;
      }
      return session;
    },
  },
});
