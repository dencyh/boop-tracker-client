import React, { useState } from "react";
import NewBug from "./newBug";

const Bugs = () => {
  return (
    <>
      <div className="flex items-start justify-between p-4 z-10 w-full bg-white border-l border-gray-200">
        <div className="z-10 text-3xl w-96">Bugs</div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New project
        </button>
      </div>
      <NewBug />
    </>
  );
};

export default Bugs;
