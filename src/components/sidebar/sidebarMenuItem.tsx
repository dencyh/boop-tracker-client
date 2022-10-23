import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { NavLink, useLocation } from "react-router-dom";

type SidebarMenuItemProps = {
  item: ISidebarMenuItem;
  open?: boolean;
};
const SidebarMenuItem = ({ item, open }: SidebarMenuItemProps) => {
  const { pathname } = useLocation();
  const linkName = pathname.slice(1);
  const activeClass = "bg-primary-500";
  return (
    <NavLink
      to={item.link}
      className={`${
        open ? "rounded-l-lg" : "rounded-lg"
      } flex items-center py-2 px-4 text-base font-normal text-gray-200 hover:bg-primary-500 dark:text-white dark:hover:bg-gray-700 ${
        linkName.startsWith(item.link) ||
        (linkName.startsWith("projects") && item.link === "bugs")
          ? activeClass
          : ""
      }`}
    >
      <span className={`text-slate-200 ${open ? "" : "mx-auto"}`}>
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span className={`${open ? "" : "hidden"} ml-3`}>{item.text}</span>
    </NavLink>
  );
};

export default SidebarMenuItem;
