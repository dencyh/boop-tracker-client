import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import ProjectView from "./projectView";

const Milestones = () => {
  const { store } = useContext(Context);

  return (
    <div className="h-screen w-full overflow-auto p-12">
      {(store.currentProject.id
        ? [...[], store.currentProject]
        : store.filteredProjects
      ).map((project) => (
        <ProjectView {...project} key={project.id} />
      ))}
    </div>
  );
};

export default observer(Milestones);
