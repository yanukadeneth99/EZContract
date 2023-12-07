import Link from "next/link";
import React from "react";

export default function ContractBlock({
  path,
  title,
  tagline,
  description,
}: {
  readonly path: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
}) {
  return (
    <div className="h-full basis-1/3 p-4 flex justify-center items-center">
      <Link
        href={path}
        className="backdrop-blur-lg backdrop-brightness-50 ring-2 ring-[#5C91CE] ring-offset-2 shadow-2xl shadow-[#5C91CE] rounded-md hover:scale-105 hover:border-blue-300 hover:ring-4 h-1/2 w-full flex flex-col justify-start items-center p-4"
      >
        <p className="tet-md uppercase text-gray-200 font-mono">
          Deploying the contract:
        </p>
        <div className="border-5 p-2 flex flex-col justify-center items-center mt-6 shadow-md rounded">
          <p className="font-bold text-5xl text-gray-100 font-mono">{title}</p>
          <p className="text-gray-300 font-mono">{tagline}</p>
        </div>
        <p className="text-sm mt-12 text-center text-gray-300 font-mono">
          {description}
        </p>
      </Link>
    </div>
  );
}
