import shibaLogo from "../assets/my-shiba-512.png";
import { Link } from "react-router-dom";
import React from "react";

export function Header() {
  return (
    <div className="container mx-auto">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/auth" className="flex items-center">
            <img src={shibaLogo} className="h-6 sm:h-20" alt="Shiba Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Boop Tracker
            </span>
          </Link>
          <div className="flex items-center xl:w-1/4 lg:w-2/5 md:w-3/5">
            <form className="w-4/5">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-blue-600 rounded-full dark:bg-gray-600 shadow-md shadow-gray-500/50 ml-4">
              <span className="font-medium text-white dark:text-gray-300">
                JL
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
