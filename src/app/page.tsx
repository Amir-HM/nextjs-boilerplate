import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Auth Navigation */}
        <div className="flex justify-end gap-4 mb-8">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <span className="text-sm text-muted-foreground self-center">
                {session.user?.email}
              </span>
            </>
          ) : (
            <>
              <Link href="/auth/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Next.js SaaS & AI Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A production-ready starter with Next.js 15, React 19, TypeScript,
            Tailwind CSS, and shadcn/ui components
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Modern Stack</CardTitle>
              <CardDescription>
                Built with the latest Next.js 15 and React 19
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Leveraging App Router, Server Components, and Turbopack for
                optimal performance and developer experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Beautiful UI</CardTitle>
              <CardDescription>
                Pre-configured shadcn/ui components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accessible, customizable components built on Radix UI with
                Tailwind CSS styling. Dark mode ready out of the box.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Developer Ready</CardTitle>
              <CardDescription>TypeScript, ESLint, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Type-safe development with strict TypeScript configuration,
                code linting, and optimized build pipeline.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo Section */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Component Examples</CardTitle>
              <CardDescription>
                See the pre-installed shadcn/ui components in action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Buttons */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Input</h3>
                <Input placeholder="Enter your email..." type="email" />
              </div>

              {/* Button Sizes */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">→</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <p className="text-sm text-muted-foreground">
                Add more components with:
              </p>
              <code className="bg-muted px-3 py-1 rounded text-sm">
                npx shadcn@latest add [component-name]
              </code>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-sm text-muted-foreground">
            Ready to start building? Check out the README.md for next steps.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Components
              </a>
            </Button>
            <Button asChild>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js Docs
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
