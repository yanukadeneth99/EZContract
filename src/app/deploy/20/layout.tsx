import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deploy ERC 20 Tokens",
  description:
    "Deploy ERC 20 Cryptocurrency Tokens with an interface not having to worry about code",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return { children };
}
