import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    admin?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      middleName?: string;
      admin?: boolean;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    id?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    admin?: boolean;
  }
}
