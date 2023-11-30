"use client";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
