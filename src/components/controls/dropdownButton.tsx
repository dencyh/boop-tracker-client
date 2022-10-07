import { observer } from "mobx-react-lite";
import React from "react";
import { BaseControl } from "./interfaces/baseControl";

interface DropdownButtonProps extends BaseControl {
  selected: boolean;
}
const DropdownButton = ({ name, selected, ...rest }: DropdownButtonProps) => {
  const bgColors = {
    highest: "bg-red-600",
    high: "bg-amber-500",
    medium: "bg-sky-500",
    low: "bg-gray-400",
    lowest: "bg-slate-500",
    open: "bg-green-600",
    done: "bg-violet-600",
    "won't do": "bg-gray-500",
    duplicate: "bg-orange-600"
  };
  const bgColor =
    bgColors[name?.toLowerCase() as keyof typeof bgColors] || "bg-blue-700";

  const defaultStyle =
    "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800";
  const selectedStyle = bgColor + " text-white ring-blue-300";

  return (
    <>
      <button
        className={`inline-flex w-fit items-center rounded-lg px-4 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          selected ? selectedStyle : defaultStyle
        }`}
        type="button"
        {...rest}
      >
        {name}{" "}
        <svg
          className="ml-2 h-4 w-4"
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
    </>
  );
};

export default observer(DropdownButton);
