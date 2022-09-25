import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const SidebarFooter = () => {
  return (
    <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
      <li>
        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
        >
          {/*<FontAwesomeIcon icon={solid("right-from-bracket")}/>*/}
          <span className="text-slate-500 dark:text-white">
            <FontAwesomeIcon icon={solid("moon")} />
            <span className="ml-3">Sign out</span>
          </span>
        </a>
      </li>
    </ul>
  );
};

export default SidebarFooter;
