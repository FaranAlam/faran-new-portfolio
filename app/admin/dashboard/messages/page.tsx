"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MdNotifications, 
  MdCheckCircle, 
  MdSearch, 
  MdDownload, 
  MdRefresh, 
  MdMailOutline,
  MdCheck 
} from "react-icons/md";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
}

export default function MessagesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, unread, read, replied
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, name
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Check auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch messages from API
  useEffect(() => {
    if (status === "authenticated") {
      fetchMessages();
    }
  }, [status]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  // Calculate stats
  const totalMessages = messages.length;
  const newMessages = messages.filter(m => !m.read).length;
  const repliedMessages = messages.filter(m => m.replied).length;

  // Filter messages based on search
  const filteredMessages = messages
    .filter(msg => {
      // Search filter
      const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      let matchesStatus = true;
      if (filterStatus === "unread") matchesStatus = !msg.read;
      else if (filterStatus === "read") matchesStatus = msg.read;
      else if (filterStatus === "replied") matchesStatus = msg.replied;
      
      // Date range filter
      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const msgDate = new Date(msg.createdAt);
        if (dateRange.start) matchesDate = msgDate >= new Date(dateRange.start);
        if (dateRange.end && matchesDate) matchesDate = msgDate <= new Date(dateRange.end + "T23:59:59");
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Subject", "Message", "Phone", "Status", "Date"];
    const csvData = filteredMessages.map(msg => [
      msg.name,
      msg.email,
      msg.subject,
      msg.message.replace(/,/g, ";"),
      msg.phone || "",
      msg.replied ? "Replied" : (msg.read ? "Read" : "Unread"),
      formatDate(msg.createdAt)
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600 mt-2">View and manage contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-blue-600">{totalMessages}</div>
          <div className="text-sm text-gray-600 mt-1">Total Messages</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-yellow-600">{newMessages}</div>
          <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <MdNotifications className="text-yellow-600" /> New Messages
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-green-600">{repliedMessages}</div>
          <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <MdCheckCircle className="text-green-600" /> Replied
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by name, email, subject, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex items-end gap-2">
            <button
              onClick={exportToCSV}
              disabled={filteredMessages.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MdDownload className="text-lg" /> Export CSV
            </button>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
                setSortBy("newest");
                setDateRange({ start: "", end: "" });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <MdRefresh className="text-lg" /> Reset
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredMessages.length} of {totalMessages} messages
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                Loading messages...
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <MdMailOutline className="text-6xl mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No messages found</p>
                <p className="text-sm text-gray-400 mt-2">
                  {searchQuery ? "Try a different search term" : "No contact messages yet"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (!msg.read) {
                        handleMarkAsRead(msg._id);
                      }
                    }}
                    className={`p-6 cursor-pointer transition hover:bg-gray-50 ${
                      !msg.read ? "bg-blue-50 border-l-4 border-blue-600" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                        <p className="text-sm text-gray-700 font-medium mt-2">
                          {msg.subject}
                        </p>
                      </div>
                      <div className="text-right whitespace-nowrap ml-4">
                        {!msg.read && (
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-2">
                            New
                          </span>
                        )}
                        <p className="text-xs text-gray-500">{formatDate(msg.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedMessage ? "Message Details" : "Select a message"}
            </h2>

            {selectedMessage ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedMessage.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:text-blue-700 font-medium mt-1 block"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                {selectedMessage.phone && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-gray-900 mt-1">{selectedMessage.phone}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</p>
                  <p className="text-gray-900 mt-1">{selectedMessage.subject}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</p>
                  <p className="text-gray-700 text-sm mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>

                  {!selectedMessage.read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage._id)}
                      className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <MdCheck className="text-lg" /> Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Click on a message to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
