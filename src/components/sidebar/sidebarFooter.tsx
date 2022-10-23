import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Context } from "../../index";

const SidebarFooter = ({ open }: { open?: boolean }) => {
  const { store } = useContext(Context);
  return (
    <ul className="mx-4 border-t  border-gray-200 py-4 dark:border-gray-700">
      <li>
        <button
          className={`${
            open ? "w-full p-2" : "mx-auto p-3"
          } flex items-center truncate rounded-lg px-4 text-base font-normal text-gray-200 hover:bg-primary-500 dark:text-white dark:hover:bg-gray-700`}
          onClick={() => store.signOut()}
        >
          <span className="flex items-center text-slate-200 dark:text-white">
            <FontAwesomeIcon icon={solid("moon")} />
          </span>
          <span className={`${open ? "" : "hidden"} ml-3`}>Sign out</span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter;
