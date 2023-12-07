import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deploy Tokens",
  description: "Deploy Tokens with an interface not having to worry about code",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <>{children}</>;
}
