import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../..";
import DropdownButton from "../../controls/dropdownButton";
import Search from "./search";
import Viewer from "./viewer";

type CheckboxDropdown = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleViewers: (ids: any) => void;
  buttonLabel: string;
};
const CheckboxDropdown = ({ handleViewers, buttonLabel }: CheckboxDropdown) => {
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState({});

  useEffect(() => {
    store.getViewers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (users[value as keyof typeof users]) {
      setUsers({ ...users, [value]: false });
      return;
    }
    setUsers({ ...users, [value]: true });
  };

  useEffect(() => {
    handleViewers(users);
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
    <div className="mb-2 w-60">
      <div className="mb-2 w-fit" ref={buttonRef}>
        <DropdownButton
          selected={false}
          name={buttonLabel}
          onClick={() => setOpen(!open)}
        />
      </div>
      {/* {open && ( */}
      <div
        className={`mb-6 z-10 w-60 bg-white rounded shadow dark:bg-gray-700 ${
          open ? "" : "hidden"
        }`}
        ref={listRef}
      >
        <Search />
        <ul className="w-full overflow-y-auto px-3 pb-3 h-40 text-sm text-gray-700 dark:text-gray-200">
          {store.users.map((user) => (
            <Viewer
              key={user.id}
              id={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
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
