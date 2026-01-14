import Link from "next/link";
import React from "react";

export default async function About() {
  return (
    <>
      <main className="flex flex-col pt-16">
        <div className="bg-blue-50 w-full h-64 px-5 md:px-20 flex items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">About us</h1>
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link
                  className="flex items-center text-sm text-gra hover:text-blue-600"
                  href="/"
                >
                  Home
                </Link>
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li
                className="inline-flex items-center text-sm text-gray-600"
                aria-current="page"
              >
                About
              </li>
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}
