import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "@/app/lib/db";




export const authOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      // Fetch user from Redis
      const dbUser = await db.get(`user:${token.id}`);
      if (dbUser) {
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure session.user is initialized
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },

  redirect({ url, baseUrl }) {
    // Redirect to the dashboard if no specific URL is provided
    return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
