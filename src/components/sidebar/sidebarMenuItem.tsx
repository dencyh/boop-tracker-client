import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { Link } from "react-router-dom";

const SidebarMenuItem = ({ ...item }: ISidebarMenuItem) => {
  return (
    <li>
      <Link
        to={item.link}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="text-slate-500">
          <FontAwesomeIcon icon={item.icon} />
        </span>
        <span className="ml-3">{item.text}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
