import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { NavLink } from "react-router-dom";

type SidebarMenuItemProps = {
  item: ISidebarMenuItem;
  activeId: string;
  onActive: (id: string) => void;
};
const SidebarMenuItem = ({
  onActive,
  item,
  activeId
}: SidebarMenuItemProps) => {
  const activeClass = "bg-primary-500";
  return (
    <NavLink
      to={item.link}
      className={`flex items-center rounded-l-lg py-2 pl-2 text-base font-normal text-gray-200 hover:bg-primary-500 dark:text-white dark:hover:bg-gray-700 ${
        activeId === item.id ? activeClass : ""
      }`}
      onClick={() => onActive(item.id)}
    >
      <span className="text-slate-200">
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span className="ml-3">{item.text}</span>
    </NavLink>
  );
};

export default SidebarMenuItem;
