import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-transparent">
      <div className="w-5/6 h-3/6 lg:h-5/6 backdrop-blur-md backdrop-brightness-50 border-black ring-2 ring-[#5C91CE] ring-offset-2 shadow-2xl shadow-[#5C91CE] border-4 rounded-md p-5 flex justify-center items-center flex-col space-y-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-extrabold text-gray-100">
          EZContract
        </h1>
        <p className="text-sm md:text-md 2xl:text-xl text-center font-mono text-gray-200">
          Easily deploy contracts on the{" "}
          <Link
            className="text-[#4177B3]"
            href="https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/"
            target="_blank"
          >
            XRP EVM Sidechain
          </Link>{" "}
          without having to write code. Simply Get Started, connect your wallet,
          choose your contract type, fill the required information, and deploy!
        </p>
        <div className="flex flex-row justify-center items-center w-full text-sm space-x-2 md:text-md md:space-x-12 md:pt-6">
          <p className="p-3 border-2 border-[#B42EBB] rounded-xl font-mono text-gray-300">
            ERC-20
          </p>
          <p className="p-3 border-2 border-[#B42EBB] rounded-xl font-mono text-gray-300">
            ERC-721
          </p>
        </div>
        {/* Replace with Connect Wallet - Rainbowkit */}
        <div className="w-full flex flex-row justify-center space-x-12 items-center">
          <Link href="/deploy">
            <Button
              className="text-gray-200 border-2 border-gray-100/20 font-mono uppercase lg:w-48 lg:h-16 lg:text-lg"
              color="secondary"
              variant="shadow"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
