import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Context } from "../../index";

const SidebarFooter = () => {
  const { store } = useContext(Context);
  return (
    <ul className="mx-4 space-y-2  border-t border-gray-200 p-4 dark:border-gray-700">
      <li>
        <button
          className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-primary-500 dark:text-white dark:hover:bg-gray-700"
          onClick={() => store.signOut()}
        >
          <span className="text-slate-200 dark:text-white">
            <FontAwesomeIcon icon={solid("moon")} />
            <span className="ml-3">Sign out</span>
          </span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter;
