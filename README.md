# Faran Portfolio - Next.js Application

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Footer with social links
│   └── sections/          # Page sections
│       ├── Hero.tsx       # Hero section
│       ├── About.tsx      # About section
│       ├── Services.tsx   # Services section
│       ├── Portfolio.tsx  # Portfolio showcase
│       ├── BlogPreview.tsx # Blog preview
│       └── Contact.tsx    # Contact form
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ SEO optimized
- ✅ Fast page loads with Next.js
- ✅ Accessible components
- ✅ Contact form
- ✅ Portfolio showcase
- ✅ Blog preview section
- ✅ Services section

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

Build the project:

```bash
npm run build
```

The output will be in the `.next` folder, ready to be deployed.

## 📝 Customization

### Update Content

- **Personal Info:** Edit the content in each section component
- **Portfolio Projects:** Update the `projects` array in `Portfolio.tsx`
- **Services:** Modify the `services` array in `Services.tsx`
- **Blog Posts:** Update the `blogPosts` array in `BlogPreview.tsx`
- **Contact Info:** Edit contact details in `Contact.tsx` and `Footer.tsx`

### Update Styling

- **Colors:** Modify the Tailwind theme in `tailwind.config.ts`
- **Fonts:** Update font imports in `app/layout.tsx`
- **Global styles:** Edit `app/globals.css`

## 🔗 Connect Backend API

To connect with your existing backend:

1. Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api/v1
```

2. Create API utility functions in a new `lib/api.ts` file
3. Use the API functions in your components

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Faran Alam**
- GitHub: [@faranalam](https://github.com/faranalam)
- LinkedIn: [Faran Alam](https://linkedin.com/in/faranalam)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
