"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [magicLinkEmail, setMagicLinkEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [lastUsedProvider, setLastUsedProvider] = useState<string | null>(null)

  // Load last used provider from localStorage
  useEffect(() => {
    const lastProvider = localStorage.getItem("lastAuthProvider")
    setLastUsedProvider(lastProvider)
  }, [])

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else if (result?.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (_error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: "github" | "google" | "apple") => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Save the provider to localStorage before redirecting
      localStorage.setItem("lastAuthProvider", provider)
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (_error) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsMagicLinkLoading(true)
    setError(null)

    try {
      const result = await signIn("resend", {
        email: magicLinkEmail,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError("Failed to send magic link. Please try again.")
      } else {
        setMagicLinkSent(true)
      }
    } catch (_error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsMagicLinkLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* OAuth Providers */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full relative"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
              {lastUsedProvider === "github" && (
                <span className="ml-2 text-xs text-muted-foreground">(Last used)</span>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full relative"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
              {lastUsedProvider === "google" && (
                <span className="ml-2 text-xs text-muted-foreground">(Last used)</span>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full relative"
              onClick={() => handleOAuthSignIn("apple")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continue with Apple
              {lastUsedProvider === "apple" && (
                <span className="ml-2 text-xs text-muted-foreground">(Last used)</span>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Magic Link Form */}
          {!magicLinkSent ? (
            <form onSubmit={handleMagicLinkSignIn} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="magicLinkEmail" className="text-sm font-medium">
                  Email Magic Link
                </label>
                <div className="flex gap-2">
                  <Input
                    id="magicLinkEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    required
                    disabled={isMagicLinkLoading}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isMagicLinkLoading || !magicLinkEmail}
                  >
                    {isMagicLinkLoading ? "Sending..." : "Send Link"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll send you a magic link to sign in without a password
                </p>
              </div>
            </form>
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-green-900">Check your email!</p>
                  <p className="mt-1 text-green-700">
                    We&apos;ve sent a magic link to <strong>{magicLinkEmail}</strong>. Click the link in the email to sign in.
                  </p>
                  <button
                    onClick={() => {
                      setMagicLinkSent(false)
                      setMagicLinkEmail("")
                    }}
                    className="mt-2 text-green-600 hover:text-green-700 underline text-xs"
                  >
                    Try a different email
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or use password
              </span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
