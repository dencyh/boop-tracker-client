import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Context } from "../../index";

const SidebarFooter = () => {
  const { store } = useContext(Context);
  return (
    <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
      <li>
        <button
          className="flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          onClick={() => store.signOut()}
        >
          <span className="text-slate-500 dark:text-white">
            <FontAwesomeIcon icon={solid("moon")} />
            <span className="ml-3">Sign out</span>
          </span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter;
