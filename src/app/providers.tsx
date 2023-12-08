"use client";
import { NextUIProvider } from "@nextui-org/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";

const xrpsidechain: Chain = {
  id: 1440002,
  name: "XRPL EVM Sidechain",
  network: "XRPL EVM Sidechain",
  nativeCurrency: {
    decimals: 18,
    name: "XRPL EVM Sidechain",
    symbol: "XRP",
  },
  rpcUrls: {
    public: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
    default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
  },
  blockExplorers: {
    default: { name: "XRP Ledger", url: "https://evm-sidechain.xrpl.org" },
    etherscan: { name: "XRP Ledger", url: "https://evm-sidechain.xrpl.org" },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [xrpsidechain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME as string,
  projectId: process.env.NEXT_PUBLIC_APP_ID as string,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <NextUIProvider>{mounted && children}</NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
