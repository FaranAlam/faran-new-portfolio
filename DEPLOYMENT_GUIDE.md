# 🚀 Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the official Next.js hosting platform with built-in optimizations.

#### Step 1: Prepare Repository

```bash
# Ensure everything is committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Add Environment Variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=https://your-domain.com
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD_HASH=<hashed-password>
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=<app-password>
   ```
7. Click "Deploy"

**Deployment time:** 3-5 minutes

**Automatic features:**
- ✅ SSL certificate (free)
- ✅ CDN distribution
- ✅ Preview deployments
- ✅ Analytics
- ✅ Serverless functions

#### Step 3: Configure Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your domain (e.g., faranalam.com)
3. Follow DNS configuration instructions
4. Update DNS records with your domain provider

#### Step 4: Monitor Deployment

```
Dashboard → Deployments → View logs
```

---

### Option 2: Netlify

Alternative to Vercel with similar features.

#### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "New Site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (if exporting statically)

#### Step 2: Environment Variables

Go to Site settings → Build & Deploy → Environment

Add all required variables (same as Vercel)

#### Step 3: Deploy

Netlify automatically deploys on every push to main branch

---

### Option 3: Self-Hosted (AWS/DigitalOcean/Heroku)

For more control or specific requirements.

#### Preparation

```bash
# Build the application
npm run build

# This creates a .next folder ready for production
```

#### Deploy to DigitalOcean (App Platform)

```bash
# 1. Create DigitalOcean account
# 2. Create a new App
# 3. Connect GitHub repository
# 4. Configure build settings:
Build Command: npm run build
Run Command: npm start

# 5. Set environment variables
# 6. Deploy
```

#### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add buildpack for Node.js
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set MONGODB_URI=<uri>
heroku config:set NEXTAUTH_SECRET=<secret>
heroku config:set NEXTAUTH_URL=https://your-app-name.herokuapp.com

# Deploy
git push heroku main
```

---

### Option 4: Docker (Any Cloud Provider)

For maximum portability.

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: ${MONGODB_URI}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      ADMIN_EMAIL: ${ADMIN_EMAIL}
      ADMIN_PASSWORD_HASH: ${ADMIN_PASSWORD_HASH}
      GMAIL_USER: ${GMAIL_USER}
      GMAIL_PASSWORD: ${GMAIL_PASSWORD}
    restart: unless-stopped
```

#### Deploy Docker Image

```bash
# Build image
docker build -t faran-portfolio:latest .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI=<uri> \
  -e NEXTAUTH_SECRET=<secret> \
  faran-portfolio:latest

# Or use docker-compose
docker-compose up -d
```

---

## Pre-Deployment Checklist

### Code Quality
- ✅ Run linting: `npm run lint`
- ✅ Check TypeScript: `npm run type-check`
- ✅ No console errors/warnings
- ✅ All tests passing (if applicable)

### Security
- ✅ Never commit `.env.local`
- ✅ Strong `NEXTAUTH_SECRET` (32+ chars)
- ✅ Strong admin password (15+ chars)
- ✅ MongoDB credentials are secure
- ✅ Gmail app-password generated correctly

### Database
- ✅ MongoDB cluster ready
- ✅ IP whitelist includes production server
- ✅ Database backup created
- ✅ Collections initialized
- ✅ Indexes created

### Email
- ✅ Gmail app-password tested
- ✅ Email sending works in development
- ✅ Email templates created
- ✅ Reply-to address configured

### Performance
- ✅ Build succeeds: `npm run build`
- ✅ No build warnings
- ✅ Production optimization enabled
- ✅ Images optimized

---

## Environment Variables (Production)

Create `.env.production` or set via deployment platform:

```env
# Next.js
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database?retryWrites=true&w=majority

# Authentication
NEXTAUTH_SECRET=<strong-32-char-random-string>
NEXTAUTH_URL=https://yourdomain.com
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<bcrypt-hashed-password>

# Email Service
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=<16-char-app-password>
EMAIL_FROM_NAME=Faran Portfolio
EMAIL_FROM_ADDRESS=noreply@yourdomain.com

# Optional: CDN/Storage (if using image optimization)
# NEXT_PUBLIC_CLOUDFRONTDOMAIN=<your-cdn-domain>
```

---

## Build Optimization

### Vercel Deployment

Vercel automatically optimizes:
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ CSS optimization
- ✅ Dynamic import code splitting
- ✅ Minification

### Manual Optimization

Check `next.config.ts`:

```typescript
// Ensure these are set for production
{
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
}
```

---

## Monitoring & Analytics

### Vercel Analytics

1. Go to Vercel Dashboard
2. Project → Analytics
3. View real time metrics:
   - Page load times
   - Error rates
   - Traffic patterns

### Application Monitoring

Use services like:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **UptimeRobot** - Uptime monitoring
- **Papertrail** - Log aggregation

### Activity Logs

Check admin dashboard for:
- User actions
- System events
- Security alerts
- Error logs

---

## Database Backups

### Schedule Regular Backups

MongoDB Atlas automatic backups:
1. Go to MongoDB Atlas
2. Project → Backup
3. Enable automatic backups (free tier: daily)

### Manual Backup

```bash
# From admin dashboard
Dashboard → Backup & Restore → Export

# Or via API
curl http://your-domain.com/api/backup?action=export > backup.json
```

### Restore from Backup

1. Download backup file from admin dashboard
2. Dashboard → Backup & Restore → Restore
3. Upload backup file
4. Confirm restore

---

## SSL/HTTPS

### Vercel (Automatic)
- ✅ Free SSL certificate
- ✅ Auto-renewal
- ✅ HSTS headers included

### Custom Domain
1. Update DNS records (CNAME/A record)
2. SSL certificate auto-issued within 24 hours
3. All traffic forced to HTTPS

### Test SSL

```bash
# Check certificate
openssl s_client -connect yourdomain.com:443

# Or use online tool
https://www.sslshopper.com/ssl-checker.html
```

---

## Performance Tuning

### Lighthouse Scores (Target)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Optimization Tips

1. **Image Optimization**
   - Use Next.js `<Image />` component
   - Add sizes attribute
   - Use modern formats (WebP)

2. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting

3. **Database Queries**
   - Add proper indexes
   - Cache frequently accessed data
   - Optimize aggregation pipelines

4. **Caching Strategy**
   - Set Cache-Control headers
   - Use CDN for static assets

---

## Troubleshooting Deployment

### Issue: Build Fails

```
Error during build
```

**Solution:**
```bash
# Check build locally
npm run build

# Fix any errors
npm run lint
npm run type-check

# Try again
```

### Issue: Environment Variables Not Reading

```
Error: NEXTAUTH_SECRET not defined
```

**Solution:**
1. Verify variables are set in deployment platform
2. Redeploy after setting variables
3. Check variable names match exactly

### Issue: Database Connection Timeout

```
MongoServerSelectionError: getaddrinfo ENOTFOUND
```

**Solution:**
1. Verify MongoDB URI is correct
2. Check IP whitelist in MongoDB Atlas
3. Add deployment server IP to whitelist
4. Test connection locally first

### Issue: Email Not Sending

```
Error: Invalid login
```

**Solution:**
1. Verify Gmail app password is correct
2. Ensure 2FA is enabled on Gmail
3. Check GMAIL_USER matches configured email
4. Test locally before deploying

### Issue: 502 Bad Gateway

```
502 Bad Gateway
```

**Likely causes:**
- Application crash
- Environment variables missing
- Database connection failed

**Debug:**
1. Check deployment logs
2. Verify environment variables set
3. Check database connectivity
4. Restart deployment

---

## Post-Deployment Steps

### 1. Verify Website

- ✅ Visit https://yourdomain.com
- ✅ Check homepage loads
- ✅ Test dark mode toggle
- ✅ Fill contact form
- ✅ Subscribe to newsletter

### 2. Verify Admin Dashboard

- ✅ Login at /admin/login
- ✅ View dashboard
- ✅ Check activity logs
- ✅ Test profile picture upload
- ✅ Create test blog post

### 3. Verify Email

- ✅ Send test contact form
- ✅ Receive admin notification
- ✅ Subscribe to newsletter
- ✅ Verify email received

### 4. Monitor Initial Traffic

- ✅ Check analytics
- ✅ Monitor error logs
- ✅ Check database performance
- ✅ Verify email delivery

### 5. Setup Monitoring

- ✅ Enable error tracking (Sentry)
- ✅ Configure uptime monitoring
- ✅ Set up log aggregation
- ✅ Enable performance monitoring

---

## Maintenance

### Weekly
- Review activity logs
- Check for errors
- Monitor database size

### Monthly
- Review analytics
- Test backup/restore
- Update dependencies (`npm update`)
- Review security logs

### Quarterly
- Full security audit
- Performance optimization
- Database cleanup
- Archive old logs

### Annually
- Review entire architecture
- Plan improvements
- Security assessment
- Plan for scaling

---

## Scaling Considerations

As your portfolio grows:

1. **Database Scaling**
   - Move from M0 to M2+ cluster
   - Enable sharding if needed
   - Optimize indexes

2. **Application Scaling**
   - Vercel automatically scales
   - Monitor performance metrics
   - Optimize slow endpoints

3. **Asset Scaling**
   - Use CDN for images
   - Implement caching
   - Compress static files

4. **Traffic Scaling**
   - Monitor rate limits
   - Increase API quotas
   - Cache responses

---

## Rollback Procedure

If deployment goes wrong:

### Via Vercel
1. Dashboard → Deployments
2. Find previous stable deployment
3. Click "Redeploy"
4. Wait for redeployment

### Via Git
```bash
# Rollback to previous commit
git revert <commit-hash>
git push origin main

# Deployment platform auto-redeploys
```

### Emergency Database Restore
1. Go to MongoDB Atlas
2. Clusters → Point in Time Restore
3. Select backup time
4. Restore to snapshot

---

## Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [NextAuth Deployment](https://next-auth.js.org/deployment)
- [Sentry Error Tracking](https://sentry.io/)

---

**Deployment Document Last Updated:** January 2024
**Status:** Production Ready ✅

**Ready to deploy? Let's go! 🚀**
