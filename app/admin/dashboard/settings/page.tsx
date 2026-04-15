"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  MdPerson, 
  MdLock, 
  MdLink, 
  MdPhone, 
  MdCheckCircle, 
  MdCancel, 
  MdCameraAlt 
} from 'react-icons/md';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "social" | "contact">("profile");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [uploadingPic, setUploadingPic] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: "Faran Alam",
    email: "faran.bsce40@iiu.edu.pk",
    reviewNotificationEmail: "faran.bsce40@iiu.edu.pk",
    title: "Full Stack Developer",
    bio: "Passionate developer specialized in React, Next.js, and Node.js",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Social links state
  const [socialLinks, setSocialLinks] = useState({
    github: "https://github.com/faranalam",
    linkedin: "https://linkedin.com/in/faranalam",
    twitter: "https://twitter.com/faranalam",
    instagram: "https://instagram.com/faranalam",
    youtube: "https://youtube.com/@faranalam",
  });

  // Contact info state
  const [contactInfo, setContactInfo] = useState({
    phone: "+92 300 1234567",
    whatsapp: "+92 300 1234567",
    address: "Islamabad, Pakistan",
    website: "https://faranalam.com",
  });

  // Check auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      loadProfileData();
    }
  }, [status, router]);

  // Load profile data from database
  const loadProfileData = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      const data = await response.json();
      
      if (data.success && data.profile) {
        setProfileData({
          name: data.profile.name || '',
          email: data.profile.email || '',
          reviewNotificationEmail: data.profile.reviewNotificationEmail || data.profile.email || '',
          title: data.profile.title || '',
          bio: data.profile.bio || '',
        });
        setProfilePicture(data.profile.profilePicture || '');
        setSocialLinks(data.profile.socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: '',
          youtube: '',
        });
        setContactInfo(data.profile.contactInfo || {
          phone: '',
          whatsapp: '',
          address: '',
          website: '',
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setSuccessMessage("");
    } else {
      setSuccessMessage(message);
      setErrorMessage("");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const oldEmail = (session?.user?.email || "").toLowerCase();
    const newEmail = (profileData.email || "").toLowerCase();
    
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          profilePicture,
          socialLinks,
          contactInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (newEmail && oldEmail && newEmail !== oldEmail) {
          showMessage("Email updated. Please login again with the new email.");
          setTimeout(async () => {
            await signOut({ callbackUrl: "/admin/login" });
          }, 1000);
        } else {
          showMessage("Profile updated successfully!");
        }
      } else {
        showMessage(data.error || "Failed to update profile", true);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      showMessage("Error updating profile", true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("Passwords do not match!", true);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showMessage("Password must be at least 8 characters!", true);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        showMessage("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const data = await response.json();
        showMessage(data.message || "Failed to change password", true);
      }
    } catch (error) {
      showMessage("Error changing password", true);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          profilePicture,
          socialLinks,
          contactInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage("Social links updated successfully!");
      } else {
        showMessage(data.error || "Failed to update social links", true);
      }
    } catch (error) {
      console.error('Failed to update social links:', error);
      showMessage("Error updating social links", true);
    } finally {
      setLoading(false);
    }
  };

  const handleContactUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          profilePicture,
          socialLinks,
          contactInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage("Contact information updated successfully!");
      } else {
        showMessage(data.error || "Failed to update contact info", true);
      }
    } catch (error) {
      console.error('Failed to update contact info:', error);
      showMessage("Error updating contact info", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your profile, account settings, and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg flex items-center gap-2">
          <span><MdCheckCircle className="inline" /></span>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg flex items-center gap-2">
          <span><MdCancel className="inline" /></span>
          {errorMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MdPerson className="mr-2" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MdLock className="mr-2" /> Password
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "social"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MdLink className="mr-2" /> Social Links
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MdPhone className="mr-2" /> Contact Info
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="relative group">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                    {profilePicture ? (
                      <Image
                        src={profilePicture}
                        alt="Profile"
                        fill
                        sizes="128px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <MdPerson className="text-6xl text-white" />
                    )}
                  </div>
                  <label 
                    htmlFor="profile-pic-upload"
                    className="absolute inset-0 w-32 h-32 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdCameraAlt className="text-3xl text-white" />
                  </label>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Check file size (max 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          showMessage("File size must be less than 5MB", true);
                          return;
                        }

                        setUploadingPic(true);
                        const reader = new FileReader();
                        reader.onloadend = async () => {
                          const base64Image = reader.result as string;
                          setProfilePicture(base64Image);
                          
                          // Auto-save to database
                          try {
                            const response = await fetch('/api/admin/profile', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                ...profileData,
                                profilePicture: base64Image,
                                socialLinks,
                                contactInfo,
                              }),
                            });

                            const data = await response.json();

                            if (data.success) {
                              showMessage("Profile picture updated and saved!");
                            } else {
                              showMessage("Picture uploaded but save failed", true);
                            }
                          } catch (error) {
                            console.error('Failed to save profile picture:', error);
                            showMessage("Picture uploaded but save failed", true);
                          } finally {
                            setUploadingPic(false);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-600 mt-1">Click on the image to upload a new photo</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (Max 5MB)</p>
                  {profilePicture && (
                    <button
                      type="button"
                      onClick={async () => {
                        setProfilePicture("");
                        
                        // Save to database
                        try {
                          const response = await fetch('/api/admin/profile', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              ...profileData,
                              profilePicture: '',
                              socialLinks,
                              contactInfo,
                            }),
                          });

                          const data = await response.json();

                          if (data.success) {
                            showMessage("Profile picture removed and saved!");
                          } else {
                            showMessage("Failed to save changes", true);
                          }
                        } catch (error) {
                          console.error('Failed to remove profile picture:', error);
                          showMessage("Failed to save changes", true);
                        }
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Notification Email</label>
                <input
                  type="email"
                  value={profileData.reviewNotificationEmail}
                  onChange={(e) => setProfileData({ ...profileData, reviewNotificationEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where review approval emails should be sent"
                />
                <p className="text-xs text-gray-500 mt-1">New rating submissions will notify this email address.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          )}

          {/* Social Links Tab */}
          {activeTab === "social" && (
            <form onSubmit={handleSocialUpdate} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={socialLinks.github}
                  onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter / X</label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <input
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://youtube.com/@username"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Saving..." : "Save Social Links"}
              </button>
            </form>
          )}

          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <form onSubmit={handleContactUpdate} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={contactInfo.website}
                  onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Saving..." : "Save Contact Info"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
