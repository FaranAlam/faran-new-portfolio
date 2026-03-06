"use client";

import AdminSidebar from "./AdminSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (!isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-lg bg-blue-600 text-white shadow-lg"
        aria-label="Open sidebar"
      >
        <MdMenu className="text-2xl" />
      </button>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 min-w-0">
        <div className="p-4 sm:p-6 md:p-8 pt-16 md:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
