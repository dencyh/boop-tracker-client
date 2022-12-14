import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IUser } from "../../../models/IUser";
import DropdownButton from "../../../components/controls/dropdownButton";
import { BugValues } from "./bugModal";
import { ProjectValues } from "./projectModal";
import Search from "./search";
import Viewer from "./viewer";
import { Context } from "../../..";

type CheckboxDropdown = {
  label: string;
  name: keyof BugValues | keyof ProjectValues;
  menuItems: IUser[];
  handleChange: ({ name, value }: { name: string; value: string[] }) => void;
};
const CheckboxDropdown = ({
  label,
  name,
  menuItems,
  handleChange
}: CheckboxDropdown) => {
  const { store } = useContext(Context);
  useEffect(() => {
    store.getViewers();
  }, []);
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState({});

  const handleSelectedId = ({ value }: { value: string }) => {
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
    handleChange({ name, value: selectedUserIds });
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

  // Search
  const [query, setQuery] = useState("");
  const [displayUsers, setDisplayUsers] = useState(menuItems);
  useEffect(() => {
    setDisplayUsers(
      menuItems.filter(
        (user) =>
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.firstName.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);
  const handleQuery = ({ value }: { value: string }) => {
    setQuery(value);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <div className="w-fit">
        <DropdownButton
          name={label}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />
      </div>
      <div
        className={`absolute top-12 z-10 h-56  w-60 rounded bg-white shadow dark:bg-gray-700 ${
          open ? "" : "hidden"
        }`}
        ref={listRef}
      >
        <Search label="" handleChange={handleQuery} name="viewerQuery" />
        <ul className="absolute h-40 w-full overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
          {displayUsers.map((user) => (
            <Viewer
              key={user.id}
              id={user.id.toString()}
              firstName={user.firstName}
              lastName={user.lastName}
              name="viewer"
              handleChange={handleSelectedId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(CheckboxDropdown);
