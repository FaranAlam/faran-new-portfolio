import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Faran Alam",
  description: "Admin login for managing portfolio dashboard",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
