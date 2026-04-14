"use client";

import { useEffect, useMemo, useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";
import { MdSend, MdStar, MdStarBorder, MdVerified, MdCheckCircle, MdRateReview } from "react-icons/md";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved?: boolean;
};

type ReviewStats = {
  totalApproved: number;
  averageRating: number;
  pendingCount?: number;
};

const initialForm = {
  name: "",
  email: "",
  rating: 5,
  comment: "",
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

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ totalApproved: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState(initialForm);

  const averageLabel = useMemo(() => stats.averageRating.toFixed(1), [stats.averageRating]);

  const loadReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews || []);
        setStats(data.stats || { totalApproved: 0, averageRating: 0 });
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "website",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccessMessage(data.message || "Thanks for your review!");
      setForm(initialForm);
      loadReviews();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const distribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percent = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { rating, count, percent };
  });

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What People Say</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real feedback from clients I&apos;ve worked with. Leave a rating and your review will appear here after approval.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <FadeIn direction="left" className="h-full">
              <div className="bg-gray-50 dark:bg-gray-800/70 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 h-full lg:min-h-[620px] flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                    <MdRateReview className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Leave a Review</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Public submissions are moderated before display.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">{averageLabel}</div>
                  <div>
                    <StarRow rating={Math.round(stats.averageRating || 0)} />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stats.totalApproved} approved reviews</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-6 text-center">
                  {distribution.map((item) => (
                    <div key={item.rating} className="flex flex-col items-center gap-1">
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.rating}★</div>
                      <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded transition-all duration-300" 
                          style={{ width: `${item.percent || 10}%`, minWidth: item.count > 0 ? '2px' : '0' }} 
                        />
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.count}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1;
                        const active = value <= form.rating;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, rating: value }))}
                            className={`text-3xl transition-transform duration-200 hover:scale-110 ${active ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            aria-label={`${value} star rating`}
                          >
                            <MdStar />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment <span className="text-gray-400">(optional)</span></label>
                    <textarea
                      value={form.comment}
                      onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
                      rows={4}
                      placeholder="Tell others about your experience"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>

                  {errorMessage ? (
                    <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
                      {errorMessage}
                    </div>
                  ) : null}

                  {successMessage ? (
                    <div className="rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-3 text-sm flex items-center gap-2">
                      <MdCheckCircle />
                      {successMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                  >
                    <MdSend />
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            </FadeIn>

            <div className="h-full">
              <div className="bg-gray-50 dark:bg-gray-800/70 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 h-full lg:min-h-[620px] flex flex-col shadow-xl [box-shadow:inset_-8px_0_15px_-3px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Reviews</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Scroll to see all approved ratings</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MdRateReview className="text-blue-600 dark:text-blue-400" />
                    {reviews.length} total
                  </div>
                </div>

                <div className="max-h-[550px] overflow-y-auto pr-3 space-y-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                {loading ? (
                  <div className="bg-gray-50 dark:bg-gray-800/70 rounded-3xl p-8 text-center text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                    Loading reviews...
                  </div>
                ) : reviews.length > 0 ? (
                  <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 gap-5">
                    {reviews.map((review) => (
                      <StaggerItem key={review._id}>
                        <article className="bg-white dark:bg-gray-800/70 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                              {review.name}
                              <MdVerified className="text-blue-600 dark:text-blue-400" />
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <StarRow rating={review.rating} />
                        </div>

                        {review.comment ? (
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic">No comment added.</p>
                        )}
                        </article>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800/70 rounded-3xl p-10 text-center border border-dashed border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    <MdRateReview className="text-5xl mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No approved reviews yet</h3>
                    <p className="max-w-xl mx-auto">
                      Be the first to leave a rating. Once approved, your review will appear here and contribute to the average score.
                    </p>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}