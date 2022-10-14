import React, { useState } from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { useLocation } from "react-router-dom";

const SidebarContents = ({
  sidebarItems
}: {
  sidebarItems: ISidebarMenuItem[];
}) => {
  return (
    <nav className="mt-4 space-y-2 pl-4">
      {sidebarItems.map((sidebarItem) => (
        <SidebarMenuItem key={sidebarItem.link} item={sidebarItem} />
      ))}
    </nav>
  );
};

export default SidebarContents;
