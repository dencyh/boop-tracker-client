import React from "react";
import SearchBar from "./seachBar";
import ProjectFilters from "./projectFilters";

const Projects = () => {
  return (
    <div id="drawer-navigation"
         className="relative flex flex-col shrink-0 w-270px xl:w-80 h-screen p-4 bg-white dark:bg-gray-800"
         tabIndex={-1} aria-labelledby="drawer-navigation-label">


      <button type="button"
              className="absolute top-1/2 -right-4 rotate-180 hover:rotate-0 z-0 text-white bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all">
        <svg aria-hidden="true" className="w-3 h-8 translate-x-2" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
        </svg>
        <svg aria-hidden="true" className="w-3 h-8 -translate-x-2 absolute" fill="currentColor"
             viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
      <SearchBar/>
      <ProjectFilters/>
      <div className="flex items-center">
        <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation"
                className="h-1/2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" fill="currentColor">
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="h-full py-4 overflow-y-auto flex flex-col justify-between">
      </div>
    </div>
  );
};

export default Projects;
