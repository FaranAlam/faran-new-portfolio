import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password - Faran Alam",
  description: "Create a new password for your admin account",
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
