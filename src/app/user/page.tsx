import Link from "next/link";

export default function page() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-2/3 h-2/3 flex flex-row justify-center items-center bg-gray-700 p-3">
        <div className="h-full bg-red-500 basis-1/2 p-4 flex justify-center items-center">
          <Link
            href="/user/ft"
            className="bg-green-500 h-1/2 w-1/2 text-xl uppercase"
          >
            <button className="w-full h-full">ERC-20</button>
          </Link>
        </div>
        <div className="h-full bg-red-500 basis-1/2 p-4 flex justify-center items-center">
          <Link
            href="/user/nft"
            className="bg-green-500 h-1/2 w-1/2 text-xl uppercase"
          >
            <button className="w-full h-full">ERC-721</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
