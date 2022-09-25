import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import {ISidebarMenuItem} from "../../data/sidebarItems";


const SidebarContents = ({sidebarItems}: any) => {
  console.log(sidebarItems);
  return (
    <ul className="space-y-2">
      {sidebarItems.map((sidebarItem: any) => (
        <SidebarMenuItem key={sidebarItem.id} {...sidebarItem}/>
      ))}
    </ul>
  );
};

export default SidebarContents;
