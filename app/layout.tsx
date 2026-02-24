import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SocialProofNotification from "@/components/ui/SocialProofNotification";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import CustomCursor from "@/components/ui/CustomCursor";
import { SmoothScrollCSS } from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Faran Alam - Full Stack Developer & Computer Engineer",
  description: "Computer Engineering student at IIUI and certified Full Stack Developer. Specializing in web development with React, Node.js, and modern technologies. Building innovative digital solutions since 2022.",
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
          <SmoothScrollCSS>
            <CustomCursor />
            <LoadingScreen />
            <ScrollProgressBar />
            <ParticlesBackground />
            <DarkModeToggle />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <ScrollToTop />
            <SocialProofNotification />
          </SmoothScrollCSS>
        </SessionProvider>
      </body>
    </html>
  );
}
