import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import ProjectView from "./projectView";

const Milestones = () => {
  const { store } = useContext(Context);

  return (
    <div className="h-screen w-full overflow-auto py-8 px-12">
      <h1 className="mb-4 pb-6 text-2xl font-bold text-gray-600">Milestones</h1>
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
