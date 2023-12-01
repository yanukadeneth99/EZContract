"use client";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function ConnectorButton() {
  // Hooks
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      {isDisconnected && <ConnectButton />}
      {isConnecting && <p>Connecting...</p>}
      {/* Connected */}
      {address && (
        <div className="w-full flex flex-row justify-center space-x-12 items-center">
          <Link href="/dashboard">
            <button className="bg-red-500 p-3">Get Started</button>
          </Link>

          <button className="bg-red-500 p-3" onClick={() => disconnect()}>
            Disconnect Wallet
          </button>
        </div>
      )}
    </>
  );
}
