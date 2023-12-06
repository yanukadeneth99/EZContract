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
        className="bg-gray-700 hover:scale-105 border-2 hover:border-blue-300 shadow-lg h-1/2 w-full flex flex-col justify-start items-center p-4"
      >
        <p className="tet-md uppercase">Deploying the contract:</p>
        <div className="border-5 p-2 flex flex-col justify-center items-center mt-6 shadow-md rounded">
          <p className="font-bold text-5xl ">{title}</p>
          <p>{tagline}</p>
        </div>
        <p className="text-sm mt-12 text-center">{description}</p>
      </Link>
    </div>
  );
}
