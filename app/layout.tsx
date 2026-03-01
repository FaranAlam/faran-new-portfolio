import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: {
    default: "Faran Alam - Full Stack Developer & Computer Engineer | IIUI",
    template: "%s | Faran Alam"
  },
  description: "Computer Engineering student at IIUI and certified Full Stack Developer. Specializing in web development with React, Next.js, Node.js, and modern technologies. Building innovative digital solutions since 2022.",
  keywords: ["Full Stack Developer", "Computer Engineer", "IIUI", "React Developer", "Next.js Expert", "Node.js Developer", "Web Development", "Faran Alam", "Portfolio", "Software Engineer", "UI/UX Designer", "API Development", "Database Design", "TypeScript Developer"],
  authors: [{ name: "Faran Alam", url: "https://faran-new-portfolio.vercel.app" }],
  creator: "Faran Alam",
  publisher: "Faran Alam",
  metadataBase: new URL("https://faran-new-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faran-new-portfolio.vercel.app",
    title: "Faran Alam - Full Stack Developer & Computer Engineer",
    description: "Computer Engineering student at IIUI and certified Full Stack Developer. Building innovative digital solutions with React, Next.js, and modern web technologies.",
    siteName: "Faran Alam Portfolio",
    images: [
      {
        url: "/images/hero/story2.jpg",
        width: 1200,
        height: 630,
        alt: "Faran Alam - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faran Alam - Full Stack Developer & Computer Engineer",
    description: "Computer Engineering student at IIUI and certified Full Stack Developer. Building innovative digital solutions.",
    images: ["/images/hero/story2.jpg"],
    creator: "@faranalam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logos/logo1.jpg",
    apple: "/images/logos/logo1.jpg",
  },
  verification: {
    google: "-v-CdqJ2qOHKFp2ON5xVGTDX9NZPlGLe2Ui4-eK-PXs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-300" suppressHydrationWarning>
        <SessionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
