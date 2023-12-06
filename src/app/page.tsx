import ConnectorButton from "@/components/ConnectorButton";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="w-5/6 h-3/6 lg:h-5/6 bg-gray-600 border-gray-400/50 border-4 rounded-md p-5 flex justify-center items-center flex-col space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">EZContract</h1>
        <p className="text-sm md:text-md 2xl:text-xl">
          Easily deploy contracts without having to write code. Simply connect
          your wallet, get started on a contract type, enter the required
          information, and deploy!
        </p>
        <div className="flex flex-row justify-around items-center w-full">
          <p className="p-3 bg-red-500 rounded-xl">ERC-20</p>
          <p className="p-3 bg-red-500 rounded-xl">ERC-721</p>
        </div>
        {/* Replace with Connect Wallet - Rainbowkit */}
        <ConnectorButton />
      </div>
    </main>
  );
}
