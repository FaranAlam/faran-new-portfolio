"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { 
  MdDashboard, MdMessage, MdNewspaper, MdDownload, 
  MdArticle, MdWork, MdEmail, MdAnalytics, 
  MdHistory, MdSettings, MdBackup, MdLogout,
  MdExpandMore, MdChevronRight, MdClose
} from "react-icons/md";
import { IconType } from "react-icons";

interface MenuItem {
  label: string;
  icon: IconType;
  iconColor: string;
  path: string;
  description: string;
}

interface MenuCategory {
  title: string;
  icon: IconType;
  iconColor: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    iconColor: "text-yellow-400",
    items: [
      {
        label: "Overview",
        icon: MdDashboard,
        iconColor: "text-yellow-400",
        path: "/admin/dashboard/home",
        description: "Statistics & insights"
      }
    ]
  },
  {
    title: "Content",
    icon: MdArticle,
    iconColor: "text-purple-400",
    items: [
      {
        label: "Blog Posts",
        icon: MdArticle,
        iconColor: "text-purple-400",
        path: "/admin/dashboard/blog",
        description: "Manage blog"
      },
      {
        label: "Projects",
        icon: MdWork,
        iconColor: "text-orange-400",
        path: "/admin/dashboard/projects",
        description: "Portfolio projects"
      },
      {
        label: "Email Templates",
        icon: MdEmail,
        iconColor: "text-pink-400",
        path: "/admin/dashboard/email-templates",
        description: "Email designs"
      }
    ]
  },
  {
    title: "Communications",
    icon: MdMessage,
    iconColor: "text-green-400",
    items: [
      {
        label: "Messages",
        icon: MdMessage,
        iconColor: "text-green-400",
        path: "/admin/dashboard/messages",
        description: "Contact forms"
      },
      {
        label: "Newsletter",
        icon: MdNewspaper,
        iconColor: "text-cyan-400",
        path: "/admin/dashboard/newsletter",
        description: "Subscribers"
      },
      {
        label: "Downloads",
        icon: MdDownload,
        iconColor: "text-teal-400",
        path: "/admin/requests",
        description: "Download requests"
      }
    ]
  },
  {
    title: "Analytics",
    icon: MdAnalytics,
    iconColor: "text-blue-400",
    items: [
      {
        label: "Performance",
        icon: MdAnalytics,
        iconColor: "text-blue-400",
        path: "/admin/dashboard/analytics",
        description: "Site analytics"
      },
      {
        label: "Activity Logs",
        icon: MdHistory,
        iconColor: "text-indigo-400",
        path: "/admin/dashboard/activity",
        description: "System activities"
      }
    ]
  },
  {
    title: "Settings",
    icon: MdSettings,
    iconColor: "text-gray-300",
    items: [
      {
        label: "Preferences",
        icon: MdSettings,
        iconColor: "text-gray-300",
        path: "/admin/dashboard/settings",
        description: "Profile & config"
      },
      {
        label: "Backup",
        icon: MdBackup,
        iconColor: "text-emerald-400",
        path: "/admin/dashboard/backup",
        description: "Database backup"
      }
    ]
  }
];

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ isMobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openCategory, setOpenCategory] = useState<string>("Dashboard");

  const toggleCategory = (title: string) => {
    setOpenCategory(prev => (prev === title ? "" : title));
  };

  return (
    <div
      className={`${
        isCollapsed ? 'md:w-20' : 'md:w-64'
      } w-72 bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 fixed left-0 top-0 h-screen shadow-lg flex flex-col z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      {/* Logo/Header */}
      <div className="p-4 border-b border-blue-500">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/logo1.jpg"
                alt="Faran Portfolio Logo"
                width={44}
                height={44}
                className="w-11 h-11 rounded-xl shadow-lg border border-blue-400/40"
                priority
              />
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-xs text-blue-200">Control Center</p>
              </div>
            </div>
          )}
          <button
            onClick={onMobileClose}
            className="p-2 hover:bg-blue-500 rounded-lg transition md:hidden"
            title="Close"
          >
            <MdClose className="text-xl" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:inline-flex p-2 hover:bg-blue-500 rounded-lg transition"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Menu Categories */}
      <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto">
        {menuCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.title} className="mb-2">
              {/* Category Header */}
              {!isCollapsed && category.items.length > 1 ? (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-blue-200 hover:text-white transition-colors rounded-lg hover:bg-blue-500/30"
                >
                  <div className="flex items-center gap-2">
                    <CategoryIcon className={`text-xl ${category.iconColor}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {category.title}
                    </span>
                  </div>
                  <span className="text-xs">
                    {openCategory === category.title ? 
                      <MdExpandMore className="text-lg" /> : 
                      <MdChevronRight className="text-lg" />
                    }
                  </span>
                </button>
              ) : null}

              {/* Category Items */}
              {(isCollapsed || openCategory === category.title || category.items.length === 1) && (
                <div className={`${!isCollapsed && category.items.length > 1 ? 'ml-2' : ''}`}>
                  {category.items.map((item) => {
                    const isActive = pathname === item.path;
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          router.push(item.path);
                          onMobileClose();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
                          isActive
                            ? 'bg-white/10 text-white shadow-lg border border-white/20'
                            : 'text-blue-100 hover:bg-white/5 hover:border hover:border-white/10'
                        }`}
                        title={isCollapsed ? item.label : ''}
                      >
                        <ItemIcon className={`text-xl ${isActive ? 'text-white' : item.iconColor}`} />
                        {!isCollapsed && (
                          <div className="text-left flex-1">
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-blue-200">{item.description}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`border-t border-blue-500 p-4 bg-gradient-to-t from-blue-800 to-transparent ${isCollapsed ? 'text-center' : ''}`}>
        <button
          onClick={() => {
            // Logout logic
            router.push('/');
            onMobileClose();
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <MdLogout className="text-xl" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
        {!isCollapsed && (
          <p className="text-xs text-blue-200 mt-3 text-center font-medium">
            Faran Alam Portfolio
          </p>
        )}
      </div>
    </div>
  );
}
