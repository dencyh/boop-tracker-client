import React from "react";
import { IProject } from "../../../models/IProject";
import StagesLine from "./stagesLine";
import Timeline from "./timeline/timeline";

const ProjectView = (project: IProject) => {
  return (
    <div className="mb-8 h-fit border-b-2">
      <h3 className="mb-6 self-start text-xl font-semibold">{project.title}</h3>
      <div className="relative mx-auto mb-8 flex h-full w-96 justify-between">
        <div>
          <StagesLine project={project} />
        </div>
        <div className="my-4">
          <Timeline {...project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
