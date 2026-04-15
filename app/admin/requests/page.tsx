"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

interface DownloadRequest {
  id: string;
  email: string;
  resourceId: string;
  courseSlug: string;
  fileName: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalToken?: string;
  approvedAt?: string;
  expiresAt?: string;
}

export default function AdminRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<DownloadRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch download requests
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'all' 
        ? `/api/approve-download`
        : `/api/approve-download?status=${statusFilter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (requestId: string) => {
    if (!confirm('Approve this download request?')) return;
    
    setProcessingId(requestId);
    try {
      const response = await fetch('/api/approve-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          action: 'approve'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Request approved! User will receive email with download link.');
        fetchRequests();
      } else {
        alert('❌ Failed to approve: ' + data.message);
      }
    } catch (error) {
      alert('❌ Error approving request');
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!confirm('Reject this download request?')) return;
    
    setProcessingId(requestId);
    try {
      const response = await fetch('/api/approve-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          action: 'reject'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Request rejected. User will be notified.');
        fetchRequests();
      } else {
        alert('❌ Failed to reject: ' + data.message);
      }
    } catch (error) {
      alert('❌ Error rejecting request');
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  // Filter requests by search query
  const filteredRequests = requests.filter(req => 
    req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.courseSlug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    
    const icons = {
      pending: '⏳',
      approved: '✅',
      rejected: '❌'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]} {status.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Download Requests</h1>
        <p className="text-gray-600 mt-2">Manage student download requests for free resources</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-blue-600">{requests.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Requests</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-600 mt-1">⏳ Pending</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
          <div className="text-sm text-gray-600 mt-1">✅ Approved</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
          <div className="text-sm text-gray-600 mt-1">❌ Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by email, file name, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
          >
            🔄 {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading requests...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">No requests found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchQuery ? 'Try a different search term' : 'No download requests yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    File Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{request.email}</div>
                      <div className="text-xs text-gray-500">{request.resourceId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{request.fileName}</div>
                      <div className="text-xs text-gray-500">{request.courseSlug.replace(/-/g, ' ')}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(request.status)}
                      {request.status === 'approved' && request.expiresAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Expires: {formatDate(request.expiresAt)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(request.requestedAt)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(request.requestedAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'pending' ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleApprove(request.id)}
                            disabled={processingId === request.id}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition disabled:opacity-50"
                          >
                            {processingId === request.id ? '⏳' : '✅'} Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            disabled={processingId === request.id}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition disabled:opacity-50"
                          >
                            {processingId === request.id ? '⏳' : '❌'} Reject
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-sm text-gray-400">
                          {request.status === 'approved' ? '✅ Processed' : '❌ Rejected'}
                          {request.approvedAt && (
                            <div className="text-xs mt-1">
                              {formatDate(request.approvedAt)}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>💡 Approved requests send email with 7-day download link to students</p>
        <p className="mt-1">🔔 New requests automatically notify you via email</p>
      </div>
    </div>
  );
}
