# Course Platform Setup Guide

## Overview
Your course selling platform is now ready! Here's what I've built for you:

### ✅ What's Completed
- **Backend API** (`/api/` folder) - Node.js server with payment processing
- **Course Catalog** (`courses.html`) - Public course listing and purchase page
- **Admin Panel** (`admin.html`) - Course management interface
- **Database** - SQLite database with user, course, and payment tables
- **Authentication** - User registration and login system
- **Payment Integration** - Stripe payment processing ready

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd "C:\Users\Lenovo\Desktop\Allen Ralford Barkley\api"
npm install
```

### 2. Set Up Environment Variables
1. Copy `.env.example` to `.env`
2. Get your Stripe keys from https://dashboard.stripe.com/
3. Update the `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# JWT Configuration  
JWT_SECRET=your_super_secure_random_string_here

# Database
DATABASE_URL=./database.sqlite

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Origins
FRONTEND_URL=https://your-site.vercel.app
LOCAL_FRONTEND_URL=http://localhost:3000
```

### 3. Update Frontend Configuration
In `courses.html` and `admin.html`, update the API_BASE URL:
```javascript
const API_BASE = 'https://your-site.vercel.app/api'; // Replace with your actual domain
```

Also update the Stripe publishable key in `courses.html`:
```javascript
const stripe = Stripe('pk_live_your_actual_stripe_publishable_key');
```

### 4. Test Locally
```bash
cd api
npm run dev
```
Then open `courses.html` in your browser.

### 5. Deploy to Vercel
```bash
git add .
git commit -m "Add course platform"
git push origin main
```

## 💳 Payment Setup Options

### Option 1: Stripe + Payoneer (Recommended)
1. Create Stripe account at https://stripe.com/
2. Connect your Payoneer account to Stripe for payouts
3. Accepts all major credit cards globally
4. Fees: 2.9% + $0.30 per transaction

### Option 2: Garanti Bank Integration
- Contact Garanti Bank for merchant account
- Lower fees for Turkish customers
- Requires additional development for their API

### Option 3: Hybrid Approach
- Use both Stripe (international) and Garanti (domestic)
- Maximize reach and minimize fees

## 🎓 Course Management

### Adding Your First Course
1. Go to `/admin.html` 
2. Create an admin account (first user becomes admin)
3. Add course details:
   - Title and description
   - Price in USD
   - Video URL (YouTube, Vimeo, or self-hosted)
   - Course level and duration
4. Publish the course

### Video Hosting Options
- **Vimeo Pro**: Secure, customizable player
- **YouTube**: Free but less control
- **Self-hosted**: Maximum control, requires CDN

## 🔒 Security Features
- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- SQL injection prevention
- XSS protection headers

## 📊 Analytics & Management
- User dashboard with purchase history
- Admin panel with course and user management
- Payment tracking and status monitoring
- Course progress tracking

## 🛠️ Next Steps
1. **Set up Stripe account** and get API keys
2. **Create your first course** content
3. **Test the payment flow** with Stripe test mode
4. **Deploy to production** and go live!

## 💰 Revenue Optimization
- **No platform fees** (unlike Udemy's 50% cut)
- **Direct customer relationship**
- **Full control over pricing**
- **Keep 97.1% of revenue** (after Stripe fees)

## Support
If you need help with:
- Stripe account setup
- Video hosting integration
- Custom features
- Garanti Bank integration

Just let me know!
