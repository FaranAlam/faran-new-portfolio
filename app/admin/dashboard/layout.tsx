import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPrimaryAdmin, normalizeEmail } from "@/lib/admin-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  const primaryAdmin = await getPrimaryAdmin();

  // If no admin exists in DB, force setup and invalidate dashboard access.
  if (!primaryAdmin) {
    redirect("/admin/signup");
  }

  // If session email doesn't match DB admin, require fresh login.
  if (normalizeEmail(session.user.email) !== normalizeEmail(primaryAdmin.email)) {
    redirect("/admin/login?error=invalid_session");
  }

  return <div className="bg-gray-50 min-h-screen">{children}</div>;
}
