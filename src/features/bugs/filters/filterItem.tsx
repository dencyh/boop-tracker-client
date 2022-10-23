/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Filters from ".";
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
    <li className="relative">
      <button
        className="flex w-full cursor-pointer items-center justify-between py-2 px-4 text-left hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-600 dark:hover:text-white"
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
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
