import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/services/auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        console.log(username, password);
        const user: any = await login({ username, password });
        console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.username = user.data.username;
        token.name = user.data.name;
        token.office = user.data.office;
        token.role = user.data.role;
        token.token = user.data.token;
        token.image = user.data.image;
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("office" in token) {
        session.user.office = token.office;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("token" in token) {
        session.user.token = token.token;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
