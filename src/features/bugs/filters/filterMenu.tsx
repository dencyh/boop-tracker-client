/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FilterItem from "./filterItem";

const FilterMenu = ({
  menuItems,
  setActive,
  parent
}: {
  menuItems: any[];
  setActive: (name: string, parent: string | undefined) => void;
  parent?: string;
}) => {
  return (
    <div className="z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow drop-shadow-lg dark:bg-gray-700">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        {menuItems &&
          menuItems.map((item) => (
            <FilterItem
              key={item.name}
              item={item}
              setActive={setActive}
              parent={parent || item.name}
            >
              {item.children ? (
                <FilterMenu
                  menuItems={item.children}
                  setActive={setActive}
                  parent={item.name}
                />
              ) : undefined}
            </FilterItem>
          ))}
      </ul>
    </div>
  );
};

export default FilterMenu;
