import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import { ISidebarMenuItem } from "../../data/sidebarItems";

const SidebarContents = ({
  sidebarItems
}: {
  sidebarItems: ISidebarMenuItem[];
}) => {
  return (
    <nav className="mt-4 space-y-2 pl-4">
      {sidebarItems.map((sidebarItem) => (
        <SidebarMenuItem key={sidebarItem.id} {...sidebarItem} />
      ))}
    </nav>
  );
};

export default SidebarContents;
