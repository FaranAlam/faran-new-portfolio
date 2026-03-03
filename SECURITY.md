# 🔐 Security Documentation

## Table of Contents
1. [Security Overview](#security-overview)
2. [Setup Instructions](#setup-instructions)
3. [Security Features](#security-features)
4. [Best Practices](#best-practices)
5. [Reporting Vulnerabilities](#reporting-vulnerabilities)

---

## Security Overview

This portfolio website implements multiple layers of security to protect against common web vulnerabilities:

- ✅ **Authentication**: Secure admin authentication with bcrypt password hashing
- ✅ **Rate Limiting**: Protection against brute force and DDoS attacks
- ✅ **Input Sanitization**: XSS and injection attack prevention
- ✅ **Security Headers**: Implementation of modern security HTTP headers
- ✅ **Environment Variables**: Secure credential management
- ✅ **Session Management**: JWT-based secure sessions

---

## Setup Instructions

### 1. Initial Setup

1. **Copy Environment Template**
   ```bash
   cp .env.example .env.local
   ```

2. **Generate Admin Password Hash**
   ```bash
   npm run generate-password
   ```
   - Enter your desired admin password
   - Copy the generated hash to `.env.local`

3. **Generate NextAuth Secret**
   ```bash
   # On Linux/Mac
   openssl rand -base64 32
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```
   - Copy the generated secret to `.env.local`

4. **Configure Required Variables**
   ```env
   # .env.local
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD_HASH=<generated-hash>
   NEXTAUTH_SECRET=<generated-secret>
   MONGODB_URI=<your-mongodb-connection-string>
   EMAIL_USER=<your-email@gmail.com>
   EMAIL_PASSWORD=<your-app-password>
   ```

### 2. Environment Variables Checklist

#### Required (Critical)
- [ ] `ADMIN_EMAIL` - Admin login email
- [ ] `ADMIN_PASSWORD_HASH` - Hashed admin password
- [ ] `NEXTAUTH_SECRET` - NextAuth encryption secret
- [ ] `MONGODB_URI` - Database connection string
- [ ] `EMAIL_USER` - SMTP email address
- [ ] `EMAIL_PASSWORD` - SMTP password/app password

#### Recommended
- [ ] `NEXT_PUBLIC_SITE_URL` - Production site URL
- [ ] `NEXT_PUBLIC_BASE_URL` - Base URL for absolute links

#### Optional
- [ ] `OPENROUTER_API_KEY` - AI chat functionality
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics
- [ ] `SENTRY_DSN` - Error tracking

---

## Security Features

### 1. Password Security

#### Implementation
- **Hashing Algorithm**: bcrypt with 12 salt rounds
- **Password Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

#### Files
- `lib/password.ts` - Password utilities
- `scripts/generate-password.js` - Password hash generator

#### Usage
```typescript
import { hashPassword, verifyPassword } from '@/lib/password';

// Hash a password
const hash = await hashPassword('MySecureP@ssw0rd');

// Verify a password
const isValid = await verifyPassword('MySecureP@ssw0rd', hash);
```

### 2. Rate Limiting

#### Configuration
```typescript
// lib/rate-limit.ts
export const RateLimits = {
  AUTH: { limit: 5, window: 15 * 60 * 1000 },      // 5 per 15 min
  CONTACT: { limit: 3, window: 60 * 60 * 1000 },   // 3 per hour
  NEWSLETTER: { limit: 2, window: 60 * 60 * 1000 }, // 2 per hour
  API_STRICT: { limit: 10, window: 60 * 1000 },    // 10 per min
};
```

#### Implementation Example
```typescript
import { rateLimit, getClientIp, RateLimits } from '@/lib/rate-limit';

// In API route
const clientIp = getClientIp(request);
const rateLimitResult = rateLimit(clientIp, RateLimits.CONTACT);

if (!rateLimitResult.success) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429 }
  );
}
```

#### Protected Endpoints
- ✅ `/api/contact` - 3 requests per hour
- ✅ `/api/newsletter` - 2 requests per hour
- 🔄 `/api/auth/*` - 5 requests per 15 minutes (todo)
- 🔄 `/api/ai-chat` - 10 requests per minute (todo)

### 3. Input Sanitization

#### Features
- HTML tag removal
- Script injection prevention
- Email validation
- URL validation
- SQL injection prevention

#### Files
- `lib/sanitization.ts` - Sanitization utilities

#### Usage
```typescript
import { sanitizeContactForm, sanitizeEmail } from '@/lib/sanitization';

// Sanitize contact form
const clean = sanitizeContactForm({
  name: userInput.name,
  email: userInput.email,
  message: userInput.message
});

// Sanitize email
const email = sanitizeEmail(userInput.email);
```

### 4. Security Headers

#### Implemented Headers
```typescript
// next.config.ts
{
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=63072000',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': '...',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

#### Protection Against
- ✅ Clickjacking (X-Frame-Options)
- ✅ MIME sniffing (X-Content-Type-Options)
- ✅ XSS attacks (CSP, X-XSS-Protection)
- ✅ Man-in-the-middle (HSTS)

### 5. Authentication

#### Features
- JWT-based sessions
- Session expiration (7 days)
- Secure cookie settings
- Role-based access control

#### Configuration
```typescript
// auth.ts
session: {
  strategy: "jwt",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  updateAge: 24 * 60 * 60,  // 24 hours
}
```

---

## Best Practices

### Development

1. **Never Commit Secrets**
   ```bash
   # Always in .gitignore
   .env*.local
   .env
   ```

2. **Use Environment Variables**
   ```typescript
   // ❌ Bad
   const apiKey = "sk-123456789";
   
   // ✅ Good
   const apiKey = process.env.API_KEY;
   ```

3. **Validate All Input**
   ```typescript
   // Always sanitize user input
   const cleanData = sanitizeContactForm(userInput);
   if (!cleanData) {
     return error('Invalid input');
   }
   ```

4. **Use Rate Limiting**
   ```typescript
   // Protect all public endpoints
   const rateLimitResult = rateLimit(clientIp, config);
   ```

### Production

1. **Change Default Credentials**
   - Generate new strong password
   - Use unique email address
   - Rotate credentials regularly

2. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Enable HSTS header
   - Redirect HTTP to HTTPS

3. **Monitor for Attacks**
   - Set up error logging (Sentry)
   - Monitor rate limit hits
   - Review failed login attempts

4. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm audit fix
   npm update
   ```

5. **Database Security**
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication
   - Use least privilege principle
   - Regular backups

### Security Checklist

#### Before Deployment
- [ ] All environment variables configured
- [ ] Strong passwords generated and stored securely
- [ ] NEXTAUTH_SECRET is unique and random
- [ ] Database has authentication enabled
- [ ] Rate limiting tested on all endpoints
- [ ] HTTPS/SSL certificate configured
- [ ] Security headers verified
- [ ] Dependencies updated (`npm audit`)
- [ ] .env files not committed
- [ ] Email SMTP configured with app password

#### Regular Maintenance
- [ ] Review logs for suspicious activity
- [ ] Update dependencies monthly
- [ ] Rotate passwords quarterly
- [ ] Test rate limiting quarterly
- [ ] Review and update CSP headers
- [ ] Monitor failed login attempts
- [ ] Backup database regularly

---

## Known Limitations

### In-Memory Rate Limiting
- **Current**: Uses in-memory storage
- **Limitation**: Resets on server restart, doesn't work across multiple instances
- **Production Solution**: Use Redis or Upstash Rate Limit

### Single Admin User
- **Current**: Only one admin account supported
- **Future**: Multi-user system with role-based access

### Basic Password Reset
- **Current**: No password reset functionality
- **Future**: Email-based password reset with tokens

---

## Reporting Vulnerabilities

If you discover a security vulnerability, please:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [your-email@example.com]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work on a fix.

---

## Additional Resources

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency vulnerability scanner
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL/TLS configuration testing
- [Security Headers](https://securityheaders.com/) - Security headers analyzer

---

## Version History

### v1.0.0 (Current)
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API routes
- ✅ Input sanitization
- ✅ Security headers
- ✅ Environment variable management
- ✅ JWT-based authentication

### Planned (v1.1.0)
- 🔄 Redis-based rate limiting
- 🔄 Two-factor authentication (2FA)
- 🔄 Password reset functionality
- 🔄 Account lockout after failed attempts
- 🔄 CAPTCHA integration
- 🔄 Activity logging and audit trail

---

**Last Updated**: March 2026
**Maintained By**: Faran Alam
