import React from "react";

const CompletionFilter = ({ completed }: any) => {
  const ringColor = completed ? "focus:ring-green-600" : "focus:ring-red-600";
  const bgColor = completed ? "bg-green-600" : "bg-red-600";
  return (
    <button
      className={`m-2 w-6 h-6 bg-white rounded-sm shadow-md p-1 hover:cursor-pointer focus:outline-none ${ringColor} focus:ring-2 flex justify-center items-center`}
      tabIndex={0}
    >
      <div className={`w-full h-full ${bgColor} rounded-sm`}></div>
    </button>
  );
};

export default CompletionFilter;
