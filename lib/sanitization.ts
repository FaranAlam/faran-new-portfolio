/**
 * Input Sanitization Utility
 * Protects against XSS and injection attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 * @param dirty - Unsanitized HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return dirty
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Client-side: Would use DOMPurify if needed
  // For now, using basic sanitization
  return dirty
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize plain text input
 * Removes HTML tags and trims whitespace
 * @param input - User input string
 * @returns Sanitized string
 */
export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Sanitize email input
 * @param email - Email address
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize URL input
 * Only allows http:// and https:// protocols
 * @param url - URL string
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const trimmed = url.trim();

  // Check if URL is valid and uses safe protocol
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Sanitize phone number
 * Removes all non-numeric characters except + and -
 * @param phone - Phone number string
 * @returns Sanitized phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  return phone.replace(/[^\d+\-\s()]/g, '').trim();
}

/**
 * Sanitize object by applying sanitization to all string values
 * @param obj - Object with potentially unsafe values
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        sanitized[key] = sanitizeText(value) as any;
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Validate and sanitize contact form data
 * @param data - Form data object
 * @returns Sanitized data or null if invalid
 */
export function sanitizeContactForm(data: {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  subject?: string;
}): {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
} | null {
  const name = sanitizeText(data.name || '');
  const email = sanitizeEmail(data.email || '');
  const message = sanitizeText(data.message || '');
  const phone = data.phone ? sanitizePhone(data.phone) : undefined;
  const subject = data.subject ? sanitizeText(data.subject) : undefined;

  // Validate required fields
  if (!name || !email || !message) {
    return null;
  }

  if (name.length < 2 || name.length > 100) {
    return null;
  }

  if (message.length < 10 || message.length > 5000) {
    return null;
  }

  return {
    name,
    email,
    message,
    phone,
    subject,
  };
}

/**
 * Prevent SQL injection by escaping special characters
 * Note: Use parameterized queries instead when possible
 * @param input - User input string
 * @returns Escaped string
 */
export function escapeSql(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%': return '\\' + char;
        default: return char;
      }
    });
}
