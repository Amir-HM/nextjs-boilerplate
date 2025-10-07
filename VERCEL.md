# Vercel Deployment Guide

This boilerplate is optimized for deployment on Vercel with Neon PostgreSQL.

## Quick Deploy

### Option 1: Deploy with Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

## Environment Variables

Set these in your Vercel project settings:

### Required Variables

```env
# NextAuth
AUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Database (Neon will auto-populate this via integration)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Resend Email
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=noreply@yourdomain.com

# Stripe
STRIPE_SECRET_KEY=sk_live_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Optional Variables

```env
# OAuth Providers
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret
AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret
AUTH_APPLE_ID=your-apple-id
AUTH_APPLE_SECRET=your-apple-secret
```

## Neon PostgreSQL Integration

### Automatic Setup (Recommended)

1. Go to your Vercel project settings
2. Click on the "Integrations" tab
3. Search for "Neon" and click "Add Integration"
4. Follow the prompts to connect your Neon account
5. Select your database
6. Vercel will automatically add `DATABASE_URL` to all environments

### Manual Setup

1. Create a Neon project at [console.neon.tech](https://console.neon.tech)
2. Copy the connection string
3. Add it to Vercel environment variables as `DATABASE_URL`

## Database Migrations

Run migrations after deployment:

```bash
# Using Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy

# Or connect to your production database
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## Stripe Webhook Configuration

After deploying, update your Stripe webhook endpoint:

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Create a new endpoint with URL: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select the events you want to receive
4. Copy the signing secret
5. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

## OAuth Callback URLs

Update your OAuth providers with production URLs:

### GitHub
- Homepage URL: `https://your-domain.vercel.app`
- Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

### Google
- Authorized JavaScript origins: `https://your-domain.vercel.app`
- Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

### Apple
- Return URLs: `https://your-domain.vercel.app/api/auth/callback/apple`

## Resend Email Domain

For production, verify your custom domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add the DNS records provided
4. Update `EMAIL_FROM` to use your domain (e.g., `noreply@yourdomain.com`)

## Performance Optimization

The boilerplate includes these optimizations:
- ✅ **Edge Runtime** where possible
- ✅ **Server Components** by default
- ✅ **Turbopack** for faster builds
- ✅ **Image Optimization** via Next.js Image component
- ✅ **Font Optimization** with next/font

## Monitoring & Analytics

Consider adding:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Stripe Dashboard** - Payment analytics

## Troubleshooting

### Build Errors

Check your build logs in Vercel dashboard. Common issues:
- Missing environment variables
- Database connection issues
- TypeScript errors

### Database Connection

If you get database connection errors:
1. Verify `DATABASE_URL` is set correctly
2. Check Neon database is active (auto-suspend may occur)
3. Ensure connection pooling is enabled

### Webhooks Not Working

1. Verify webhook endpoint URL is correct
2. Check webhook signing secret matches
3. Look at webhook logs in Stripe Dashboard
4. Test with Stripe CLI locally first

## Preview Deployments

Vercel automatically creates preview deployments for pull requests:
- Each preview gets its own URL
- Use Neon branching for preview databases
- Test OAuth with preview URLs (update callback URLs)

## Custom Domains

To add a custom domain:
1. Go to project settings → Domains
2. Add your domain
3. Update DNS records
4. Update `NEXTAUTH_URL` to use your custom domain
5. Update all OAuth callback URLs
6. Update Stripe webhook endpoint
7. Update Resend email domain

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel Integrations](https://vercel.com/integrations)
