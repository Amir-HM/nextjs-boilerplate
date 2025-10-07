# 🚀 Quick Start Checklist

Follow these steps to get your boilerplate up and running:

## ✅ Step 1: Neon Database (Required)

**Why**: Needed for user authentication and sessions

<details>
<summary><strong>📖 Click to expand setup instructions</strong></summary>

### What is Neon?
Neon is a serverless PostgreSQL database. You need it to store users, sessions, and authentication data.

### What about Prisma?
**Prisma is still needed!** It's the ORM (Object-Relational Mapper) that connects your code to Neon.
- **Neon** = Where your data lives (the database)
- **Prisma** = How your code talks to Neon (the interface)

### Setup Steps

1. **Get Connection String**
   - Go to https://neon.tech (sign up if needed)
   - Create a project
   - Copy the connection string from your dashboard
   - It looks like: `postgresql://user:password@host.neon.tech/database?sslmode=require`

2. **Add to Environment**
   - Open `.env.local`
   - Update the `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate dev
   ```
   This creates the tables (User, Account, Session, VerificationToken) in your Neon database.

4. **Verify Setup**
   ```bash
   npx prisma studio
   ```
   This opens a GUI to view your database.

</details>

**Status**: ⏳ Pending

---

## ✅ Step 2: Resend API (Required for Magic Links)

**Why**: Enables passwordless authentication via email

<details>
<summary><strong>📖 Click to expand setup instructions</strong></summary>

### What is Resend?
Resend is a modern email API for sending transactional emails (like magic links, password resets, notifications).

### Setup Steps

1. **Get API Key**
   - Go to https://resend.com (sign up if needed)
   - Navigate to [API Keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `re_`)

2. **Add to Environment**
   - Open `.env.local`
   - Add your API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. **Configure Email Sender**
   
   **For Testing** (no domain verification needed):
   ```env
   EMAIL_FROM=onboarding@resend.dev
   ```
   
   **For Production** (requires domain verification):
   - Go to [Resend Domains](https://resend.com/domains)
   - Add your domain
   - Add the DNS records they provide
   - Once verified:
   ```env
   EMAIL_FROM=noreply@yourdomain.com
   ```

</details>

**Status**: ⏳ Pending

---

## ✅ Step 3: Test Authentication

<details>
<summary><strong>📖 Click to expand testing instructions</strong></summary>

### Testing Steps

1. **Start Dev Server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open Your App**
   - Go to http://localhost:3000
   - You should see the homepage with Sign In/Sign Up buttons

3. **Test Magic Link**
   - Click "Sign In"
   - Enter your email address
   - Click "Send Link"
   - Check your email inbox
   - Click the magic link
   - You should be redirected to the dashboard

4. **Verify Dashboard Access**
   - You should see your user info
   - Try signing out
   - Try signing in again

### Troubleshooting
- **Email not received?** Check spam folder
- **Link expired?** Links expire after 24 hours
- **Database error?** Verify Neon connection string
- **API error?** Check Resend API key

</details>

**Status**: ⏳ Pending (requires Steps 1 & 2)

---

## 📦 Optional: Add Stripe (For Payments)

**Why**: If you need payment processing or subscriptions

<details>
<summary><strong>📖 Click to expand Stripe setup</strong></summary>

### What is Stripe?
Stripe handles payments, subscriptions, and billing. Only add this if your app needs to charge users.

### Get API Keys

1. Go to https://stripe.com (sign up if needed, use test mode)
2. Navigate to [API Keys](https://dashboard.stripe.com/apikeys)
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Add to Environment

Open `.env.local` and add:
```env
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Test Payments
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

### Set Up Webhooks (After Deploying)

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Create endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Copy signing secret
4. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

### Learn More
See [STRIPE.md](./STRIPE.md) for complete integration guide and MCP tools.

</details>

**Status**: ⏳ Optional

---

## 🔐 Optional: Add OAuth Providers

**Why**: Let users sign in with GitHub, Google, or Apple

<details>
<summary><strong>📖 Click to expand OAuth setup</strong></summary>

Choose which providers you want to enable. You can add all, some, or none.

### GitHub OAuth

<details>
<summary>GitHub Setup Instructions</summary>

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Configure:
   - **Homepage URL**: `http://localhost:3000`
   - **Callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy **Client ID** and generate **Client Secret**
5. Add to `.env.local`:
   ```env
   AUTH_GITHUB_ID=your_github_client_id
   AUTH_GITHUB_SECRET=your_github_client_secret
   ```

**For Production**: Update callback URL to `https://yourdomain.com/api/auth/callback/github`

</details>

### Google OAuth

<details>
<summary>Google Setup Instructions</summary>

1. Go to https://console.cloud.google.com
2. Navigate to "APIs & Services" > "Credentials"
3. Click "Create Credentials" > "OAuth client ID"
4. Select "Web application"
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret**
7. Add to `.env.local`:
   ```env
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

**For Production**: Add production URL to authorized redirect URIs

</details>

### Apple Sign In

<details>
<summary>Apple Setup Instructions</summary>

1. Go to https://developer.apple.com/account/resources/identifiers/list/serviceId
2. Create a Services ID and enable "Sign in with Apple"
3. Configure return URL: `http://localhost:3000/api/auth/callback/apple`
4. Create a private key for Sign in with Apple
5. Add to `.env.local`:
   ```env
   AUTH_APPLE_ID=your_apple_service_id
   AUTH_APPLE_SECRET=your_apple_client_secret
   ```

**For Production**: Update return URL to your production domain

</details>

</details>

**Status**: ⏳ Optional

---

## 🎯 You're Ready When...

- ✅ Neon database is connected (Prisma talks to Neon)
- ✅ Resend API key is configured
- ✅ Dev server is running
- ✅ You can sign in with magic link
- ✅ Dashboard page loads after authentication

---

## � Project Structure

<details>
<summary><strong>📖 Click to view complete structure</strong></summary>

```
nextjs-boilerplate/
├── 📚 Documentation
│   ├── QUICKSTART.md        # ← You are here!
│   ├── SETUP.md             # Complete reference
│   ├── STRIPE.md            # Stripe + MCP tools
│   ├── VERCEL.md            # Deployment guide
│   └── README.md            # Full docs
│
├── ⚙️ Configuration
│   ├── .env.local           # Your secrets (git ignored)
│   ├── .env.example         # Template
│   ├── package.json         # Dependencies
│   ├── tsconfig.json        # TypeScript config
│   └── eslint.config.mjs    # Linting rules
│
├── 🗄️ Database (Neon + Prisma)
│   └── prisma/
│       ├── schema.prisma    # Database schema
│       └── migrations/      # Migration history
│
├── 💻 Source Code
│   └── src/
│       ├── 📧 Email
│       │   └── lib/
│       │       └── email.ts           # Resend functions
│       │
│       ├── 💳 Stripe
│       │   └── lib/
│       │       ├── stripe.ts          # Server-side
│       │       └── stripe-client.ts   # Client-side
│       │
│       ├── 🔐 Authentication
│       │   ├── auth.ts                # NextAuth config
│       │   ├── app/api/auth/          # Auth API routes
│       │   └── app/auth/              # Auth pages
│       │       ├── signin/            # Sign in page
│       │       ├── signup/            # Sign up page
│       │       └── verify-request/    # Magic link sent
│       │
│       ├── 💰 Payments
│       │   └── app/api/stripe/
│       │       ├── checkout/          # Create checkout
│       │       └── webhook/           # Handle events
│       │
│       ├── 📄 Pages
│       │   └── app/
│       │       ├── page.tsx           # Homepage
│       │       ├── layout.tsx         # Root layout
│       │       └── dashboard/         # Protected page
│       │
│       └── 🎨 Components
│           └── components/
│               └── ui/                # shadcn/ui components
│
└── 🎨 Styling
    └── src/app/
        └── globals.css        # Tailwind + theme
```

### Key Concepts

**Neon + Prisma**
- Neon = PostgreSQL database (hosted)
- Prisma = ORM that connects your code to Neon
- Together they handle all data storage

**Authentication Flow**
- User enters email → Resend sends magic link
- User clicks link → NextAuth verifies → Session created in Neon
- User accesses dashboard → NextAuth checks session from Neon

**Stripe Integration**
- Products/prices created in Stripe Dashboard
- Your app creates checkout sessions
- Stripe handles payment
- Webhooks notify your app
- You update Neon database

</details>

---

## ⚡ Commands You'll Use

<details>
<summary><strong>📖 Click to view all commands</strong></summary>

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production build
npm run lint             # Check code quality
```

### Testing
```bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### Database (Prisma + Neon)
```bash
npx prisma migrate dev   # Create and run migrations
npx prisma migrate deploy # Deploy migrations (production)
npx prisma studio        # Open database GUI
npx prisma generate      # Regenerate Prisma client
npx prisma db push       # Push schema without migration (dev only)
```

### UI Components (shadcn/ui)
```bash
npx shadcn@latest add button     # Add button component
npx shadcn@latest add card       # Add card component
npx shadcn@latest add input      # Add input component
npx shadcn@latest add [name]     # Add any component
```
Browse all at https://ui.shadcn.com

### Stripe (Optional)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local dev
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger customer.subscription.created
```

### Deployment (Vercel)
```bash
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel env pull          # Pull environment variables
vercel logs              # View deployment logs
```

</details>

---

## 🆘 Need Help?

<details>
<summary><strong>📖 Click to view troubleshooting guide</strong></summary>

### Authentication Issues

**Database Connection Error**
- ✅ Verify `DATABASE_URL` in `.env.local` is correct
- ✅ Check Neon dashboard - is the database active?
- ✅ Run `npx prisma migrate dev` to ensure tables exist
- ✅ Try `npx prisma studio` to verify connection

**Magic Link Not Sending**
- ✅ Verify `RESEND_API_KEY` is correct
- ✅ Check Resend dashboard for error logs
- ✅ Make sure `EMAIL_FROM` is set
- ✅ Check spam/junk folder

**Magic Link Expired**
- Links expire after 24 hours
- Request a new link from the sign-in page

**OAuth Not Working**
- ✅ Verify callback URLs match exactly
- ✅ Check client ID and secret are correct
- ✅ Make sure OAuth app is enabled in provider dashboard

### Stripe Issues

**Test Payments Not Working**
- ✅ Use test mode keys (start with `sk_test_` and `pk_test_`)
- ✅ Use test card: `4242 4242 4242 4242`
- ✅ Any future expiry date and any 3-digit CVC

**Webhooks Not Receiving Events**
- ✅ Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- ✅ Verify webhook secret matches
- ✅ Check Stripe Dashboard webhook logs

### Database (Prisma) Issues

**Migration Errors**
- ✅ Delete `prisma/migrations` folder and run `npx prisma migrate dev` fresh
- ✅ Make sure no other app is using the database
- ✅ Check Neon connection pooling settings

**Prisma Client Out of Sync**
```bash
npx prisma generate
```

**Need to Reset Database** (⚠️ deletes all data)
```bash
npx prisma migrate reset
```

### Build/Deploy Issues

**Build Fails**
- ✅ Check all environment variables are set
- ✅ Run `npm install` to ensure all packages installed
- ✅ Try deleting `.next` folder and rebuilding

**Vercel Deployment Fails**
- ✅ Verify all environment variables added in Vercel
- ✅ Check build logs in Vercel dashboard
- ✅ Make sure Neon database is accessible

</details>

---

## 🚀 Next Steps After Setup

<details>
<summary><strong>📖 Click to view what to do next</strong></summary>

### 1. Start Building Features

**Add New Pages**
```bash
# Create a new page
touch src/app/pricing/page.tsx
```

**Add UI Components**
```bash
# Install more shadcn/ui components
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
```

**Create API Routes**
```bash
# Create a new API endpoint
touch src/app/api/users/route.ts
```

### 2. Customize Your App

**Change Theme Colors**
- Edit `src/app/globals.css`
- Update CSS variables for your brand

**Update Authentication**
- Modify `src/app/auth/signin/page.tsx` for custom design
- Edit email templates in `src/lib/email.ts`

**Add More Database Models**
- Edit `prisma/schema.prisma`
- Run `npx prisma migrate dev --name your_migration_name`

### 3. When Ready to Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Add environment variables
   - Deploy!

3. **Connect Neon to Vercel**
   - Install Neon integration in Vercel
   - Database URL auto-added to all environments

4. **Update Production URLs**
   - Update OAuth callback URLs
   - Update Stripe webhook endpoint
   - Verify custom domain in Resend

See [VERCEL.md](./VERCEL.md) for complete deployment guide.

### 4. Learn More

- **[README.md](./README.md)** - Complete documentation
- **[SETUP.md](./SETUP.md)** - Detailed reference
- **[STRIPE.md](./STRIPE.md)** - Stripe integration
- **[VERCEL.md](./VERCEL.md)** - Deployment guide

</details>

---

## 🎉 That's It!

Your boilerplate is ready to use. The only **required** steps are:
1. ✅ Configure Neon database
2. ✅ Add Resend API key
3. ✅ Run migrations
4. ✅ Start coding!

Everything else is optional and can be added as needed.

Happy building! 🚀
