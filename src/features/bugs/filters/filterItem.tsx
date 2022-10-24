/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrowRight.svg";

const FilterItem = ({
  item,
  children,
  parent,
  setActive
}: {
  item: any;
  children?: JSX.Element | JSX.Element[];
  parent?: string;
  setActive: (name: string, parent: string | undefined) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative px-2"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`mb-1 flex w-full cursor-pointer items-center justify-between rounded-lg py-2 px-4 text-left  dark:hover:bg-gray-600 dark:hover:text-white ${
          item.active && item.children
            ? "bg-gray-100 text-primary-400"
            : item.active && !item.children
            ? "bg-primary-400 text-white hover:bg-primary-500"
            : "hover:bg-gray-100 hover:text-blue-600"
        }`}
        onClick={children ? undefined : () => setActive(item.name, parent)}
      >
        <div>{item.name}</div>
        {children && <ArrowRight />}
      </button>
      <div
        className="absolute -right-full -top-1"
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {open && children}
      </div>
    </li>
  );
};

export default FilterItem;
