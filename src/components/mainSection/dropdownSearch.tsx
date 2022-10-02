import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Viewer from "./viewer";

type DropdownSearchProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleViewers: (ids: any) => void;
};
const DropdownSearch = ({ handleViewers }: DropdownSearchProps) => {
  const { store } = useContext(Context);
  const [isHidden, setIsHidden] = useState(true);

  const [users, setUsers] = useState({});
  const [allUsers, setAllUsers] = useState([]);

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
    <>
      <button
        className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsHidden(!isHidden)}
      >
        Add viewers{" "}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isHidden && (
        <div className="mb-6 z-10 w-80 bg-white rounded shadow dark:bg-gray-700">
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user"
              />
            </div>
          </div>
          <ul className="w-full overflow-y-auto px-3 pb-3 h-64 text-sm text-gray-700 dark:text-gray-200">
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
    </>
  );
};

export default observer(DropdownSearch);
