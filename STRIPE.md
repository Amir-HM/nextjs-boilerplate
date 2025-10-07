# Stripe MCP Server - Quick Reference

This boilerplate has the Stripe MCP (Model Context Protocol) server configured and ready to use. You can interact with Stripe directly through AI-powered tools.

## Available Stripe Operations

### Product & Price Management
- `mcp_stripe_agent-_create_product` - Create new products
- `mcp_stripe_agent-_list_products` - List all products
- `mcp_stripe_agent-_create_price` - Create pricing for products
- `mcp_stripe_agent-_list_prices` - List all prices

### Customer Management
- `mcp_stripe_agent-_create_customer` - Create new customers
- `mcp_stripe_agent-_list_customers` - List all customers

### Payment Management
- `mcp_stripe_agent-_create_payment_link` - Generate payment links
- `mcp_stripe_agent-_create_refund` - Process refunds
- `mcp_stripe_agent-_list_payment_intents` - List payment intents
- `mcp_stripe_agent-_retrieve_balance` - Check Stripe balance

### Subscription Management
- `mcp_stripe_agent-_cancel_subscription` - Cancel subscriptions
- `mcp_stripe_agent-_list_subscriptions` - List subscriptions
- `mcp_stripe_agent-_update_subscription` - Update subscriptions

### Resource & Documentation
- `mcp_stripe_agent-_fetch_stripe_resources` - Get resource details by ID
- `mcp_stripe_agent-_get_stripe_account_info` - Get account information
- `mcp_stripe_agent-_search_stripe_documentation` - Search Stripe docs
- `mcp_stripe_agent-_search_stripe_resources` - Search Stripe resources

## Example Workflows

### 1. Create a Product with Price
```
1. Create product: "Pro Plan"
2. Create price: $29.99/month
3. Get the price ID for checkout
```

### 2. Set Up a Subscription
```
1. Create customer with email
2. Create subscription with price ID
3. Handle webhook events for updates
```

### 3. Process a One-Time Payment
```
1. Create payment link with price ID
2. Share link with customer
3. Handle webhook for completion
```

## Webhook Events

The boilerplate handles these events automatically:
- ✅ `checkout.session.completed` - Payment successful
- ✅ `customer.subscription.created` - New subscription
- ✅ `customer.subscription.updated` - Subscription changed
- ✅ `customer.subscription.deleted` - Subscription cancelled
- ✅ `invoice.payment_succeeded` - Payment succeeded
- ✅ `invoice.payment_failed` - Payment failed

Edit `src/app/api/stripe/webhook/route.ts` to add custom logic for each event.

## Testing with Stripe CLI

```bash
# Listen for webhook events locally
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger customer.subscription.created
```

## Stripe Test Cards

Use these test cards in test mode:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

Any future expiry date and any 3-digit CVC will work with test cards.

## Next Steps

1. Get your Stripe API keys from the dashboard
2. Add them to `.env.local`
3. Create products and prices in Stripe Dashboard
4. Use the MCP tools or API routes to integrate payments
5. Test with Stripe test mode before going live

## Resources

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Webhook Events](https://stripe.com/docs/webhooks)
