import Link from "next/link";
import React from "react";

export default function ContractBlock({
  path,
  title,
  tagline,
  description,
  disable = false,
}: {
  readonly path: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly disable?: boolean;
}) {
  return (
    <>
      {!disable ? (
        <Link
          href={path}
          className="backdrop-blur-lg backdrop-brightness-50 ring-2 ring-[#5C91CE] ring-offset-2 shadow-2xl shadow-[#5C91CE] rounded-md hover:scale-105 hover:border-blue-300 hover:ring-4 w-full lg:h-1/2 flex flex-col justify-center space-y-3 lg:space-y-6 items-center p-4"
        >
          <p className="text-sm md:text-md xl:text-xl uppercase text-gray-200 font-mono">
            Deploying the contract:
          </p>
          <div className="border-5 p-2 flex flex-col justify-center items-center lg:mt-6 shadow-md rounded">
            <p className="font-bold text-md md:text-2xl xl:text-5xl text-gray-100 font-mono">
              {title}
            </p>
            <p className="text-gray-300 font-mono text-xs lg:text-lg">
              {tagline}
            </p>
          </div>
          <p className="text-xs pt-3 lg:mt-12 text-center text-gray-300 font-mono xl:text-lg">
            {description}
          </p>
        </Link>
      ) : (
        <div className="backdrop-blur-lg backdrop-brightness-75 brightness-50 ring-2 ring-[#5C91CE] ring-offset-2 shadow-2xl shadow-[#5C91CE] rounded-md w-full lg:h-1/2 flex flex-col justify-center space-y-3 lg:space-y-6 items-center p-4">
          <p className="text-sm md:text-md xl:text-xl uppercase text-gray-200 font-mono">
            Upcoming contract:
          </p>
          <div className="border-5 p-2 flex flex-col justify-center items-center lg:mt-6 shadow-md rounded">
            <p className="font-bold text-md md:text-2xl xl:text-5xl text-gray-100 font-mono">
              {title}
            </p>
            <p className="text-gray-300 font-mono text-xs lg:text-lg">
              {tagline}
            </p>
          </div>
          <p className="text-xs pt-3 lg:mt-12 text-center text-gray-300 font-mono xl:text-lg">
            {description}
          </p>
        </div>
      )}
    </>
  );
}
