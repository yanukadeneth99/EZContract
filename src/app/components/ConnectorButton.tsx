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
      {/* Wallet not Connected */}
      {isDisconnected && <ConnectButton />}

      {/* Connection ongoing */}
      {isConnecting && <p>Connecting, please check your wallet...</p>}

      {/* Connected */}
      {address && (
        <div className="w-full flex flex-row justify-center space-x-12 items-center">
          <button
            className="border-red-500 border-2 p-3"
            onClick={() => disconnect()}
          >
            Disconnect Wallet
          </button>

          <Link href="/user/deploy">
            <button className="bg-green-500 p-3">Get Started</button>
          </Link>
        </div>
      )}
    </>
  );
}
