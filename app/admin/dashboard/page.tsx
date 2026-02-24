"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Fetch messages from API
  useEffect(() => {
    fetchMessages();
  }, []);

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
        fetchMessages(); // Refresh messages
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage contact messages and subscribers
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact Messages ({messages.length})
                </h2>

                {loading ? (
                  <p className="text-gray-400">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-gray-400">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 rounded-lg cursor-pointer border transition-all ${
                          msg.read
                            ? "bg-slate-700/30 border-slate-600"
                            : "bg-blue-500/10 border-blue-500/30"
                        } hover:border-blue-500/50`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-white">{msg.name}</h3>
                            <p className="text-sm text-gray-400">{msg.email}</p>
                            <p className="text-sm text-gray-300 mt-1">{msg.subject}</p>
                          </div>
                          <div className="text-right">
                            {!msg.read && (
                              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                                New
                              </span>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </p>
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
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  {selectedMessage ? "Message Details" : "Select a message"}
                </h2>

                {selectedMessage ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">From</p>
                      <p className="text-white font-semibold">{selectedMessage.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-400 hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>

                    {selectedMessage.phone && (
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">{selectedMessage.phone}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-400">Subject</p>
                      <p className="text-white">{selectedMessage.subject}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Message</p>
                      <p className="text-gray-200 text-sm mt-2 p-3 bg-slate-700/50 rounded-lg">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-600">
                      <p className="text-xs text-gray-500">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>

                      {!selectedMessage.read && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage._id)}
                          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Click on a message to view details
                  </p>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
