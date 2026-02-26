import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: "Faran Alam - Full Stack Developer & Computer Engineer",
  description: "Computer Engineering student at IIUI and certified Full Stack Developer. Specializing in web development with React, Node.js, and modern technologies. Building innovative digital solutions since 2022.",
  icons: {
    icon: "/images/logos/logo1.jpg",
    apple: "/images/logos/logo1.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased transition-colors duration-300" suppressHydrationWarning>
        <SessionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
