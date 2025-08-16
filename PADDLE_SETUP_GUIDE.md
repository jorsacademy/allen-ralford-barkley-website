# 🏓 Paddle Setup Guide for Turkey

## Why Paddle is Perfect for Turkey

✅ **Turkey-friendly** - No geographic restrictions  
✅ **Merchant of Record** - Handles all VAT/tax compliance automatically  
✅ **Payoneer compatible** - Direct payouts to your business account  
✅ **Established platform** - Trusted by thousands of businesses  
✅ **Better for B2B** - Perfect for professional courses  
✅ **No Stripe dependency** - Independent payment processor  

## 🚀 Setup Process (3-5 days)

### Step 1: Apply for Payoneer Business Account
1. Go to https://payoneer.com/business/
2. Apply with your business information
3. Required documents:
   - Business registration (if applicable)
   - Tax ID or personal ID
   - Bank statement
4. **Processing time**: 1-2 business days
5. **Benefits**: Lower fees, professional invoicing, multi-currency

### Step 2: Create Paddle Account
1. Go to https://paddle.com/
2. Sign up for Paddle Billing
3. Complete business verification:
   - Business details
   - Tax information
   - Identity verification
4. **Processing time**: 2-3 business days
5. Note your **Vendor ID** from dashboard

### Step 3: Configure Paddle
1. In Paddle dashboard → Settings → Authentication
2. Generate **Auth Code** (API key)
3. Get **Public Key** for webhook verification
4. Set up webhook endpoint: `https://your-site.vercel.app/api/paddle/webhook`

### Step 4: Connect Payoneer to Paddle
1. Paddle dashboard → Settings → Payouts
2. Add Payoneer as payout method
3. Provide your Payoneer Business account details
4. Set payout schedule (weekly/monthly)

### Step 5: Update Environment Variables
Update your `api/.env` file:

```env
# Paddle Configuration
PADDLE_VENDOR_ID=12345
PADDLE_AUTH_CODE=your_auth_code_here
PADDLE_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----...
PADDLE_WEBHOOK_SECRET=your_webhook_secret_here
```

### Step 6: Test Integration
1. Use `courses-paddle.html` for testing
2. Set up test products in Paddle
3. Process test transactions
4. Verify webhook delivery

## 💰 Fee Structure

| Transaction Amount | Paddle Fee | Payoneer Fee | Your Keep |
|-------------------|------------|--------------|-----------|
| $100 course | $6.00 (6%) | $1.00 (1%) | **$93.00** |
| $200 course | $12.00 (6%) | $2.00 (1%) | **$186.00** |

**Total fees**: ~7% (much better than Udemy's 50%)

## 🇹🇷 Turkey-Specific Advantages

- **No compliance issues** - Paddle handles all international regulations
- **VAT handling** - Automatic EU VAT, Turkish KDV compliance
- **Local payment methods** - Supports Turkish cards and banking
- **Payoneer integration** - Money flows to your existing business account
- **Professional setup** - Legitimate business structure

## 📊 Revenue Comparison

| Platform | Your Keep | Monthly Fees |
|----------|-----------|--------------|
| **Your Site + Paddle** | **93%** | $0 |
| Udemy | 50% | $0 |
| Teachable | ~90% | $39-119/month |
| Thinkific | ~90% | $49-149/month |

## 🎯 Break-Even Analysis

**Selling 3 courses at $200 each:**
- **Your platform**: $558 profit (93% of $600)
- **Udemy**: $300 profit (50% of $600)
- **Difference**: $258 more profit per 3 sales

## 🔧 Implementation Status

✅ **Paddle integration** - Complete backend API  
✅ **Frontend checkout** - `courses-paddle.html` ready  
✅ **Webhook handling** - Automatic order processing  
✅ **Database integration** - Purchase tracking  
✅ **User management** - Course access control  

## 🚀 Go Live Checklist

1. ✅ Paddle account approved
2. ✅ Payoneer Business account active
3. ✅ Environment variables configured
4. ✅ Test transactions successful
5. ✅ Webhook endpoint verified
6. ✅ Deploy to production

## 📞 Support Resources

- **Paddle Support**: help@paddle.com
- **Payoneer Business**: business-support@payoneer.com
- **Turkey-specific help**: Both platforms have Turkish support

Your course platform with Paddle is the perfect solution for Turkey! 🇹🇷
