import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import Loader from "../../components/loader";
import ProjectView from "./projectView";

const Milestones = () => {
  const { store } = useContext(Context);

  return (
    <div className="relative h-screen w-full overflow-auto py-8">
      <div className="fixed top-0 z-20 flex w-full items-center gap-4 border-b bg-white p-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-600">Milestones</h1>
        {store.isLoading && <Loader noText={true} />}
      </div>
      <div className="mt-20 px-12">
        {(store.currentProject.id
          ? [...[], store.currentProject]
          : store.filteredProjects
        ).map((project) => (
          <ProjectView {...project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default observer(Milestones);
