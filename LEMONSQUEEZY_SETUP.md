# 🍋 LemonSqueezy Setup Guide for Turkey

## Why LemonSqueezy is Perfect for Turkey

✅ **No geographic restrictions** - works in Turkey  
✅ **Merchant of Record** - handles all VAT/tax compliance automatically  
✅ **Payoneer compatible** - receive payouts via your existing Payoneer account  
✅ **Simple setup** - no complex verification like Stripe  
✅ **Built for digital products** - perfect for courses  

## 🚀 Quick Setup (15 minutes)

### Step 1: Create LemonSqueezy Account
1. Go to https://lemonsqueezy.com/
2. Sign up with your business email
3. Complete basic business information
4. Verify your email

### Step 2: Create Your Store
1. In LemonSqueezy dashboard, create a new store
2. Store name: "Allen Ralford Barkley Courses"
3. Currency: USD (recommended for international sales)
4. Note your **Store ID** from the URL

### Step 3: Create a Product
1. Go to Products → Add Product
2. Product type: "Digital Product"
3. Name: "Course Access" (generic product for all courses)
4. Price: $1 (we'll override this per course)
5. Note the **Variant ID** from the product page

### Step 4: Get API Keys
1. Go to Settings → API
2. Create new API key with full permissions
3. Copy your **API Key**

### Step 5: Set Up Webhooks
1. Go to Settings → Webhooks
2. Add webhook URL: `https://your-site.vercel.app/api/lemonsqueezy/webhook`
3. Select events: `order_created`, `order_refunded`
4. Copy the **Webhook Secret**

### Step 6: Update Environment Variables
Update your `api/.env` file:

```env
# LemonSqueezy Configuration
LEMONSQUEEZY_API_KEY=your_api_key_here
LEMONSQUEEZY_STORE_ID=your_store_id_here
LEMONSQUEEZY_DEFAULT_VARIANT_ID=your_variant_id_here
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret_here
```

### Step 7: Set Up Payouts
1. Go to Settings → Payouts
2. Connect your Payoneer account
3. Set payout schedule (weekly/monthly)

## 💰 Fee Structure

| Transaction | LemonSqueezy Fee | Your Keep |
|-------------|------------------|-----------|
| $100 course | $5.00 (5%) | **$95.00** |
| $200 course | $10.00 (5%) | **$190.00** |

**vs Udemy**: Keep 95% instead of 50%  
**vs Teachable**: No monthly fees + better margins

## 🧪 Testing

1. Use `courses-lemonsqueezy.html` instead of `courses.html`
2. Set `NODE_ENV=development` for test mode
3. Create test purchases to verify flow
4. Check webhook delivery in LemonSqueezy dashboard

## 🌐 Go Live

1. Update `NODE_ENV=production` in `.env`
2. Deploy to Vercel
3. Update webhook URL to production domain
4. Test with real payment

## 📊 Advantages Over Stripe

- **No Turkey restrictions**
- **Automatic tax handling** (VAT, sales tax)
- **Simpler compliance** (they're the merchant of record)
- **Payoneer integration** (perfect for your setup)
- **No complex verification process**

## 🎯 Revenue Projection

With LemonSqueezy, selling just **3 courses at $200** covers what you'd lose to Udemy's 50% commission on 6 courses.

**Break-even**: 2-3 courses vs other platforms  
**ROI**: 90%+ profit margin vs 50% on Udemy

Your platform with LemonSqueezy is the perfect solution for Turkey! 🇹🇷
