import React from "react";
import { BaseControl } from "./interfaces/baseControl";

interface DropdownButtonProps extends BaseControl {
  selected: boolean;
}
const DropdownButton = ({ name, selected, ...rest }: DropdownButtonProps) => {
  const bgColors = {
    highest: "bg-red-300",
    high: "bg-orange-300",
    medium: "bg-yellow-300",
    low: "bg-green-100",
    lowest: "bg-green-200"
  };
  const bgColor = bgColors[name?.toLowerCase() as keyof typeof bgColors];

  const defaultStyle =
    "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const selectedStyle = bgColor + " ring-4 ring-blue-300";

  return (
    <button
      className={`w-fit focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center ${
        selected ? selectedStyle : defaultStyle
      }`}
      type="button"
      {...rest}
    >
      {name}{" "}
      <svg
        className="ml-2 w-4 h-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
  );
};

export default DropdownButton;
