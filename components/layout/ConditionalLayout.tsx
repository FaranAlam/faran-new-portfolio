"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ScrollToTop from "./ScrollToTop";
import SocialProofNotification from "@/components/ui/SocialProofNotification";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import CustomCursor from "@/components/ui/CustomCursor";
import { SmoothScrollCSS } from "@/components/ui/SmoothScroll";
import AdminWrapper from "./AdminWrapper";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current route is admin
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Pages that should NOT have the admin sidebar
  const isAuthPage = pathname === '/admin/login' || 
                     pathname === '/admin/forgot-password' || 
                     pathname?.startsWith('/admin/reset-password');

  // If admin route but NOT auth page, render with admin layout (sidebar + content)
  if (isAdminRoute && !isAuthPage) {
    return (
      <AdminWrapper>
        {children}
      </AdminWrapper>
    );
  }
  
  // If auth page, render without any layout wrapper
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Otherwise, render full portfolio layout
  return (
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
  );
}
