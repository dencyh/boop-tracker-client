import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import SelectedItem from "./selectedItem";
import FilterMenu from "./filterMenu";

const filterMenuItems = [
  {
    name: "Status",
    active: false,
    children: [
      { name: "Open", active: false },
      { name: "Closed", active: false },
      { name: "Duplicate", active: false },
      { name: "Won't do", active: false }
    ]
  },
  {
    name: "Priority",
    active: false,
    children: [
      { name: "Highest", active: false },
      { name: "High", active: false },
      { name: "Medium", active: false },
      { name: "Low", active: false },
      { name: "Lowest", active: false }
    ]
  },
  {
    name: "Due",
    active: false,
    children: [
      { name: "Today", active: false },
      { name: "In 7 days", active: false },
      { name: "Overdue", active: false }
    ]
  },
  { name: "Assigned to me" }
];

const Filters = () => {
  const [open, setOpen] = useState(false);

  const [menuItems, setMenuItems] = useState(filterMenuItems);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<any>([]);

  const setActive = (name: string, parent = "") => {
    console.log(parent);
    // setFilters((prev) => {
    //   const filterOn = prev[parent].indexOf(name);

    //   if (filterOn >= 0) {
    //     return prev[parent].filter((curr) => curr.name !== name);
    //   } else {
    //     return [...prev, parent: [...prev[parent], name]];
    //   }
    // });
  };
  console.log(filters);

  // console.log(filters);

  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMenu = (e) => {
      if (!filterRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMenu);

    return () => document.removeEventListener("mousedown", handleMenu);
  });

  return (
    <div
      className="relative flex w-fit rounded-md bg-gray-200 p-1 px-2 text-gray-700"
      ref={filterRef}
    >
      <div className="absolute top-12 left-0">
        {open && <FilterMenu menuItems={menuItems} setActive={setActive} />}
      </div>
      <button
        className={`${filters.length ? "mr-2 text-primary-400" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      {/* <div className="flex font-semibold">
        {filters.map((filter) => (
          <SelectedItem key={filter} />
        ))}
      </div> */}
    </div>
  );
};

export default Filters;
