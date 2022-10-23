import React, { useState } from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import { ISidebarMenuItem } from "../../data/sidebarItems";
import { useLocation } from "react-router-dom";

const SidebarContents = ({
  sidebarItems,
  open
}: {
  sidebarItems: ISidebarMenuItem[];
  open: boolean;
}) => {
  return (
    <nav className={`ml-4 mt-4 space-y-2 ${open ? "" : "mx-4"} truncate`}>
      {sidebarItems.map((sidebarItem) => (
        <SidebarMenuItem
          key={sidebarItem.link}
          item={sidebarItem}
          open={open}
        />
      ))}
    </nav>
  );
};

export default SidebarContents;
