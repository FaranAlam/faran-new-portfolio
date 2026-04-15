"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  MdEmail, 
  MdNewspaper, 
  MdDownload, 
  MdLanguage, 
  MdSettings, 
  MdBarChart,
  MdCheckCircle 
} from "react-icons/md";

interface Stats {
  totalContacts: number;
  newContacts: number;
  totalNewsletterSubs: number;
  newSubsToday: number;
  pendingRequests: number;
  totalRequests: number;
}

export default function DashboardHomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    newContacts: 0,
    totalNewsletterSubs: 0,
    newSubsToday: 0,
    pendingRequests: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // Check auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch stats from APIs
  useEffect(() => {
    if (status === "authenticated") {
      fetchAllStats();
    }
  }, [status]);

  const fetchAllStats = async () => {
    try {
      // Fetch contacts
      const contactsRes = await fetch("/api/contact");
      const contactsData = await contactsRes.json();
      const contacts = contactsData.messages || [];

      // Fetch newsletter
      const newsletterRes = await fetch("/api/newsletter");
      const newsletterData = await newsletterRes.json();
      const subscribers = newsletterData.subscribers || [];

      // Fetch download requests
      const requestsRes = await fetch("/api/approve-download");
      const requestsData = await requestsRes.json();
      const requests = requestsData.requests || [];

      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setStats({
        totalContacts: contacts.length,
        newContacts: contacts.filter((c: any) => !c.read).length,
        totalNewsletterSubs: subscribers.length,
        newSubsToday: subscribers.filter((s: any) => {
          const subDate = new Date(s.subscribedAt);
          return subDate >= today;
        }).length,
        pendingRequests: requests.filter((r: any) => r.status === 'pending').length,
        totalRequests: requests.length,
      });

      // Create recent activities
      const activities: any[] = [];
      
      // Add recent contacts
      contacts.slice(0, 3).forEach((c: any) => {
        activities.push({
          type: 'contact',
          message: `New message from ${c.name}`,
          time: c.createdAt,
          icon: 'email',
        });
      });

      // Add recent subscribers
      subscribers.slice(0, 2).forEach((s: any) => {
        activities.push({
          type: 'newsletter',
          message: `New subscriber: ${s.email}`,
          time: s.subscribedAt,
          icon: 'newsletter',
        });
      });

      // Sort by time
      activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setRecentActivities(activities.slice(0, 6));

    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back, {session?.user?.email}</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Messages Card */}
        <Link href="/admin/dashboard/messages">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Contact Messages</p>
                <h3 className="text-4xl font-bold mt-2">{stats.totalContacts}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                    {stats.newContacts} new
                  </span>
                </div>
              </div>
              <MdEmail className="text-6xl opacity-20" />
            </div>
          </div>
        </Link>

        {/* Newsletter Subscribers Card */}
        <Link href="/admin/dashboard/newsletter">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Newsletter Subscribers</p>
                <h3 className="text-4xl font-bold mt-2">{stats.totalNewsletterSubs}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-purple-400 bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                    +{stats.newSubsToday} today
                  </span>
                </div>
              </div>
              <MdNewspaper className="text-6xl opacity-20" />
            </div>
          </div>
        </Link>

        {/* Download Requests Card */}
        <Link href="/admin/requests">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Download Requests</p>
                <h3 className="text-4xl font-bold mt-2">{stats.totalRequests}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-orange-400 bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                    {stats.pendingRequests} pending
                  </span>
                </div>
              </div>
              <MdDownload className="text-6xl opacity-20" />
            </div>
          </div>
        </Link>

        {/* Website Status Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Website Status</p>
              <h3 className="text-2xl font-bold mt-2">Online</h3>
              <div className="mt-3 flex items-center gap-1">
                <MdCheckCircle className="text-sm" />
                <span className="bg-green-400 bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                  All systems operational
                </span>
              </div>
            </div>
            <MdLanguage className="text-6xl opacity-20" />
          </div>
        </div>

        {/* Quick Actions Card */}
        <Link href="/admin/dashboard/settings">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Admin Settings</p>
                <h3 className="text-xl font-bold mt-2">Manage Profile</h3>
                <div className="mt-3">
                  <span className="bg-gray-600 bg-opacity-50 px-3 py-1 rounded-full text-xs font-semibold">
                    Update info
                  </span>
                </div>
              </div>
              <MdSettings className="text-6xl opacity-20" />
            </div>
          </div>
        </Link>

        {/* Analytics Card */}
        <Link href="/admin/dashboard/analytics">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Analytics</p>
                <h3 className="text-xl font-bold mt-2">View Reports</h3>
                <div className="mt-3">
                  <span className="bg-pink-400 bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                    Detailed insights
                  </span>
                </div>
              </div>
              <MdBarChart className="text-6xl opacity-20" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          {recentActivities.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="text-3xl">
                    {activity.icon === 'email' && <MdEmail className="text-blue-500" />}
                    {activity.icon === 'newsletter' && <MdNewspaper className="text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/admin/dashboard/messages" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <div className="flex items-center gap-3">
                <MdEmail className="text-2xl text-blue-500" />
                <span className="font-medium text-gray-900">View Messages</span>
              </div>
            </Link>
            <Link href="/admin/dashboard/newsletter" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <div className="flex items-center gap-3">
                <MdNewspaper className="text-2xl text-purple-500" />
                <span className="font-medium text-gray-900">Manage Newsletter</span>
              </div>
            </Link>
            <Link href="/admin/requests" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <div className="flex items-center gap-3">
                <MdDownload className="text-2xl text-orange-500" />
                <span className="font-medium text-gray-900">Download Requests</span>
              </div>
            </Link>
            <Link href="/admin/dashboard/settings" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <MdSettings className="text-2xl text-gray-600" />
                <span className="font-medium text-gray-900">Settings</span>
              </div>
            </Link>
            <Link href="/" target="_blank" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <div className="flex items-center gap-3">
                <MdLanguage className="text-2xl text-green-500" />
                <span className="font-medium text-gray-900">View Website</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
