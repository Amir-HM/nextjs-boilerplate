import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Credentials from "next-auth/providers/credentials"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { sendVerificationEmail } from "@/lib/email"

// Initialize Prisma Client
const prisma = new PrismaClient()

// Type for user object
type User = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

// Database lookup for credentials provider
async function getUserFromDb(email: string, password: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
      }
    })
    
    if (!user || !user.password) return null
    
    const isValid = await compare(password, user.password)
    if (!isValid) return null
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    }
  } catch (error) {
    console.error("Error fetching user from database:", error)
    return null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  providers: [
    // Email Magic Link Provider with Resend
    Resend({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      sendVerificationRequest: async ({ identifier: email, url }: { identifier: string; url: string }) => {
        await sendVerificationEmail(email, url)
      },
    }),
    
    // Apple OAuth Provider
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
    }),
    
    // GitHub OAuth Provider
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    
    // Google OAuth Provider
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    
    // Credentials Provider (Email/Password)
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  
  session: {
    strategy: "database", // Database sessions required for email provider
  },
  
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client
      if (user && session.user) {
        session.user.id = user.id
        session.user.email = user.email!
        session.user.name = user.name
        session.user.image = user.image
      }
      
      return session
    },
  },
  
  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
})
