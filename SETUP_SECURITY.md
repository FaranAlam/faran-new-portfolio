# 🚀 Security Implementation - Quick Setup Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (Already Done ✅)
```bash
npm install
```

### Step 2: Generate Admin Password
```bash
npm run generate-password
```
- Enter a strong password (min 8 characters)
- Copy the generated hash

### Step 3: Create .env.local File
```bash
# Create file
cp .env.example .env.local
```

### Step 4: Fill in Environment Variables
Edit `.env.local`:

```env
# CRITICAL - Required for login
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<paste-the-hash-from-step-2>

# CRITICAL - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=<your-random-32-char-secret>

# Required for database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# Required for emails
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Site URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 5: Generate NextAuth Secret

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET` in .env.local

### Step 6: Test the Setup
```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login

---

## 📋 What Was Implemented

### 1. Security Headers ✅
- X-Frame-Options (Clickjacking protection)
- Content-Security-Policy (XSS protection)
- Strict-Transport-Security (HTTPS enforcement)
- X-Content-Type-Options (MIME sniffing protection)

**File**: `next.config.ts`

### 2. Password Security ✅
- bcrypt hashing (12 rounds)
- Password strength validation
- No plain text passwords
- Secure password generation

**Files**: 
- `lib/password.ts`
- `auth.ts` (updated)
- `scripts/generate-password.js`

### 3. Rate Limiting ✅
- In-memory rate limiter
- Configurable limits per endpoint
- IP-based tracking
- Proper HTTP 429 responses

**File**: `lib/rate-limit.ts`

**Protected Endpoints**:
- `/api/contact` - 3 requests/hour
- `/api/newsletter` - 2 requests/hour

### 4. Input Sanitization ✅
- XSS prevention
- HTML tag removal
- Email validation
- URL validation
- SQL injection prevention

**File**: `lib/sanitization.ts`

**Updated Routes**:
- `/api/contact` - Full sanitization
- `/api/newsletter` - Email sanitization

### 5. Environment Variables ✅
- Comprehensive .env.example
- No hardcoded credentials
- Secure credential management

**File**: `.env.example` (updated)

### 6. Documentation ✅
- Complete security guide
- Setup instructions
- Best practices
- Security checklist

**File**: `SECURITY.md`

---

## ⚠️ IMPORTANT - Before Going Live

### 1. Change All Credentials
- [ ] Generate new strong admin password
- [ ] Generate new NEXTAUTH_SECRET
- [ ] Use production database
- [ ] Use production email credentials

### 2. Enable HTTPS
- [ ] SSL/TLS certificate installed
- [ ] Force HTTPS redirect
- [ ] Update NEXT_PUBLIC_SITE_URL to https://

### 3. Database Security
- [ ] MongoDB authentication enabled
- [ ] IP whitelist configured
- [ ] Regular backups scheduled

### 4. Email Configuration
- [ ] Gmail App Password (not regular password)
- [ ] 2FA enabled on email account
- [ ] Test email functionality

### 5. Final Checks
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Test all forms with rate limiting
- [ ] Test admin login
- [ ] Verify security headers: https://securityheaders.com
- [ ] Check SSL: https://www.ssllabs.com/ssltest/

---

## 🔧 Common Issues & Solutions

### Issue: "Admin credentials not configured"
**Solution**: Make sure `.env.local` exists and has `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` set.

### Issue: Rate limiting not working
**Solution**: Rate limits reset on server restart (in-memory). For production, consider Redis.

### Issue: Email not sending
**Solution**: 
1. Use Gmail App Password, not regular password
2. Enable 2FA on Gmail account
3. Generate App Password: https://myaccount.google.com/apppasswords

### Issue: Login not working
**Solution**: 
1. Verify password hash was generated correctly
2. Check NEXTAUTH_SECRET is set
3. Check NEXTAUTH_URL matches your domain

### Issue: CORS errors
**Solution**: Update Content-Security-Policy in `next.config.ts` to allow your domains.

---

## 📊 Security Status

### Implemented ✅
- [x] Password hashing
- [x] Rate limiting
- [x] Input sanitization
- [x] Security headers
- [x] Environment variables
- [x] Session security

### Still Todo 🔄
- [ ] Redis-based rate limiting (for production scaling)
- [ ] CAPTCHA integration (spam prevention)
- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] Account lockout (after failed logins)
- [ ] Activity logging/audit trail

---

## 📞 Need Help?

1. Check `SECURITY.md` for detailed documentation
2. Review `.env.example` for all configuration options
3. Test using `npm run dev` before deploying
4. Monitor logs for security errors

---

## 🎯 Next Steps

1. **Immediate**: Complete .env.local setup
2. **Before Deploy**: Follow "Before Going Live" checklist
3. **Post-Deploy**: Monitor for security issues
4. **Regular**: Update dependencies monthly

---

**Setup Time**: ~5 minutes  
**Status**: Ready for development  
**Production Ready**: After completing deployment checklist
