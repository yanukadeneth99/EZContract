import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-5 backdrop-blur-sm p-12 rounded-lg backdrop-brightness-75">
        <h1 className="text-3xl font-bold font-mono text-gray-300 text-center">
          Oops, where are you?
        </h1>
        <Link href="/deploy">
          <Button color="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
