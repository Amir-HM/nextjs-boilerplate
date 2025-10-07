# Ne## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Step-by-step setup checklist (start here!)
- **[SETUP.md](./SETUP.md)** - Complete setup summary and reference
- **[TESTING.md](./TESTING.md)** - Testing guide with Jest and React Testing Library
- **[STRIPE.md](./STRIPE.md)** - Stripe integration and MCP tools guide
- **[VERCEL.md](./VERCEL.md)** - Deployment guide with Neon database
- **[README.md](./README.md)** - This file (comprehensive documentation)aaS & AI Boilerplate

A production-ready Next.js boilerplate with modern UI components, TypeScript, and Tailwind CSS. Perfect for quickly starting SaaS projects and AI applications.

## � Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Step-by-step setup checklist (start here!)
- **[SETUP.md](./SETUP.md)** - Complete setup summary and reference
- **[STRIPE.md](./STRIPE.md)** - Stripe integration and MCP tools guide
- **[VERCEL.md](./VERCEL.md)** - Deployment guide with Neon database
- **[README.md](./README.md)** - This file (comprehensive documentation)

## �🚀 What's Included

### Core Stack
- ✅ **Next.js 15.5.4** - Latest React framework with App Router
- ✅ **React 19.1.0** - Latest React version
- ✅ **TypeScript** - Type-safe development with strict mode
- ✅ **Turbopack** - Faster builds and development experience

### UI & Styling
- ✅ **Tailwind CSS v4** - Utility-first CSS framework
- ✅ **shadcn/ui** - High-quality, accessible UI components
- ✅ **Radix UI** - Unstyled, accessible component primitives
- ✅ **Lucide React** - Beautiful icon library
- ✅ **class-variance-authority** - Component variant management
- ✅ **clsx + tailwind-merge** - Utility for merging Tailwind classes

### Authentication
- ✅ **NextAuth.js v5** - Complete authentication solution
- ✅ **Magic Link Email** - Passwordless authentication with Resend
- ✅ **OAuth Providers** - Apple, GitHub, and Google pre-configured
- ✅ **Credentials Provider** - Email/password authentication ready
- ✅ **Prisma + SQLite** - Database adapter for user and session storage
- ✅ **Protected Routes** - Middleware for route protection
- ✅ **Session Management** - Database-based sessions
- ✅ **Last Used Provider** - Remembers user's preferred OAuth method
- ✅ **Convenient Navigation** - Sign In & Sign Up buttons on homepage

### Email Infrastructure
- ✅ **Resend** - Modern email API for transactional emails
- ✅ **Beautiful Email Templates** - Pre-designed magic link emails
- ✅ **Ready for More** - Use Resend for newsletters, notifications, etc.

### Payment Processing
- ✅ **Stripe** - Complete payment infrastructure
- ✅ **Stripe Webhooks** - Secure event handling
- ✅ **Checkout API** - Pre-built checkout session creation
- ✅ **TypeScript Support** - Fully typed Stripe integration

### Testing
- ✅ **Jest** - JavaScript testing framework
- ✅ **React Testing Library** - Component testing utilities
- ✅ **Example Tests** - Button component tests included
- ✅ **Coverage Reports** - Track test coverage

### Database
- ✅ **Neon PostgreSQL** - Serverless Postgres database (where data lives)
- ✅ **Prisma ORM** - Type-safe database access (how code talks to Neon)
- ✅ **Vercel Integration** - Automatic database connection for deployments
- ✅ **Database Migrations** - Version-controlled schema changes
- ✅ **Connection Pooling** - Built-in with Neon for optimal performance

### Developer Experience
- ✅ **ESLint** - Code linting and quality checks
- ✅ **Path Aliases** - Import with `@/*` for cleaner imports
- ✅ **Geist Font** - Modern font family from Vercel

## 📦 shadcn/ui Components Included

The following components are pre-installed and ready to use:
- **Button** - Versatile button component with variants
- **Card** - Container component for content sections
- **Input** - Styled input field component

### Adding More Components

To add additional shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone this repository:
```bash
git clone [your-repo-url] my-project
cd my-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Configure authentication (see [Authentication Setup](#authentication-setup) below)

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Running Tests

This boilerplate includes Jest and React Testing Library for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Example test location:** `src/components/ui/__tests__/button.test.tsx`

To add more tests, create files with `.test.tsx` or `.spec.tsx` extensions anywhere in your `src/` directory.

📖 **See [TESTING.md](./TESTING.md) for the complete testing guide.**

## 🔐 Authentication Setup

This boilerplate comes with NextAuth.js v5 (beta) pre-configured with multiple authentication providers.

### 1. Generate AUTH_SECRET

Generate a secure random secret for JWT encryption:

```bash
openssl rand -base64 32
```

Add it to your `.env.local` file:

```env
AUTH_SECRET=your-generated-secret
```

### 2. Configure Database (Neon PostgreSQL)

This boilerplate uses [Neon](https://neon.tech) - a serverless PostgreSQL database that's perfect for Next.js and Vercel deployments.

<details>
<summary><strong>🤔 Why Neon + Prisma?</strong></summary>

**Two technologies working together:**

- **Neon** = The database itself (PostgreSQL hosting in the cloud)
  - Where your data is actually stored
  - Serverless and auto-scaling
  - Built for modern apps

- **Prisma** = The ORM (Object-Relational Mapper)
  - How your TypeScript code talks to Neon
  - Provides type-safe database queries
  - Manages schema and migrations

**Think of it like:**
- **Neon** = Your parking garage (where you park)
- **Prisma** = Your car keys (how you access it)

You need **both** - Prisma without Neon has nowhere to store data, and Neon without Prisma would require writing raw SQL queries.

</details>

#### Get Neon Connection String

1. Go to [Neon](https://neon.tech) (sign up if needed)
2. Create a project
3. Copy the connection string from your dashboard

#### Configure Database URL

Add to `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

#### Run Database Migrations

```bash
npx prisma migrate dev
```

#### (Optional) Connect to Vercel

1. Install the [Neon Vercel Integration](https://vercel.com/integrations/neon)
2. Database auto-connects to all deployments
3. Connection strings automatically added as environment variables

**Your database is now ready!** The schema includes all tables needed for authentication (User, Account, Session, VerificationToken).

### 3. Configure Magic Link Email (Recommended)

Magic links provide a secure, passwordless authentication experience using Resend.

#### Get Resend API Key

1. Go to [Resend](https://resend.com) (sign up if needed)
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Add to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
```

#### Configure Email Sender

**For testing** (no domain verification needed):

```env
EMAIL_FROM=onboarding@resend.dev
```

**For production** (requires domain verification):

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add the DNS records they provide
4. Once verified:

```env
EMAIL_FROM=noreply@yourdomain.com
```

#### Step 2: Configure Email Sender

For **testing**, use Resend's test email:

```env
EMAIL_FROM=onboarding@resend.dev
```

For **production**, verify your own domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records to your domain
5. Once verified, use your custom email:

```env
EMAIL_FROM=noreply@yourdomain.com
```

**Your magic link authentication is now ready to use!** Users can sign in by entering their email and clicking "Send Link".

### 4. Configure GitHub OAuth (Optional)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Configure:
   - **Homepage URL**: `http://localhost:3000`
   - **Callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy **Client ID** and generate **Client Secret**
5. Add to `.env.local`:

```env
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```

### 5. Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Click "Create Credentials" > "OAuth client ID"
4. Select "Web application"
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret**
7. Add to `.env.local`:
   - Add production URLs when deploying
8. Copy the **Client ID** and **Client Secret**
9. Add them to `.env.local`:

```env
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

### 6. Email/Password Authentication (Optional)

The credentials provider is already configured with the Prisma database! To enable password-based authentication, you just need to create a user registration API.

**Create a registration API route** at `src/app/api/auth/register/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    })
    
    return NextResponse.json({ 
      success: true,
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    )
  }
}
```

**Then update the sign-up page** (`src/app/auth/signup/page.tsx`) to call your registration API instead of the placeholder TODO.

### Authentication Pages

- **Sign In**: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- **Sign Up**: [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
- **Dashboard** (Protected): [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Authentication Features

### Authentication Features

**Magic Link Email (Passwordless)**: 
- Users can sign in without passwords by receiving a secure link via email
- Powered by Resend for reliable email delivery
- Beautiful, responsive email templates included
- 24-hour expiration for security
- Perfect for improving user experience and reducing password fatigue

**Convenient Navigation**: 
- Both Sign In and Sign Up buttons are available on the homepage for easy access
- Users can quickly switch between signing in and creating a new account

**Last Used Provider Memory**: 
- The app remembers which authentication provider (GitHub, Google, or Apple) a user clicked last time
- A "(Last used)" indicator appears next to the previously used OAuth button
- This helps users quickly identify and use their preferred sign-in method
- Works across both sign-in and sign-up pages using localStorage

### Using Resend for Other Emails

Resend is configured and ready to use for any email needs:

```typescript
import { sendEmail } from "@/lib/email"

// Send a custom email
await sendEmail({
  to: "user@example.com",
  subject: "Welcome to our app!",
  html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
})
```

Common use cases:
- Welcome emails
- Password reset notifications
- Order confirmations
- Newsletter campaigns
- System notifications

### Protected Routes

Routes are protected using middleware (`src/middleware.ts`). To protect additional routes, update the matcher:

```typescript
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*']
}
```

### Using Authentication in Your App

**In Client Components:**

```tsx
"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading...</div>
  if (!session) return <button onClick={() => signIn()}>Sign In</button>
  
  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

**In Server Components:**

```tsx
import { auth } from "@/auth"

export default async function ServerComponent() {
  const session = await auth()
  
  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return <div>Welcome, {session.user?.name}</div>
}
```

**In API Routes:**

```tsx
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  return NextResponse.json({ user: session.user })
}
```

### Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` in your environment variables:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. Update OAuth callback URLs in GitHub/Google to include production URLs:
   - GitHub: `https://yourdomain.com/api/auth/callback/github`
   - Google: `https://yourdomain.com/api/auth/callback/google`

3. Ensure `AUTH_SECRET` is properly set in production environment variables

## � Stripe Integration

This boilerplate includes a complete Stripe integration for payments, subscriptions, and more.

### 7. Configure Stripe (Optional)

#### Step 1: Get Stripe API Keys

1. Sign up at [Stripe](https://stripe.com)
2. Go to [API Keys](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable key** and **Secret key**
4. Add them to `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

#### Step 2: Set Up Webhooks (For Production)

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set the endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to (or select all)
5. Copy the **Signing secret** and add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### Step 3: Test Webhooks Locally

Use the Stripe CLI to forward webhook events to your local server:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Stripe Features Included

**Pre-built API Routes:**
- `/api/stripe/checkout` - Create checkout sessions for one-time or subscription payments
- `/api/stripe/webhook` - Handle Stripe webhook events securely

**Stripe Configuration:**
- `src/lib/stripe.ts` - Server-side Stripe instance (secure)
- `src/lib/stripe-client.ts` - Client-side Stripe.js loader

**Webhook Events Handled:**
- `checkout.session.completed` - Payment successful
- `customer.subscription.created/updated` - Subscription changes
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Recurring payment succeeded
- `invoice.payment_failed` - Payment failed

### Using Stripe in Your App

**Create a checkout session:**

```typescript
// Client-side component
async function handleCheckout() {
  const response = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId: 'price_xxx', // Your Stripe Price ID
      quantity: 1,
    }),
  })
  
  const { url } = await response.json()
  window.location.href = url // Redirect to Stripe Checkout
}
```

**Create products and prices:**

Use the Stripe Dashboard or API to create products and prices:
1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Set up one-time or recurring pricing
4. Copy the Price ID to use in your checkout

**Access Stripe in API routes:**

```typescript
import { stripe } from "@/lib/stripe"

// Create a customer
const customer = await stripe.customers.create({
  email: "customer@example.com",
})

// List products
const products = await stripe.products.list()

// Create a payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // $20.00
  currency: "usd",
})
```

## �📁 Project Structure

```
nextjs-boilerplate/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout with AuthProvider
│   │   ├── page.tsx       # Home page
│   │   ├── globals.css    # Global styles & theme variables
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts    # NextAuth API handlers
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.tsx        # Sign-in page
│   │   │   └── signup/
│   │   │       └── page.tsx        # Sign-up page
│   │   └── dashboard/
│   │       └── page.tsx            # Protected dashboard example
│   ├── components/
│   │   ├── providers/
│   │   │   └── auth-provider.tsx   # SessionProvider wrapper
│   │   └── ui/                     # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn helper)
│   ├── auth.ts                    # NextAuth.js configuration
│   └── middleware.ts              # Route protection middleware
├── .env.example           # Environment variables template
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.ts         # Next.js configuration
```

## 🎨 Theming

This boilerplate supports light and dark mode out of the box. Theme variables are defined in `src/app/globals.css` using HSL color values.

To toggle dark mode programmatically, add `dark` class to the `<html>` element:

```tsx
// Example: Toggle dark mode
document.documentElement.classList.toggle('dark')
```

### Customizing Colors

Edit the CSS variables in `src/app/globals.css` to customize your theme:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration Files

### `components.json`
shadcn/ui configuration with path aliases and styling preferences.

### `tailwind.config.ts`
Tailwind CSS configuration with shadcn/ui color system and custom theme extensions.

### `tsconfig.json`
TypeScript configuration with strict mode and path aliases (`@/*`).

### `next.config.ts`
Next.js configuration file for customizing build and runtime behavior.

## 🚦 Next Steps

This boilerplate comes with authentication pre-configured! You can now add:

### Database & ORM
- Prisma / Drizzle ORM
- PostgreSQL / Supabase
- MongoDB
- PlanetScale

### Forms & Validation
- React Hook Form
- Zod
- Yup

### State Management
- Zustand
- TanStack Query (React Query)
- Jotai

### AI Integration
- Vercel AI SDK
- OpenAI SDK
- LangChain
- Anthropic Claude

### Payments
- Stripe
- Lemon Squeezy
- Paddle

### Email
- Resend
- SendGrid
- Mailgun

### Additional Features
- File uploads (UploadThing, AWS S3)
- Real-time updates (Pusher, Ably)
- Analytics (PostHog, Plausible)
- Error tracking (Sentry)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🎉

Built with ❤️ for rapid SaaS and AI development
