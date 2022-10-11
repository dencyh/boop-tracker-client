import { observer } from "mobx-react-lite";
import React from "react";
import { BaseControl } from "./interfaces/baseControl";
import { statusPriorityColors as bgColors } from "../../data/statusBgColors";

const DropdownButton = ({ name, ...rest }: BaseControl) => {
  const bgColor =
    bgColors[name?.toLowerCase() as keyof typeof bgColors] || "bg-primary-400";

  const defaultStyle =
    "text-white bg-primary-400 hover:bg-primary-500 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800";
  const selectedStyle = bgColor + " text-white ring-blue-300";

  return (
    <>
      <button
        className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          name ? selectedStyle : defaultStyle
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
