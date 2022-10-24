import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import SelectedItem from "./selectedItem";
import FilterMenu from "./filterMenu";
import { Context } from "../../..";

const Filters = () => {
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);

  const [menuItems, setMenuItems] = useState(store.bugFilters);

  const [filterNames, setFilterNames] = useState<string[]>([]);

  const setActive = (name: string, parent = "") => {
    if (!parent) return;
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.name !== parent) return item;
        if (!item.children) {
          return { ...item, active: !item.active };
        }
        const updatedChildren = item.children.map((child) =>
          child.name === name ? { ...child, active: !child.active } : child
        );

        const updatedItem = {
          ...item,
          children: updatedChildren
        };
        const isParentActive = updatedItem.children.some(
          (child) => child.active === true
        );
        isParentActive
          ? (updatedItem.active = true)
          : (updatedItem.active = false);
        return updatedItem;
      })
    );
  };

  const removeFilter = (name: string) => {
    setMenuItems((prev) => {
      return prev.map((item) => {
        if (item.name === name && !item.children)
          return { ...item, active: false };
        if (item.name === name && item.children) {
          const updatedChildren = item.children.map((child) => ({
            ...child,
            active: false
          }));
          return { ...item, active: false, children: updatedChildren };
        } else {
          return item;
        }
      });
    });
  };

  // Title for filter groups
  useEffect(() => {
    const names = menuItems
      .filter((item) => item.active)
      .map((item) => item.name);
    setFilterNames(names);

    store.setBugFilters(menuItems);
    store.filterBugs();
  }, [menuItems]);

  // To close on outside click. May as well send query to server for filtered results
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
      className="relative flex w-fit rounded-md bg-gray-200 p-1 px-2 font-semibold text-gray-700"
      ref={filterRef}
    >
      <div className="absolute top-12 left-0">
        {open && <FilterMenu menuItems={menuItems} setActive={setActive} />}
      </div>
      <button
        className={`${filterNames.length ? "mr-2 text-primary-400" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      <div className="flex font-semibold">
        {filterNames.map((filter) => (
          <SelectedItem
            key={filter}
            name={filter}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
