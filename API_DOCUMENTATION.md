# 🔌 API Documentation

## Base URL

```
http://localhost:3000/api
```

For production, replace `localhost:3000` with your domain.

---

## Authentication Endpoints

### Get Session

Retrieve current authentication session.

```
GET /auth/session
```

**Response:**
```json
{
  "user": {
    "email": "admin@example.com",
    "role": "admin"
  },
  "expires": "2025-12-31T23:59:59Z"
}
```

**Status Codes:**
- `200` - Session active
- `401` - No active session

---

### Sign In

Authenticate with email and password.

```
POST /auth/callback/credentials
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "ok": true,
  "error": null,
  "status": 200,
  "url": "/admin/dashboard"
}
```

**Status Codes:**
- `200` - Login successful
- `401` - Invalid credentials
- `400` - Missing fields

---

### Sign Out

Terminate current session.

```
POST /auth/signout
```

**Response:**
```json
{
  "url": "/"
}
```

---

## Contact Management

### Get All Messages

Retrieve contact form submissions.

```
GET /contact
```

**Query Parameters:**
- `status` - Filter by status (unread, read, replied)
- `page` - Page number for pagination
- `limit` - Results per page

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello...",
    "phone": "+1234567890",
    "status": "unread",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

---

### Submit Contact Form

Create a new contact message.

```
POST /contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here...",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "status": "success",
  "message": "Message sent successfully"
}
```

**Status Codes:**
- `201` - Message created
- `400` - Validation error
- `500` - Server error

---

### Update Message

Update message status.

```
PUT /contact/:id
```

**Request Body:**
```json
{
  "status": "replied"
}
```

**Status Codes:**
- `200` - Updated
- `404` - Message not found
- `401` - Unauthorized

---

### Delete Message

Delete a contact message.

```
DELETE /contact/:id
```

**Status Codes:**
- `200` - Deleted
- `404` - Message not found
- `401` - Unauthorized

---

## Newsletter Management

### Get Subscribers

Retrieve newsletter subscribers.

```
GET /newsletter
```

**Query Parameters:**
- `status` - Filter by status (subscribed, unsubscribed)
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "email": "subscriber@example.com",
    "status": "subscribed",
    "subscribedAt": "2024-01-10T08:00:00Z"
  }
]
```

---

### Subscribe to Newsletter

Add email to newsletter.

```
POST /newsletter
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "status": "subscribed",
  "message": "Subscribed successfully"
}
```

**Status Codes:**
- `201` - Subscribed
- `400` - Invalid email
- `409` - Already subscribed
- `500` - Server error

---

### Unsubscribe from Newsletter

Remove email from newsletter.

```
DELETE /newsletter/:id
```

**Status Codes:**
- `200` - Unsubscribed
- `404` - Subscriber not found
- `401` - Unauthorized

---

### Send Newsletter

Send newsletter to all subscribers. **(Admin only)**

```
POST /newsletter/send
```

**Request Body:**
```json
{
  "subject": "Monthly Newsletter",
  "templateId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "sentCount": 145,
  "failedCount": 2,
  "message": "Newsletter sent successfully"
}
```

**Status Codes:**
- `200` - Newsletter sent
- `400` - Missing template
- `401` - Unauthorized
- `500` - Sending error

---

## Blog Management

### Get All Posts

Retrieve blog posts.

```
GET /blog
```

**Query Parameters:**
- `status` - Filter by status (draft, published)
- `category` - Filter by category
- `featured` - Filter featured posts (true/false)
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Next.js",
    "slug": "getting-started-with-nextjs",
    "excerpt": "Learn the basics...",
    "content": "Full article content...",
    "category": "Tutorial",
    "tags": ["nextjs", "react", "web-development"],
    "status": "published",
    "featured": true,
    "views": 234,
    "likes": 45,
    "author": "Faran Alam",
    "publishedAt": "2024-01-10T10:00:00Z",
    "createdAt": "2024-01-10T09:00:00Z"
  }
]
```

---

### Get Single Post

Retrieve a specific blog post by slug.

```
GET /blog/:slug
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Getting Started with Next.js",
  "slug": "getting-started-with-nextjs",
  "excerpt": "Learn the basics...",
  "content": "Full article content...",
  "category": "Tutorial",
  "tags": ["nextjs", "react"],
  "status": "published",
  "featured": true,
  "views": 235,
  "likes": 45,
  "author": "Faran Alam",
  "publishedAt": "2024-01-10T10:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `404` - Post not found

---

### Create Blog Post

Create a new blog post. **(Admin only)**

```
POST /blog
```

**Request Body:**
```json
{
  "title": "My New Article",
  "excerpt": "Short summary...",
  "content": "Full article content with markdown...",
  "category": "Technology",
  "tags": ["nextjs", "react", "tutorial"],
  "image": "https://example.com/image.jpg",
  "featured": false,
  "status": "draft"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My New Article",
  "slug": "my-new-article",
  "status": "draft",
  "message": "Post created successfully"
}
```

**Status Codes:**
- `201` - Created
- `400` - Validation error
- `401` - Unauthorized
- `409` - Title already exists

---

### Update Blog Post

Update an existing blog post. **(Admin only)**

```
PUT /blog/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "status": "published",
  "featured": true
}
```

**Status Codes:**
- `200` - Updated
- `404` - Post not found
- `401` - Unauthorized

---

### Delete Blog Post

Delete a blog post. **(Admin only)**

```
DELETE /blog/:id
```

**Status Codes:**
- `200` - Deleted
- `404` - Post not found
- `401` - Unauthorized

---

## Email Templates

### Get All Templates

Retrieve email templates.

```
GET /email-templates
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Welcome Email",
    "subject": "Welcome to {{companyName}}",
    "htmlContent": "<h1>Hello {{name}}</h1>...",
    "category": "welcome",
    "variables": ["name", "companyName", "link"],
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

---

### Create Template

Create a new email template. **(Admin only)**

```
POST /email-templates
```

**Request Body:**
```json
{
  "name": "Welcome Email",
  "subject": "Welcome to {{companyName}}",
  "htmlContent": "<h1>Hello {{name}}</h1><p>Click here: {{link}}</p>",
  "category": "welcome",
  "isActive": true
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Welcome Email",
  "variables": ["name", "companyName", "link"],
  "message": "Template created successfully"
}
```

**Status Codes:**
- `201` - Created
- `400` - Validation error
- `401` - Unauthorized

---

### Update Template

Update an email template. **(Admin only)**

```
PUT /email-templates/:id
```

**Request Body:**
```json
{
  "htmlContent": "<h1>Hello {{name}}</h1>...",
  "isActive": false
}
```

**Status Codes:**
- `200` - Updated
- `404` - Template not found
- `401` - Unauthorized

---

### Delete Template

Delete an email template. **(Admin only)**

```
DELETE /email-templates/:id
```

**Status Codes:**
- `200` - Deleted
- `404` - Template not found
- `401` - Unauthorized

---

## Activity Logs

### Get Activity Logs

Retrieve activity audit trail.

```
GET /activity-logs
```

**Query Parameters:**
- `category` - Filter by category (auth, content, email, settings, security, system)
- `severity` - Filter by severity (low, medium, high, critical)
- `startDate` - ISO date string
- `endDate` - ISO date string
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "admin@example.com",
    "action": "Post Published",
    "description": "Published blog post: Getting Started",
    "category": "content",
    "severity": "medium",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "metadata": {
      "postId": "507f1f77bcf86cd799439012",
      "title": "Getting Started"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Create Activity Log

Log an activity. **(Admin only)**

```
POST /activity-logs
```

**Request Body:**
```json
{
  "action": "Settings Updated",
  "description": "Admin profile updated",
  "category": "settings",
  "severity": "low"
}
```

---

### Delete Activity Log

Delete an activity log entry. **(Admin only)**

```
DELETE /activity-logs/:id
```

**Status Codes:**
- `200` - Deleted
- `404` - Log not found
- `401` - Unauthorized

---

## Backup & Restore

### Get Backup Statistics

Get database collection statistics.

```
GET /backup?action=stats
```

**Response:**
```json
{
  "status": "success",
  "collections": {
    "contacts": {
      "count": 45,
      "size": "12.3 KB"
    },
    "blog_posts": {
      "count": 12,
      "size": "45.6 KB"
    },
    "newsletter_subscribers": {
      "count": 234,
      "size": "67.8 KB"
    }
  },
  "totalSize": "125.7 KB"
}
```

---

### Export Database

Download database backup as JSON.

```
GET /backup?action=export
```

**Response:** JSON file download

**File Contents:**
```json
{
  "backup": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0.0",
    "collections": {
      "contacts": [...],
      "blog_posts": [...],
      "newsletter_subscribers": [...]
    }
  }
}
```

---

### Restore Database

Restore database from backup file.

```
POST /backup?action=restore
Content-Type: multipart/form-data

[Upload JSON backup file]
```

**Response:**
```json
{
  "status": "success",
  "collections": {
    "contacts": {
      "inserted": 45,
      "errors": 0
    },
    "blog_posts": {
      "inserted": 12,
      "errors": 0
    }
  },
  "totalInserted": 57
}
```

**Status Codes:**
- `200` - Restore successful
- `400` - Invalid file format
- `401` - Unauthorized
- `500` - Restore error

---

## Admin Profile

### Get Admin Profile

Retrieve admin profile information.

```
GET /admin/profile
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "admin@example.com",
  "name": "Faran Alam",
  "title": "Full Stack Developer",
  "bio": "Passionate developer...",
  "profilePicture": "data:image/jpeg;base64,...",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/faranalam",
    "github": "https://github.com/faranalam",
    "twitter": "https://twitter.com/faranalam"
  },
  "contactInfo": {
    "phone": "+1234567890",
    "location": "New York, USA"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### Update Admin Profile

Update admin profile and settings.

```
POST /admin/profile
```

**Request Body:**
```json
{
  "name": "Faran Alam",
  "title": "Senior Developer",
  "bio": "Passionate full stack developer...",
  "profilePicture": "data:image/jpeg;base64,...",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/faranalam",
    "github": "https://github.com/faranalam"
  },
  "contactInfo": {
    "phone": "+1234567890",
    "location": "New York"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": { ... }
}
```

**Status Codes:**
- `200` - Updated
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

## Error Responses

All endpoints follow a standard error format:

```json
{
  "status": "error",
  "message": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

**Common Error Codes:**
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Permission denied
- `NOT_FOUND` - Resource doesn't exist
- `VALIDATION_ERROR` - Invalid input
- `DUPLICATE_ENTRY` - Resource already exists
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

- **Default:** 100 requests per 15 minutes per IP
- **Auth endpoints:** 5 failed attempts per hour (lockout)
- **Email endpoints:** 10 per hour (to prevent spam)

---

## CORS Settings

By default, CORS is enabled for same-origin requests. Cross-origin requests require proper headers.

---

## Versioning

Current API version: **v1** (implicit)

No version prefix needed in URLs. Future versions will use `/api/v2/` etc.

---

**API Documentation Last Updated:** January 2024
**Status:** Production Ready ✅
