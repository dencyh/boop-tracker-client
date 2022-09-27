import React from "react";
import SearchBar from "./seachBar";
import ProjectFilters from "./projectFilters";

const Projects = () => {
  return (
    <div
      id="drawer-navigation"
      className="p-4 drop-shadow-green-outline relative flex flex-col shrink-0 w-270px xl:w-80 h-screen bg-white dark:bg-gray-800 dark:border-l border-gray-700"
      tabIndex={-1}
      aria-labelledby="drawer-navigation-label"
    >
      <button
        type="button"
        className="absolute top-1/2 -right-4 rotate-180 hover:rotate-0 z-0 text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all"
      >
        <svg
          aria-hidden="true"
          className="w-3 h-8 translate-x-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          className="w-3 h-8 -translate-x-2 absolute"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>

      <div className="py-2.5">
        <SearchBar />
      </div>
      <ProjectFilters />
      <div className="flex items-center"></div>
      <div className="h-full py-4 overflow-y-auto flex flex-col justify-between"></div>
    </div>
  );
};

export default Projects;
