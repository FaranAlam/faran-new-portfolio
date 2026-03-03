/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter for API routes
 * For production, consider using Redis or Upstash Rate Limit
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  limit: number;        // Max requests
  window: number;       // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 10, window: 60000 } // 10 requests per minute default
): RateLimitResult {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Initialize or get existing record
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + config.window,
    };
  }

  // Increment counter
  store[key].count++;

  const success = store[key].count <= config.limit;
  const remaining = Math.max(0, config.limit - store[key].count);

  return {
    success,
    limit: config.limit,
    remaining,
    reset: store[key].resetTime,
  };
}

/**
 * Get client IP address from request
 * @param request - Next.js request object
 * @returns IP address or fallback
 */
export function getClientIp(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback
  return 'unknown';
}

/**
 * Common rate limit configurations
 */
export const RateLimits = {
  // Strict limit for login/auth endpoints
  AUTH: { limit: 5, window: 15 * 60 * 1000 }, // 5 requests per 15 minutes

  // Form submissions
  CONTACT: { limit: 3, window: 60 * 60 * 1000 }, // 3 requests per hour
  NEWSLETTER: { limit: 2, window: 60 * 60 * 1000 }, // 2 requests per hour

  // API endpoints
  API_STRICT: { limit: 10, window: 60 * 1000 }, // 10 requests per minute
  API_MODERATE: { limit: 30, window: 60 * 1000 }, // 30 requests per minute
  API_RELAXED: { limit: 100, window: 60 * 1000 }, // 100 requests per minute
};
