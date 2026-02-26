"use client";

import AdminSidebar from "./AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (!isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 transition-all duration-300">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
