import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import DropdownButton from "../../../components/controls/dropdownButton";
import { IBug } from "../../../models/IBug";
import { BugValues } from "./bugModal";

type SimpleDropdownProps = {
  label: string;
  name: keyof BugValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuItems: any;
  handleChange: ({ name, value }: { name: keyof IBug; value: string }) => void;
};
const SimpleDropdown = ({
  label,
  name,
  menuItems,
  handleChange
}: SimpleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(label);

  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleHide = (e: any) => {
      if (!buttonRef.current?.contains(e.target)) {
        setOpen(false);
        if (
          listRef.current?.contains(e.target) &&
          Object.values(menuItems).includes(e.target.innerText.toLowerCase())
        ) {
          setSelectedItem(e.target.innerText);
        }
      }
    };

    document.addEventListener("click", handleHide);

    return () => {
      document.removeEventListener("click", handleHide);
    };
  }, []);

  useEffect(() => {
    setSelectedItem(label);
  }, [label]);

  return (
    <div className="relative w-fit">
      <div className="w-fit" ref={buttonRef}>
        <DropdownButton
          name={selectedItem || "Choose a project"}
          onClick={() => setOpen(!open)}
        />
      </div>
      <ul
        className={`absolute z-10 max-h-64 w-fit divide-y divide-gray-100 overflow-auto rounded bg-white py-1 text-sm text-gray-700 shadow dark:bg-gray-700 dark:text-gray-200 ${
          open ? "" : "hidden"
        }`}
        ref={listRef}
      >
        {Object.keys(menuItems).map((value) => (
          <li
            role="button"
            value={menuItems[value]}
            key={value}
            className="block w-48 py-2 px-4 text-sm uppercase hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              handleChange({ name, value });
            }}
          >
            {menuItems[value]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(SimpleDropdown);
