import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPrimaryAdmin, normalizeEmail } from "@/lib/admin-auth";

interface RequestsLayoutProps {
  children: React.ReactNode;
}

export default async function RequestsLayout({ children }: RequestsLayoutProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  const primaryAdmin = await getPrimaryAdmin();

  if (!primaryAdmin) {
    redirect("/admin/signup");
  }

  if (normalizeEmail(session.user.email) !== normalizeEmail(primaryAdmin.email)) {
    redirect("/admin/login?error=invalid_session");
  }

  return <>{children}</>;
}
