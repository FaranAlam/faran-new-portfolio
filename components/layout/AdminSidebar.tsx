"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  MdDashboard, MdMessage, MdNewspaper, MdDownload, 
  MdArticle, MdWork, MdEmail, MdAnalytics, 
  MdHistory, MdSettings, MdBackup, MdLogout,
  MdExpandMore, MdChevronRight
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([
    "Dashboard", "Content", "Communications", "Analytics", "Settings"
  ]);

  const toggleCategory = (title: string) => {
    setOpenCategories(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

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
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-xs text-blue-200">Control Center</p>
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

      {/* Menu Categories */}
      <nav className="mt-4 px-2 space-y-1">
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
                    {openCategories.includes(category.title) ? 
                      <MdExpandMore className="text-lg" /> : 
                      <MdChevronRight className="text-lg" />
                    }
                  </span>
                </button>
              ) : null}

              {/* Category Items */}
              {(isCollapsed || openCategories.includes(category.title) || category.items.length === 1) && (
                <div className={`${!isCollapsed && category.items.length > 1 ? 'ml-2' : ''}`}>
                  {category.items.map((item) => {
                    const isActive = pathname === item.path;
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => router.push(item.path)}
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
      <div className={`absolute bottom-0 left-0 right-0 border-t border-blue-500 p-4 bg-gradient-to-t from-blue-800 to-transparent ${isCollapsed ? 'text-center' : ''}`}>
        <button
          onClick={() => {
            // Logout logic
            router.push('/');
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
