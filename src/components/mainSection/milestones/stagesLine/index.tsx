import React from "react";
import { IProject } from "../../../../models/IProject";
import Step from "./step";

const StagesLine = ({ project }: { project: IProject }) => {
  return (
    <div className="relative flex h-full min-h-fit w-1 flex-col items-center justify-between rounded-xl bg-indigo-600">
      <Step first stageNumber={1} defaultText="Start" />
      {project.stages?.map((stage, index) => (
        <Step
          key={stage.id}
          stageNumber={index + 1}
          defaultText=""
          stage={stage}
        />
      ))}
      <Step
        last
        stageNumber={project.stages?.length + 1 || 2}
        defaultText="Release"
      />
    </div>
  );
};

export default StagesLine;
