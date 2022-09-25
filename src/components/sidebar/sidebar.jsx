import React from "react";
import SidebarHeaderTabs from "./sidebarHeaderTabs";
import AppLogo from "../appLogo";

import SidebarContents from "./sidebarContents";
import { sidebarItems } from "../../data/sidebarItems";
import BurgerButton from "./burgerButton";
import SidebarFooter from "./sidebarFooter";

const Sidebar = () => {
  return (
    <div
      id="drawer-navigation"
      className="p-4 drop-shadow-md flex flex-col shrink-0 xl:w-80 lg:w-240px h-screen border-r border-gray-200 bg-white dark:bg-gray-800"
      tabIndex="-1"
      aria-labelledby="drawer-navigation-label"
    >
      <div className="flex items-center">
        <AppLogo />
        <BurgerButton />
      </div>
      <SidebarHeaderTabs />
      <div className="h-full py-4 overflow-y-auto flex flex-col justify-between">
        <SidebarContents sidebarItems={sidebarItems} />
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
