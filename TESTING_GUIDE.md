# 🧪 Testing Guide - Email Approval System

## ✅ What's Been Implemented

### 1. Email Service (Nodemailer + Gmail)
- ✅ Admin notification emails  
- ✅ User approval emails with download link
- ✅ User rejection notification emails
- ✅ Beautiful HTML email templates

### 2. Admin Dashboard
- ✅ View all download requests at `/admin/requests`
- ✅ Filter by status: All, Pending, Approved, Rejected
- ✅ Search by email, file name, or course
- ✅ One-click approve/reject buttons
- ✅ Real-time stats (total, pending, approved, rejected)

### 3. User Flow
- ✅ Email verification (@iiu.edu.pk only)
- ✅ Preview files (no approval needed)
- ✅ Request download (creates pending request)
- ✅ Receive approval/rejection email
- ✅ Download via secure 7-day link

---

## 🔧 Setup Before Testing

### 1. Verify Email Configuration

Check your `.env.local` file has these values:

```env
EMAIL_USER=faran.bsce40@iiu.edu.pk
EMAIL_PASSWORD=auha phsa rtpx riuk
ADMIN_EMAIL=faran.bsce40@iiu.edu.pk
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Gmail App Password Setup** (if not working):
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification first
3. Generate new App Password for "Mail"
4. Replace `EMAIL_PASSWORD` in `.env.local`

### 2. Start Development Server

```bash
npm run dev
```

Server should start at: http://localhost:3000

---

## 🧪 Testing Steps

### Test 1: User Requests Download

1. **Open homepage**: http://localhost:3000
2. **Go to Free Resources section** (scroll down or click nav link)
3. **Enter IIU email**: `your-name@iiu.edu.pk` (must be @iiu.edu.pk)
4. **Click "Verify Email"** → Should show "✅ Verified!"
5. **Choose a topic/course** → Click to expand
6. **Preview a file** → Click "👁️ Preview" (opens in new tab - should work)
7. **Request download** → Click "📩 Request Download"
8. **Expected Result**:
   - ✅ Shows: "Download request submitted! Admin will review..."
   - ✅ Admin email receives notification with request details

**Check Admin Email**:
- Open: faran.bsce40@iiu.edu.pk inbox
- Look for: "📩 New Download Request - [filename]"
- Email should have:
  - Student email
  - File requested
  - Course/topic
  - Request time
  - Request ID
  - Button: "View All Requests"

---

### Test 2: Admin Approves Request

#### Option A: Using Admin Dashboard (Recommended)

1. **Open admin login**: http://localhost:3000/admin/login
2. **Login with credentials** (if auth is set up)
3. **Click "📩 Download Requests"** button in header
4. **You should see**:
   - Stats: Total, Pending, Approved, Rejected counts
   - Request table with student info
   - Pending request with two buttons: "✅ Approve" and "❌ Reject"
5. **Click "✅ Approve"**
6. **Confirm in popup**
7. **Expected Result**:
   - ✅ Shows: "Request approved! User will receive email..."
   - ✅ Request status changes to "Approved"
   - ✅ User receives email with download link

**Check User Email**:
- Open: your-name@iiu.edu.pk inbox
- Look for: "✅ Download Approved - [filename]"
- Email should have:
  - File name
  - "📥 Download Now" button with link
  - Expiration date (7 days from now)
  - Link format: `http://localhost:3000/api/approved-download?token=...`

#### Option B: Using API (Manual Testing)

**Get Request ID** (check console logs or make GET request):
```bash
# GET all requests
curl "http://localhost:3000/api/approve-download?adminEmail=faranalam19@gmail.com"
```

**Approve Request**:
```bash
curl -X POST http://localhost:3000/api/approve-download \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": "paste-request-id-here",
    "action": "approve",
    "adminEmail": "faranalam19@gmail.com"
  }'
```

---

### Test 3: User Downloads File

1. **Open user's email** (your-name@iiu.edu.pk)
2. **Click "📥 Download Now" button**
3. **Expected Result**:
   - ✅ File downloads immediately
   - ✅ Browser shows download progress
   - ✅ File saved to Downloads folder

**Test Token Expiration**:
- Link should work for 7 days
- After 7 days: Shows "⏰ Download link expired"

---

### Test 4: Admin Rejects Request

1. **Submit new download request** (follow Test 1)
2. **Go to admin dashboard**: http://localhost:3000/admin/requests
3. **Click "❌ Reject"** on the pending request
4. **Confirm in popup**
5. **Expected Result**:
   - ✅ Shows: "Request rejected. User will be notified."
   - ✅ Request status changes to "Rejected"
   - ✅ User receives rejection email

**Check User Email**:
- Look for: "Request Update - [filename]"
- Email should have:
  - Reason message
  - Suggestions (contact admin, try different file, etc.)
  - Button: "Browse Other Resources"

---

## 🔍 Debugging

### If Emails Not Sending

1. **Check Console Logs**:
   ```
   ✅ Admin notification sent: [message-id]
   ✅ Approval email sent to user: [message-id]
   ✅ Rejection email sent to user: [message-id]
   ```

2. **Check for Errors**:
   ```
   ❌ Failed to send admin notification: [error]
   ❌ Failed to send approval email: [error]
   ```

3. **Common Issues**:
   - **App Password Invalid**: Regenerate Gmail App Password
   - **Less Secure Apps**: Must use App Password, not regular password
   - **2-Step Not Enabled**: Enable 2-Step Verification first
   - **SMTP Blocked**: Check firewall/antivirus settings

4. **Test Email Config**:
   Create test file `test-email.ts`:
   ```typescript
   import { testEmailConfig } from '@/lib/email';
   
   testEmailConfig().then(result => {
     console.log(result);
   });
   ```

### If Admin Dashboard Not Loading

1. **Check route exists**: `/admin/requests` should be accessible
2. **Check authentication**: May need to login at `/admin/login`
3. **Console errors**: Open browser DevTools → Console tab
4. **Network errors**: Check DevTools → Network tab

### If Download Link Not Working

1. **Check token**: Should be 64-character hex string
2. **Check expiration**: Must be within 7 days
3. **Check file path**: File must exist in `public/resources/`
4. **Console logs**: Look for file not found errors

---

## 📊 Test Checklist

- [ ] User can verify @iiu.edu.pk email
- [ ] User can preview files without approval
- [ ] User can request download
- [ ] Admin receives email notification
- [ ] Admin can view requests in dashboard
- [ ] Admin can approve request
- [ ] User receives approval email
- [ ] Download link works
- [ ] Admin can reject request
- [ ] User receives rejection email
- [ ] Filter & search work in dashboard
- [ ] Stats update correctly
- [ ] Token expires after 7 days
- [ ] Duplicate requests are blocked
- [ ] Non-IIU emails are rejected

---

## 🚀 Production Deployment Checklist

Before deploying to Vercel/production:

1. **Database Setup**:
   - Replace in-memory Map with MongoDB/PostgreSQL
   - Create `download_requests` collection/table
   - Migrate existing code to use database

2. **Environment Variables**:
   - Set all `.env.local` vars in Vercel dashboard
   - Use production email credentials
   - Set production `NEXT_PUBLIC_BASE_URL`

3. **Security**:
   - Add rate limiting to APIs
   - Implement CSRF protection
   - Add request logging
   - Set up monitoring/alerts

4. **File Storage**:
   - Upload actual course files to `public/resources/`
   - Consider cloud storage (S3, Cloudflare R2)
   - Implement file size limits

5. **Admin Authentication**:
   - Secure admin routes with NextAuth
   - Add role-based access control
   - Implement session management

6. **Email Service**:
   - Consider Resend/SendGrid for better deliverability
   - Set up custom domain for emails
   - Implement email queue for bulk sending

---

## 📝 Notes

- **In-memory storage**: Current system uses Map (data lost on restart)
- **Admin email hardcoded**: Currently `faranalam19@gmail.com`
- **No authentication**: Admin dashboard accessible to anyone (add NextAuth)
- **File uploads**: Need to manually add files to course folders

---

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Check terminal/server logs
3. Verify .env.local configuration
4. Test with a simple request first
5. Check Gmail App Password is correct

**Email Working?** → You should see message IDs in console:
```
✅ Admin notification sent: <random-message-id@gmail.com>
```

**Email Not Working?** → Check error messages and verify Gmail settings.

---

Good luck testing! 🎉
