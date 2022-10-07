import React, { useState } from "react";
import SidebarMenuItem from "./sidebarMenuItem";
import { ISidebarMenuItem } from "../../data/sidebarItems";

const SidebarContents = ({
  sidebarItems
}: {
  sidebarItems: ISidebarMenuItem[];
}) => {
  const onActive = (id: string) => {
    setActiveId(id);
  };
  const [activeId, setActiveId] = useState(sidebarItems[1].id);

  return (
    <nav className="mt-4 space-y-2 pl-4">
      {sidebarItems.map((sidebarItem) => (
        <SidebarMenuItem
          key={sidebarItem.id}
          item={sidebarItem}
          activeId={activeId}
          onActive={onActive}
        />
      ))}
    </nav>
  );
};

export default SidebarContents;
