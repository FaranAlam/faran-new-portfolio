# 🚀 Installation & Setup Guide

## System Requirements

- **Node.js:** 18.x or higher
- **npm:** 8.x or higher (or yarn/pnpm)
- **MongoDB:** Free Atlas account
- **Git:** For version control
- **Text Editor:** VS Code recommended

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/faranalam/faran-portfolio.git
cd faran-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

This will install all 476+ required packages including:
- Next.js 15.5.12
- React 18
- TypeScript
- Tailwind CSS
- NextAuth v5
- MongoDB driver
- Nodemailer
- react-icons
- recharts
- next-themes
- And more...

**Installation time:** ~2-5 minutes depending on internet speed

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# ===================================
# AUTHENTICATION & SECURITY
# ===================================

# Admin Login Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<your-bcrypt-hash-here>

# NextAuth Configuration
NEXTAUTH_SECRET=<generate-random-string>
NEXTAUTH_URL=http://localhost:3002

# ===================================
# DATABASE
# ===================================

# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

# ===================================
# EMAIL SERVICE
# ===================================

# SMTP Email Configuration (Gmail example)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
EMAIL_FROM_NAME=Faran Portfolio
EMAIL_FROM_ADDRESS=noreply@faranalam.com
```

### 4. Generate Required Credentials

#### Generate NEXTAUTH_SECRET

```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using node
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output to `NEXTAUTH_SECRET` in `.env.local`

#### Generate Admin Password Hash

```bash
node -e "const bcrypt = require('bcryptjs'); const password = 'your-secure-password'; const hash = bcrypt.hashSync(password, 12); console.log(hash);"
```

**Important:** Use a strong password (15+ characters, mix of upper/lowercase, numbers, special characters)

### 5. Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project
4. Create a cluster (M0 free tier)
5. Add database user credentials
6. Get connection string (looks like): 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   ```
7. Add your IP to IP Access List
8. Paste connection string in `.env.local`

#### Option B: Local MongoDB

```bash
# Install MongoDB locally
# Then start the service
mongod
```

Connection string: `mongodb://localhost:27017/portfolio`

### 6. Set Up Email Service

#### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an "App Password":
   - Go to myaccount.google.com
   - Security settings
   - App passwords (requires 2FA)
   - Select "Mail" and "Windows Computer"
   - Copy the generated password

3. Add to `.env.local`:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ```

#### Using Other Email Services

See [Nodemailer docs](https://nodemailer.com/) for other providers (Outlook, Yahoo, custom SMTP, etc.)

### 7. Initialize Database (Optional)

```bash
# Start the dev server first in another terminal
npm run dev

# Then run initialization
curl http://localhost:3000/api/init-db
```

This will create default collections and indexes.

### 8. Start Development Server

```bash
npm run dev
```

Output will show:
```
  ▲ Next.js 15.5.12
  - Local:        http://localhost:3000
```

### 9. Access Application

**Website:** [http://localhost:3000](http://localhost:3000)

**Admin Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Admin Dashboard:** [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

**Admin Credentials:**
- Email: (from `ADMIN_EMAIL` in `.env.local`)
- Password: (the plain text password you hashed)

---

## Troubleshooting Installation

### Issue: MongoDB Connection Failed

```
Error: getaddrinfo ENOTFOUND ac-wlww6xe-shard-00-00.mongodb.net
```

**Solutions:**
1. Check MongoDB URI is correct in `.env.local`
2. Verify IP address is whitelisted in MongoDB Atlas
   - Go to Security → IP Access List
   - Add your IP address (or 0.0.0.0/0 for development)
3. Ensure MongoDB cluster is running
4. Check internet connection

### Issue: NextAuth Secret Error

```
NEXTAUTH_SECRET not configured
```

**Solution:**
```bash
# Generate and add to .env.local
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Issue: Port 3000 Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Issue: Dependencies Installation Failed

```
npm ERR! 404 Not Found - GET
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Compilation Error

```
Type error: Property 'X' does not exist on type 'Y'
```

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build

# Or run dev server again
npm run dev
```

### Issue: Email Not Sending

```
Error: Invalid login
```

**Solutions:**
1. Verify Gmail App Password is correct (16 characters with hyphens)
2. Ensure 2-Factor Authentication is enabled
3. Check email address is correct
4. Try a test email via console

---

## Post-Installation Setup

### 1. Update Admin Profile

1. Go to Dashboard → Settings
2. Upload a profile picture
3. Fill in your information
4. Save changes

### 2. Customize Website

Edit the following files:

- **Site Info:** `next.config.ts`
- **Styling:** `tailwind.config.ts`
- **Font:** `app/layout.tsx`
- **Content:** `components/sections/*.tsx`

### 3. Create First Blog Post

1. Go to Dashboard → Blog
2. Click "Create New Post"
3. Fill in the form
4. Save as draft or publish

### 4. Set Up Email Templates

1. Go to Dashboard → Email Templates
2. Click "Create Template"
3. Use template variables like `{{name}}`, `{{email}}`
4. Save the template

### 5. Enable Newsletter

1. Website home page → Newsletter section
2. Test subscription with test email
3. Verify email received

### 6. Test Contact Form

1. Go to website home page
2. Fill contact form
3. Check Messages in Dashboard
4. Check your email for notification

---

## Verification Checklist

- ✅ Node.js installed (node --version)
- ✅ Dependencies installed (npm list)
- ✅ `.env.local` configured with all variables
- ✅ MongoDB connection working
- ✅ Email service configured
- ✅ Development server running (npm run dev)
- ✅ Website loads at http://localhost:3000
- ✅ Admin login works
- ✅ Dashboard accessible
- ✅ Contact form sends emails
- ✅ Newsletter subscription works
- ✅ Admin profile picture saves

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting checks
npm run lint

# Check TypeScript types
npm run type-check

# Format code
npm run format
```

---

## Project Statistics

- **Files:** 100+
- **Components:** 50+
- **API Routes:** 15+
- **Pages:** 25+
- **Dependencies:** 476 verified packages
- **Lines of Code:** 10,000+
- **Database Collections:** 8
- **TypeScript Coverage:** 100%

---

## Next Steps

1. **Customize Content:** Update all text and images
2. **Configure Email:** Set up email notifications
3. **Add Blog Posts:** Create your first article
4. **Create Projects:** Showcase your work
5. **Set Social Links:** Add your profiles
6. **Deploy:** Ready to deploy to production

---

## Deployment Preparation

Before deploying to production:

1. ```bash
   npm run build
   ```
   Verify no build errors

2. Create backups of MongoDB data
3. Generate strong passwords
4. Set production environment variables
5. Test all features on production URL
6. Enable monitoring and logging
7. Set up SSL certificates

---

## Support

For issues or questions:

1. Check the [troubleshooting guide](#troubleshooting-installation)
2. Review [FEATURES.md](FEATURES.md) for feature details
3. Check [Technical Architecture](TECHNICAL_ARCHITECTURE.md)
4. Open an issue on GitHub

---

**You're all set! Happy building! 🚀**
