import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Faran Alam",
  description: "Reset your admin password",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
