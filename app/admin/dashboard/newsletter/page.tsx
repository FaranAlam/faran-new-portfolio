"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MdSearch, 
  MdEmail, 
  MdDownload, 
  MdRefresh, 
  MdContentCopy, 
  MdNewspaper, 
  MdCheckCircle, 
  MdError 
} from "react-icons/md";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  status: string;
  source?: string;
}

export default function NewsletterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "unsubscribed">("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  // Check auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch subscribers
  useEffect(() => {
    if (status === "authenticated") {
      fetchSubscribers();
    }
  }, [status]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter");
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Email", "Subscribed At", "Status"],
      ...filteredSubscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleString(),
        sub.status || "active"
      ])
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailData.subject || !emailData.message) {
      alert("Please fill subject and message");
      return;
    }

    if (!confirm(`Send email to ${activeSubscribers} active subscribers?`)) {
      return;
    }

    setSending(true);
    
    try {
      const response = await fetch("/api/newsletter/send-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailData.subject,
          message: emailData.message,
          sendToAll: true,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`${data.message}\n\nTotal: ${data.stats.total}\nSent: ${data.stats.sent}\nFailed: ${data.stats.failed}`);
        setShowEmailModal(false);
        setEmailData({ subject: "", message: "" });
      } else {
        alert(`Failed to send emails: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending bulk email:", error);
      alert("Error sending bulk email");
    } finally {
      setSending(false);
    }
  };

  // Calculate stats
  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.status === "active" || !s.status).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newToday = subscribers.filter(s => {
    const subDate = new Date(s.subscribedAt);
    return subDate >= today;
  }).length;

  // Filter subscribers
  const filteredSubscribers = subscribers
    .filter(sub => {
      const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && (sub.status === "active" || !sub.status)) ||
        (filterStatus === "unsubscribed" && sub.status === "unsubscribed");
      
      // Date range filter
      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const subDate = new Date(sub.subscribedAt);
        if (dateRange.start) matchesDate = subDate >= new Date(dateRange.start);
        if (dateRange.end && matchesDate) matchesDate = subDate <= new Date(dateRange.end + "T23:59:59");
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime();
      if (sortBy === "oldest") return new Date(a.subscribedAt).getTime() - new Date(b.subscribedAt).getTime();
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return 0;
    });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-gray-600 mt-2">Manage your newsletter subscribers and send updates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-5xl font-bold">{totalSubscribers}</div>
          <div className="text-purple-100 mt-2">Total Subscribers</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-5xl font-bold">{activeSubscribers}</div>
          <div className="text-green-100 mt-2">Active Subscribers</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-5xl font-bold">+{newToday}</div>
          <div className="text-blue-100 mt-2">New Today</div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filter Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="email">Sort by Email</option>
          </select>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              title="Send Newsletter"
            >
              <MdEmail className="text-xl" />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
              title="Export CSV"
            >
              <MdDownload className="text-xl" />
            </button>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
                setSortBy("newest");
                setDateRange({ start: "", end: "" });
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MdRefresh className="text-lg" /> Reset Filters
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredSubscribers.length} of {totalSubscribers} subscribers
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading subscribers...
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdNewspaper className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No subscribers found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchQuery ? "Try a different search term" : "No newsletter subscribers yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subscribed At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubscribers.map((subscriber, index) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(subscriber.email)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy email"
                        >
                          <MdContentCopy className="text-sm" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(subscriber.subscribedAt)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          subscriber.status === "active" || !subscriber.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscriber.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {subscriber.source || "Website"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Future Feature Placeholder */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <MdCheckCircle className="text-green-600" /> Bulk Email Campaign Active
        </h3>
        <p className="text-gray-600 text-sm">
          You can now send newsletters and updates to all your subscribers directly from the admin panel.
          Click &quot;Send Newsletter&quot; button to compose and send bulk emails with custom subject and message.
        </p>
      </div>

      {/* Email Composer Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MdEmail className="text-blue-600" /> Send Newsletter
              </h2>
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setEmailData({ subject: "", message: "" });
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={sending}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendBulkEmail} className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Recipients:</strong> {activeSubscribers} active subscribers
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Subject *
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email subject..."
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here... (HTML supported)"
                  required
                  disabled={sending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use HTML tags for formatting (e.g., &lt;strong&gt;, &lt;p&gt;, &lt;a&gt;, etc.)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : `Send to ${activeSubscribers} Subscribers`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailData({ subject: "", message: "" });
                  }}
                  disabled={sending}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
