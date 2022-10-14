import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { NavLink, useLocation } from "react-router-dom";

type SidebarMenuItemProps = {
  item: ISidebarMenuItem;
};
const SidebarMenuItem = ({ item }: SidebarMenuItemProps) => {
  const { pathname } = useLocation();
  const linkName = pathname.slice(1);
  const activeClass = "bg-primary-500";
  return (
    <NavLink
      to={item.link}
      className={`flex items-center rounded-l-lg py-2 pl-2 text-base font-normal text-gray-200 hover:bg-primary-500 dark:text-white dark:hover:bg-gray-700 ${
        linkName === item.link ? activeClass : ""
      }`}
    >
      <span className="text-slate-200">
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span className="ml-3">{item.text}</span>
    </NavLink>
  );
};

export default SidebarMenuItem;
