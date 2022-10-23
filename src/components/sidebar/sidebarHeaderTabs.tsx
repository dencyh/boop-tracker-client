import React from "react";

const SidebarHeaderTabs = ({ open }: { open?: boolean }) => {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-200 dark:border-gray-700 dark:text-gray-400">
      <ul
        className={`${
          open ? "" : ""
        } -mb-px flex origin-left justify-around truncate`}
      >
        <li className="mx-2">
          <a
            href="#"
            className={`${
              open ? "hidden" : ""
            } active inline-block rounded-t-lg  border-b-2 border-primary-400 p-4 text-primary-400 dark:border-blue-500 dark:text-blue-500`}
          >
            MS
          </a>
        </li>

        {open && (
          <>
            {" "}
            <li className={`mx-2`}>
              <a
                href="#"
                className={`active inline-block  rounded-t-lg border-b-2 border-primary-400 p-4 text-primary-400 duration-500 dark:border-blue-500 dark:text-blue-500`}
              >
                My Space
              </a>
            </li>
            <li className={`mx-2`}>
              <a
                href="#"
                className={`active inline-block rounded-t-lg border-b-2 border-transparent p-4 text-gray-400 duration-500 hover:border-gray-300 hover:text-gray-300 dark:hover:text-gray-200`}
              >
                All Users
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SidebarHeaderTabs;
