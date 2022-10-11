import React from "react";
import { BugStats } from "./projectList";

const BugNumbers = ({ number, text, color }: BugStats) => {
  return (
    <div
      className={`flex h-28 w-28 flex-col items-center justify-between rounded-2xl ${color} py-4 px-1 font-bold text-gray-700`}
    >
      <h2 className="text-3xl">{number}</h2>
      <h3 className="text-center text-sm">{text}</h3>
    </div>
  );
};

export default BugNumbers;
