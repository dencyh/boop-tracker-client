import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { IUser } from "../../../../models/IUser";
import DropdownButton from "../../../controls/dropdownButton";
import { BugValues } from "./bugModal";
import { ProjectValues } from "./projectModal";
import Search from "../search";
import Viewer from "../viewer";

type CheckboxDropdown = {
  label: string;
  name: keyof BugValues | keyof ProjectValues;
  menuItems: IUser[];
  handleValues: (
    option: string[],
    value: keyof BugValues | keyof ProjectValues
  ) => void;
};
const CheckboxDropdown = ({
  label,
  name,
  menuItems,
  handleValues
}: CheckboxDropdown) => {
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (users[value as keyof typeof users]) {
      setUsers({ ...users, [value]: false });
      return;
    }
    setUsers({ ...users, [value]: true });
  };

  useEffect(() => {
    const selectedUserIds = Object.keys(users).filter((userId) => {
      if (users[userId] === true) {
        return userId;
      }
    });
    handleValues(selectedUserIds, name);
  }, [users]);

  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleHide = (e: any) => {
      if (
        !buttonRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleHide);

    return () => {
      document.removeEventListener("click", handleHide);
    };
  }, []);

  return (
    <div className="relative mb-2" ref={buttonRef}>
      <div className="w-fit">
        <DropdownButton name={label} onClick={() => setOpen(!open)} />
      </div>
      {/* {open && ( */}
      <div
        className={`absolute -left-full z-10 h-56 w-60 rounded bg-white shadow dark:bg-gray-700 ${
          open ? "" : "hidden"
        }`}
        ref={listRef}
      >
        <Search />
        <ul className="absolute h-40 w-full overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
          {menuItems.map((user) => (
            <Viewer
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              onChange={handleChange}
            />
          ))}
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};

export default observer(CheckboxDropdown);
