import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import { ISidebarMenuItem } from "../../data/sidebarItems";

const SidebarContents = ({
  sidebarItems
}: {
  sidebarItems: ISidebarMenuItem[];
}) => {
  return (
    <ul className="space-y-2">
      {sidebarItems.map((sidebarItem) => (
        <SidebarMenuItem key={sidebarItem.id} {...sidebarItem} />
      ))}
    </ul>
  );
};

export default SidebarContents;
