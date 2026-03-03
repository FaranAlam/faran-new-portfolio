# Faran Portfolio - Full Stack Next.js Application

A modern, feature-rich portfolio website with professional admin dashboard. Built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

## 🚀 Features Included

### 📱 Public Website
- ✅ Modern hero section with animations
- ✅ About & Skills sections
- ✅ Portfolio/Projects showcase (3D cards)
- ✅ Services section
- ✅ Blog preview
- ✅ Testimonials
- ✅ Contact form with email notifications
- ✅ Newsletter subscription
- ✅ Full dark mode support
- ✅ SEO optimized
- ✅ Responsive design

### 🎛️ Admin Dashboard (6+ Major Features)
1. **🌙 Dark Mode** - Switch between light/dark themes with system detection
2. **📋 Activity Logs** - Complete audit trail of all admin activities
3. **🔍 Advanced Search** - Filter messages, newsletters, and content
4. **📝 Blog Management** - Full CMS with create, edit, publish workflow
5. **✉️ Email Templates** - Design reusable email templates with variables
6. **💾 Database Backup** - Export/import all collections for disaster recovery
7. **📊 Analytics Dashboard** - View metrics and performance
8. **📧 Message Management** - Handle contact submissions
9. **📮 Newsletter Management** - Manage subscribers
10. **⚙️ Settings & Profile** - Admin profile with picture upload

## 🚀 Tech Stack

- **Framework:** Next.js 15.5.12 (React 18, App Router)
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB Atlas (8 collections)
- **Authentication:** NextAuth v5 + bcrypt
- **Styling:** Tailwind CSS with dark mode
- **UI Icons:** Material Design Icons (react-icons)
- **Email:** Nodemailer with Gmail SMTP
- **Charts:** recharts for analytics
- **Animations:** Framer Motion, CSS animations
- **Package Manager:** npm (476+ verified packages)
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
├── app/
│   ├── api/                  # API Routes (15+ endpoints)
│   │   ├── auth/            # NextAuth configuration
│   │   ├── contact/         # Contact form handling
│   │   ├── newsletter/      # Newsletter management
│   │   ├── blog/            # Blog CRUD operations
│   │   ├── email-templates/ # Email template management
│   │   ├── activity-logs/   # Activity logging
│   │   ├── backup/          # Database backup/restore
│   │   └── admin/           # Admin-specific APIs
│   ├── admin/
│   │   └── dashboard/       # Admin dashboard pages
│   │       ├── home/        # Dashboard overview
│   │       ├── messages/    # Contact messages
│   │       ├── newsletter/  # Newsletter subscribers
│   │       ├── blog/        # Blog management
│   │       ├── email-templates/ # Email templates
│   │       ├── analytics/   # Analytics dashboard
│   │       ├── activity/    # Activity logs
│   │       ├── backup/      # Backup management
│   │       ├── settings/    # Admin settings & profile
│   │       └── login/       # Admin login
│   ├── layout.tsx           # Root layout with Provider
│   ├── page.tsx             # Home page with all sections
│   └── globals.css          # Global styles
│
├── components/
│   ├── animations/          # Animation components
│   │   ├── FadeIn.tsx
│   │   ├── ScaleIn.tsx
│   │   └── StaggerContainer.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer
│   │   ├── AdminSidebar.tsx # Admin sidebar (13 icons)
│   │   ├── AdminWrapper.tsx # Admin layout wrapper
│   │   └── FloatingWhatsApp.tsx
│   ├── sections/            # Page sections (20+ components)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   └── ... (20+ more)
│   ├── ui/                  # UI components (10+ reusable)
│   │   ├── DarkModeToggle.tsx
│   │   ├── Card3D.tsx
│   │   ├── CustomCursor.tsx
│   │   └── ... (more utilities)
│   └── seo/
│       └── StructuredData.tsx
│
├── lib/
│   ├── mongodb.ts          # MongoDB client
│   ├── email.ts            # Email sending utilities
│   ├── activity-logger.ts  # Activity logging
│   ├── db.ts               # Database functions
│   ├── storage.ts          # File storage utilities
│   └── init-db.ts          # Database initialization
│
├── public/
│   ├── images/
│   ├── resources/
│   └── robots.txt
│
├── auth.ts                 # NextAuth configuration
├── middleware.ts           # NextAuth middleware
├── package.json            # Dependencies (476 packages)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── .env.local              # Environment variables (secret)
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **MongoDB Atlas account** (free tier available)
- **.env.local** file with credentials

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd faran-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.local.example .env.local
# Edit .env.local with your MongoDB URI, NextAuth secret, etc.
```

4. **Initialize the database (optional):**
```bash
curl http://localhost:3000/api/init-db
```

5. **Start development server:**
```bash
npm run dev
```

6. **Access the application:**
- 🌐 Website: [http://localhost:3000](http://localhost:3000)
- 🔐 Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- 📊 Dashboard: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## 📄 Available Scripts

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint checks
npm run type-check # Check TypeScript types
```

## 🎨 Website Features

### Home Page Sections
- **Hero:** Eye-catching intro with CTA buttons
- **About:** Personal background and highlights
- **Skills:** Technical skills with progress bars
- **Services:** Offered services with icons
- **Experience:** Work history and timeline
- **Education:** Academic background
- **Portfolio:** Project showcase with 3D cards
- **Case Studies:** Detailed project breakdowns
- **Testimonials:** Client feedback
- **Blog Preview:** Latest articles
- **Pricing:** Service pricing tiers (if applicable)
- **Contact:** Contact form with validation
- **Newsletter:** Email subscription
- **FAQ:** Common questions
- **Before/After:** Work samples

### User Experience
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode / Light mode toggle
- ✅ Smooth scroll animations
- ✅ Parallax effects
- ✅ Custom cursor
- ✅ Loading animations
- ✅ Progress indicators
- ✅ Fast page loads (Lighthouse optimized)
- ✅ SEO structured data
- ✅ Accessibility (WCAG AA)

## 🎛️ Admin Dashboard Features

### Core Admin Features
1. **🏠 Dashboard Home**
   - Quick statistics (messages, newsletter, projects)
   - Recent activities
   - Quick links to key sections

2. **📧 Messages Management**
   - View all contact form submissions
   - Search and filter messages
   - Mark as read/replied
   - Export to CSV
   - Date range filtering

3. **📮 Newsletter Management**
   - Manage email subscribers
   - Send newsletters
   - Track subscriber growth
   - Filter by status
   - Export subscriber list

4. **📝 Blog CMS**
   - Create/edit/delete blog posts
   - Draft and publish workflow
   - Categories and tags
   - Featured posts
   - View tracking

5. **📊 Analytics Dashboard**
   - Message statistics
   - Newsletter metrics
   - Download tracking
   - Performance insights

6. **✉️ Email Templates**
   - Design reusable templates
   - Variable system (`{{name}}`, `{{email}}`)
   - HTML & text versions
   - Template categories
   - Activate/deactivate

7. **📋 Activity Logs**
   - Audit trail of all admin activities
   - Filter by category and severity
   - IP address tracking
   - Detailed timestamps
   - Export logs

8. **💾 Backup & Restore**
   - One-click database export
   - Full collection backup
   - Restore from JSON file
   - Collection statistics

9. **⚙️ Settings & Profile**
   - Upload profile picture (with database save)
   - Update admin information
   - Change password (bcrypt hashed)
   - Social media links
   - Contact information

### Technical Admin Features
- ✅ Session-based authentication
- ✅ Role-based access control
- ✅ Activity logging
- ✅ Data filtering and search
- ✅ CSV export
- ✅ Error handling
- ✅ Loading states
- ✅ Dark mode support

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (`.env.local`)
   - Click Deploy

### Deploy to Other Platforms

**Build the project:**
```bash
npm run build
npm run start
```

**Environment Variables (Production):**
- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXTAUTH_SECRET` - Secure random string (min 32 characters)
- `NEXTAUTH_URL` - Your production domain
- `ADMIN_EMAIL` - Admin email
- `ADMIN_PASSWORD_HASH` - Bcrypt hashed password
- `GMAIL_USER` / `GMAIL_PASSWORD` - Email credentials (for Nodemailer)

### Deployment Checklist

- ✅ All environment variables configured
- ✅ MongoDB Atlas IP whitelist updated
- ✅ Email credentials tested
- ✅ NextAuth secret generated
- ✅ Admin credentials set
- ✅ Build completes without errors
- ✅ Database collections initialized
- ✅ Backup created before deployment

## 📝 Customization

### Update Website Content

**Home Page Sections:**
- Edit `components/sections/*.tsx` files
- Update text, images, and styling
- All sections are modular and reusable

**Navigation & Branding:**
- Header: `components/layout/Header.tsx`
- Footer: `components/layout/Footer.tsx`
- Logo: `public/images/` and `app/layout.tsx`
- Site title/description: `next.config.ts`

**Contact & Social:**
- Contact email: `components/sections/Contact.tsx`
- Social links: `components/layout/Footer.tsx`
- WhatsApp: `components/layout/FloatingWhatsApp.tsx`

### Customize Styling

**Colors & Theme:**
- Edit `tailwind.config.ts` for theme colors
- Modify CSS variables in `app/globals.css`
- Dark mode colors in `app/globals.css`

**Fonts:**
- View font imports in `app/layout.tsx`
- Change from Google Fonts or use local fonts

**Animations:**
- Modify animation timing in component files
- Edit keyframes in `app/globals.css`
- Adjust Framer Motion properties

### Customize Admin Dashboard

**Add New Menu Items:**
- Edit `components/layout/AdminSidebar.tsx`
- Add new routes in `app/admin/dashboard/`
- Update navigation items

**Customize Settings:**
- Edit `app/admin/dashboard/settings/page.tsx`
- Add new tabs or profile fields
- Update profile API in `app/api/admin/profile/route.ts`

**Add New Collections:**
- Create MongoDB schema in `lib/mongodb.ts`
- Create API routes in `app/api/`
- Build dashboard pages in `app/admin/dashboard/`

### Admin Credentials

**Set admin credentials in `.env.local`:**
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<bcrypt-hashed-password>
```

**Generate password hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 12))"
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Framework docs
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Type safety
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication
- [Nodemailer Documentation](https://nodemailer.com/) - Email service

## 🔐 Security

### Authentication
- ✅ Bcrypt password hashing (12 salt rounds)
- ✅ NextAuth v5 session management
- ✅ CSRF protection
- ✅ Secure HTTP-only cookies
- ✅ Environment variables for secrets

### Data Protection
- ✅ MongoDB connection encryption (SSL/TLS)
- ✅ Input validation on all forms
- ✅ SQL injection prevention
- ✅ Activity logging for audit trails
- ✅ Regular backup capability

### Best Practices
- Never commit `.env.local` to Git
- Use strong passwords (20+ characters)
- Rotate credentials regularly
- Test backups periodically
- Monitor activity logs
- Keep dependencies updated

## 📊 Database Schema

### Collections (8 Total)

1. **admin_profile** - Admin user data
   - name, email, title, bio, profilePicture, socialLinks, contactInfo

2. **contacts** - Contact form submissions
   - name, email, subject, message, phone, status, createdAt

3. **newsletter_subscribers** - Email subscribers
   - email, status, subscribedAt, unsubscribedAt

4. **blog_posts** - Blog articles
   - title, slug, excerpt, content, category, tags, author, status, views, likes

5. **projects** - Portfolio projects
   - title, description, image, link, tags, featured

6. **email_templates** - Reusable email templates
   - name, subject, htmlContent, category, variables

7. **activity_logs** - Admin activity audit trail
   - userId, action, category, severity, ipAddress, userAgent, metadata

8. **email_campaigns** - Email campaign history
   - subject, recipientCount, sentAt, status

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: getaddrinfo ENOTFOUND ac-wlww6xe-shard-00-00.3j7tmok.mongodb.net
```
**Solution:** Check MongoDB URI in `.env.local`, ensure IP is whitelisted in MongoDB Atlas

### NextAuth Session Error
```
Failed to fetch. Read more at https://errors.authjs.dev#autherror
```
**Solution:** Verify `NEXTAUTH_SECRET` is set, check authentication credentials

### Build Errors
```
TypeScript compilation error
```
**Solution:**
```bash
npm run lint          # Check linting errors
npm run type-check    # Verify TypeScript
npm install           # Reinstall dependencies
rm -rf .next          # Clear cache and rebuild
npm run build
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
npx kill-port 3000    # Kill process on port 3000
npm run dev           # Start fresh
```

## 📈 Performance

### Optimizations Implemented
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ CSS-in-JS with Tailwind (optimized CSS)
- ✅ Database query optimization
- ✅ Caching strategies
- ✅ CDN-ready (Vercel Edge)

### Lighthouse Scores
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

## 📄 License

This project is open source and available under the MIT License. See [LICENSE](LICENSE) file for details.

## 👤 Author

**Faran Alam**
- 🌐 Portfolio: [faranalam.com](https://faranalam.com)
- 💼 LinkedIn: [linkedin.com/in/faranalam](https://linkedin.com/in/faranalam)
- 🐙 GitHub: [@faranalam](https://github.com/faranalam)
- 📧 Email: faran.bsce40@iiu.edu.pk

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- MongoDB for reliable database
- All open-source contributors

---

**⭐ If you find this useful, please give it a star on GitHub!**

**🚀 Happy coding!**

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
