# 🚀 Quick Reference Guide

## Development Commands

### Start Development
```bash
npm run dev
# Opens: http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

### Check Code Quality
```bash
npm run lint        # ESLint check
npm run type-check  # TypeScript check
```

---

## Common Tasks

### Add New Blog Post
1. Go to `/admin/dashboard/blog`
2. Click "Create New Post"
3. Fill form (title, content, category, tags)
4. Save as draft or publish

### Add Email Template
1. Go to `/admin/dashboard/email-templates`
2. Click "Create Template"
3. Use variables: `{{name}}`, `{{email}}`, `{{link}}`
4. Save template

### View Activity Logs
1. Go to `/admin/dashboard/activity`
2. Filter by category or severity
3. View action details
4. Export CSV if needed

### Create Database Backup
1. Go to `/admin/dashboard/backup`
2. Click "Export Database"
3. Download JSON file
4. Store in safe location

### Restore from Backup
1. Go to `/admin/dashboard/backup`
2. Click "Upload Backup"
3. Select JSON file
4. Confirm restore

### Update Admin Profile
1. Go to `/admin/dashboard/settings`
2. Click Profile tab
3. Upload picture (max 5MB)
4. Update information
5. Save changes

### Change Admin Password
1. Go to `/admin/dashboard/settings`
2. Click Password tab
3. Enter current & new password
4. Click "Change Password"

---

## Environment Variables

### Required Variables
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Authentication
NEXTAUTH_SECRET=<32-char-random-string>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<bcrypt-hash>

# Email
GMAIL_USER=email@gmail.com
GMAIL_PASSWORD=<app-password>
```

### Generate Variables

**NextAuth Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Password Hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password', 12))"
```

---

## API Endpoints

### Contact
```
GET /api/contact                    # Get all messages
POST /api/contact                   # Submit form
PUT /api/contact/:id                # Update status
DELETE /api/contact/:id             # Delete message
```

### Newsletter
```
GET /api/newsletter                 # Get subscribers
POST /api/newsletter                # Subscribe
DELETE /api/newsletter/:id          # Unsubscribe
POST /api/newsletter/send           # Send newsletter
```

### Blog
```
GET /api/blog                       # Get posts
GET /api/blog/:slug                 # Get single post
POST /api/blog                      # Create post
PUT /api/blog/:id                   # Update post
DELETE /api/blog/:id                # Delete post
```

### Email Templates
```
GET /api/email-templates            # Get templates
POST /api/email-templates           # Create template
PUT /api/email-templates/:id        # Update template
DELETE /api/email-templates/:id     # Delete template
```

### Activity Logs
```
GET /api/activity-logs              # Get logs
POST /api/activity-logs             # Create log
DELETE /api/activity-logs/:id       # Delete log
```

### Backup
```
GET /api/backup?action=stats        # Get statistics
GET /api/backup?action=export       # Export database
POST /api/backup?action=restore     # Restore database
```

### Admin Profile
```
GET /api/admin/profile              # Get profile
POST /api/admin/profile             # Save profile
```

---

## File Structure

### Important Directories
```
app/
├── api/                 # API routes
├── admin/               # Admin pages
└── page.tsx             # Homepage

components/
├── layout/              # Layout components
├── sections/            # Page sections
└── ui/                  # Reusable UI

lib/
├── mongodb.ts          # Database client
├── email.ts            # Email utilities
└── activity-logger.ts  # Logging

public/
├── images/             # Images & assets
└── resources/          # Downloadable files
```

---

## Troubleshooting

### MongoDB Won't Connect
```bash
# Check URI in .env.local
# Verify IP is whitelisted in MongoDB Atlas
# Ensure cluster is running
```

### Email Not Sending
```bash
# Verify Gmail app password
# Check 2FA is enabled
# Test in development first
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 in Use
```bash
npx kill-port 3000
npm run dev
```

---

## Deployment

### Deploy to Vercel
1. Push to GitHub
2. Connect repo on Vercel
3. Add environment variables
4. Click Deploy

### Deploy to Netlify
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Add environment variables
4. Deploy

### Docker Deploy
```bash
docker build -t portfolio .
docker run -p 3000:3000 -e MONGODB_URI=<uri> portfolio
```

---

## Performance Tips

### Optimize Images
- Use Next.js `<Image />` component
- Optimize before uploading
- Use modern formats (WebP)

### Improve Database
- Add indexes for frequently queried fields
- Monitor query performance
- Archive old activity logs

### Reduce Bundle Size
- Code split large components
- Use dynamic imports
- Remove unused dependencies

### Caching
- Set Cache-Control headers
- Use CDN for static assets
- Implement page caching

---

## Security Tips

### Keep Secrets Safe
- Never commit `.env.local`
- Use strong passwords
- Rotate credentials regularly

### Protect Database
- Enable SSL/TLS
- IP whitelist in MongoDB
- Regular backups
- Monitor activity logs

### Secure Emails
- Use app-specific passwords
- Enable 2FA
- Don't hardcode credentials
- Use HTTPS everywhere

---

## Testing Checklist

### Frontend
- [ ] Contact form works
- [ ] Newsletter subscribes
- [ ] Dark mode toggles
- [ ] Mobile responsive
- [ ] All links work

### Admin
- [ ] Login works
- [ ] Dashboard loads
- [ ] Can create blog post
- [ ] Can upload profile pic
- [ ] Can export data

### Backend
- [ ] APIs respond
- [ ] Database saves
- [ ] Email sends
- [ ] Logs recorded
- [ ] Backups work

---

## Useful Resources

### Documentation
- [README.md](README.md) - Project overview
- [FEATURES.md](FEATURES.md) - All features
- [INSTALLATION.md](INSTALLATION.md) - Setup
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - APIs
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment

### External Links
- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [NextAuth Docs](https://next-auth.js.org/)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

## Keyboard Shortcuts

### Development
- `Ctrl+K` - Open command palette (VS Code)
- `Ctrl+Shift+B` - Build
- `F5` - Start debugging

### Admin Dashboard
- `Alt+D` - Go to dashboard
- `Alt+M` - Go to messages
- `Alt+B` - Go to blog
- `Ctrl+/` - Search

---

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| ENOTFOUND MongoDB | Check URI, IP whitelist, cluster running |
| Port in use | `npx kill-port 3000` |
| Build fails | `rm -rf .next && npm run build` |
| Env vars missing | Check `.env.local` exists and all vars set |
| Email not sending | Verify Gmail app password, 2FA enabled |
| Login fails | Check credentials in `.env.local` |
| Slow performance | Check database indexes, optimize queries |

---

## Git Commands

```bash
# Clone repository
git clone <repo-url>

# Create new branch
git checkout -b feature-name

# Commit changes
git add .
git commit -m "Describe changes"

# Push to GitHub
git push origin branch-name

# Create Pull Request
# (on GitHub website)
```

---

## Database Maintenance

### Backup
```bash
# Manual export
curl http://localhost:3000/api/backup?action=export > backup.json
```

### Restore
```bash
# Upload via admin dashboard
# /admin/dashboard/backup → Upload Backup
```

### Cleanup
1. Archive old activity logs
2. Remove inactive subscribers
3. Delete spam messages
4. Optimize indexes

---

## Monitoring

### Check Logs
```bash
# Admin dashboard → Activity Logs
# Filter by category and severity
```

### Monitor Performance
- Check Lighthouse scores
- Monitor database size
- Track API response times
- Review error logs

### Analytics
- Server logs
- Activity logs
- MongoDB Atlas metrics
- Vercel analytics (if deployed)

---

## Future Tasks

- [ ] Add image gallery
- [ ] Implement comments
- [ ] Add search optimization
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Real-time notifications

---

**Last Updated:** January 2024  
**Maintained By:** Faran Alam  
**Status:** Updated & Accurate ✅

**Happy coding! 🚀**
