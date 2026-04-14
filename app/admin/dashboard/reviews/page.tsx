"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdDelete, MdRefresh, MdSearch, MdCheckCircle, MdRadioButtonUnchecked, MdStar, MdStarBorder } from "react-icons/md";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  approvedAt?: string;
  email?: string;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;
        const Icon = filled ? MdStar : MdStarBorder;
        return <Icon key={index} className={filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />;
      })}
    </div>
  );
}

export default function ReviewsPage() {
  const router = useRouter();
  const { status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchReviews();
    }
  }, [status]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews?all=true");
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApproved = async (review: Review) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: review._id, approved: !review.approved }),
      });

      const data = await response.json();
      if (data.success) {
        fetchReviews();
      } else {
        alert(data.error || "Failed to update review");
      }
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    try {
      const response = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        fetchReviews();
      } else {
        alert(data.error || "Failed to delete review");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        const matchesSearch =
          review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(review.rating).includes(searchQuery);

        const matchesStatus =
          filterStatus === "all" ||
          (filterStatus === "approved" && review.approved) ||
          (filterStatus === "pending" && !review.approved);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [reviews, searchQuery, filterStatus]);

  const stats = {
    total: reviews.length,
    approved: reviews.filter((review) => review.approved).length,
    pending: reviews.filter((review) => !review.approved).length,
    average: reviews.filter((review) => review.approved).length
      ? reviews.filter((review) => review.approved).reduce((sum, review) => sum + review.rating, 0) / reviews.filter((review) => review.approved).length
      : 0,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ratings & Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Moderate visitor ratings and public feedback</p>
        </div>
        <button
          onClick={fetchReviews}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <MdRefresh /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600 mt-1">Total Reviews</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-gray-600 mt-1">Approved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600 mt-1">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="text-3xl font-bold text-purple-600">{stats.average.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mt-1">Average Rating</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by name, comment, or rating..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value as "all" | "approved" | "pending")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterStatus("all");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            <MdRefresh /> Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-600">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-200 p-10 text-center text-gray-600">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{review.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${review.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <StarRow rating={review.rating} />
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.createdAt).toLocaleString()}</p>
                  {review.comment ? <p className="text-gray-700 dark:text-gray-300 max-w-3xl">{review.comment}</p> : <p className="text-gray-500 dark:text-gray-400 italic">No comment provided.</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleApproved(review)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${review.approved ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
                  >
                    {review.approved ? <MdRadioButtonUnchecked /> : <MdCheckCircle />}
                    {review.approved ? "Hide" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}