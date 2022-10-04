import React, { useEffect, useRef, useState } from "react";
import DropdownButton from "../../controls/dropdownButton";
import { BugValues } from "./bugModal";

type SimpleDropdownProps = {
  label: string;
  name: keyof BugValues;
  menuItems: string[];
  handleValues: (option: string, value: keyof BugValues) => void;
};
const SimpleDropdown = ({
  label,
  name,
  menuItems,
  handleValues
}: SimpleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
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
          menuItems.includes(e.target.innerText.toLowerCase())
        ) {
          setSelected(true);
          setSelectedItem(e.target.innerText);
          // handleValues(e.target.innerText.toLowerCase(), name);
        }
      }
    };

    document.addEventListener("click", handleHide);

    return () => {
      document.removeEventListener("click", handleHide);
    };
  }, []);

  return (
    <div className="mb-2 w-60">
      <div className="mb-2 w-fit" ref={buttonRef}>
        <DropdownButton
          name={selectedItem}
          selected={selected}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <ul
          className="py-1 w-60 z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
          ref={listRef}
        >
          {menuItems.map((item) => (
            <li
              role="checkbox"
              value={item}
              key={item}
              className="uppercase text-sm block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleValues(item, name)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleDropdown;
