import { login } from "@/lib/service";
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        const {username, password} = credentials as {
          username: string,
          password: string;
        };
        console.log(username, password);
        const user: any = await login({ username, password });
        console.log(user)
        if(user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, account, profile, user}: any) {
      if(account?.provider === 'credentials') {
        token.username = user.user.username;
        token.name = user.user.name;
        token.office = user.user.office;
        token.role = user.user.role;
        token.token = user.user.token;
      }
      return token;
    },

    async session({session, token}: any) {
      if("username" in token) {
        session.user.username = token.username;
      }
      if("name" in token) {
        session.user.name = token.name;
      }
      if("office" in token) {
        session.user.office = token.office;
      }
      if("role" in token) {
        session.user.role = token.role;
      }
      if("token" in token) {
        session.user.token = token.token;
      }
      return session;
    },
    
  },
  pages: {
      signIn: "/login",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };