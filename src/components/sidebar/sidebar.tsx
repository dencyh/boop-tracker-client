import React, { useContext } from "react";
import SidebarHeaderTabs from "./sidebarHeaderTabs";
import AppLogo from "../misc/appLogo";

import SidebarContents from "./sidebarContents";
import { sidebarItems } from "../../data/sidebarItems";
import BurgerButton from "../controls/burgerButton";
import SidebarFooter from "./sidebarFooter";

const Sidebar = () => {
  return (
    <div
      className="lg:w-270px flex h-screen w-310px shrink-0 flex-col border-r border-gray-200 bg-[#41312c] drop-shadow-md  dark:bg-gray-800 xl:w-80"
      tabIndex={-1}
      aria-labelledby="drawer-navigation-label"
    >
      <div className="flex items-center justify-between bg-[#342219] p-4 text-gray-100">
        <AppLogo />
        <BurgerButton />
      </div>
      <div className="px-4">
        <SidebarHeaderTabs />
      </div>
      <div className="flex h-full flex-col justify-between overflow-y-auto">
        <SidebarContents sidebarItems={sidebarItems} />
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
