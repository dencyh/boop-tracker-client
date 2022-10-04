import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import DropdownButton from "../controls/dropdownButton";
import SearchBar from "../sidebar/projects/seachBar";
import Search from "./search";
import Viewer from "./viewer";

type CheckboxDropdown = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleViewers: (ids: any) => void;
  buttonLabel: string;
};
const CheckboxDropdown = ({ handleViewers, buttonLabel }: CheckboxDropdown) => {
  const { store } = useContext(Context);
  const [isHidden, setIsHidden] = useState(true);

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

  return (
    <div className="mb-2 w-60">
      <div className="mb-2">
        <DropdownButton
          selected={false}
          name="Assing to"
          onClick={() => setIsHidden(!isHidden)}
        />
      </div>
      {!isHidden && (
        <div className="mb-6 z-10 w-60 bg-white rounded shadow dark:bg-gray-700">
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
      )}
    </div>
  );
};

export default observer(CheckboxDropdown);
