import React, { useEffect, useRef, useState } from "react";
import Button from "../controls/button";
import DropdownButton from "../controls/dropdownButton";

type SimpleDropdownProps = {
  name: string;
  menuItems: string[];
};
const SimpleDropdown = ({ name, menuItems }: SimpleDropdownProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(name);

  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleHide = (e: any) => {
      if (!buttonRef.current?.contains(e.target)) {
        setIsHidden(true);
        if (
          listRef.current?.contains(e.target) &&
          menuItems.includes(e.target.innerText.toLowerCase())
        ) {
          setSelected(true);
          setSelectedItem(e.target.innerText);
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
          onClick={() => setIsHidden(!isHidden)}
        />
      </div>
      {!isHidden && (
        <ul
          className="py-1 w-60 z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
          ref={listRef}
        >
          {menuItems.map((item) => (
            <li
              role="button"
              key={item}
              className="uppercase text-sm block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
