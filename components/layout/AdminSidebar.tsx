"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    label: "Download Requests",
    icon: "📩",
    path: "/admin/requests",
    description: "Manage student download approvals"
  },
  {
    label: "Contact Messages",
    icon: "💬",
    path: "/admin/dashboard",
    description: "View and reply to contact messages"
  },
  // Add more menu items as needed
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 fixed left-0 top-0 h-screen shadow-lg overflow-y-auto`}
    >
      {/* Logo/Header */}
      <div className="p-4 border-b border-blue-500">
        <div className="flex items-center justify-between">
          <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
            <h1 className="text-xl font-bold">Admin</h1>
            <p className="text-xs text-blue-200">Dashboard</p>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-blue-500 rounded-lg transition"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-8 px-2 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-blue-100 hover:bg-blue-500/50'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-blue-200">{item.description}</p>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 border-t border-blue-500 p-4 ${isCollapsed ? 'text-center' : ''}`}>
        <button
          onClick={() => {
            // Logout logic
            router.push('/');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          <span>🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
        {!isCollapsed && (
          <p className="text-xs text-blue-200 mt-3 text-center">
            Faran Alam Portfolio
          </p>
        )}
      </div>
    </div>
  );
}
