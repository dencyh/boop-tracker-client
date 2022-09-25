import React from "react";

const CompletionFilter = ({completed}: any) => {
  const color = completed ? "green" : "red";
  console.log(color);
  return (
    <button
      className={`m-2 w-6 h-6 bg-white rounded-sm shadow-md p-1 hover:cursor-pointer focus:outline-none focus:ring-${color}-600 focus:ring-2 flex justify-center items-center`}
      tabIndex={0}
    >
      <div
        className={`w-full h-full bg-${color}-600 rounded-sm`}></div>
    </button>
  );
};

export default CompletionFilter;
