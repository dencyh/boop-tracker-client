import React, { useContext, useEffect, useState } from "react";
import { IProject, IStage } from "../../../models/IProject";
import Step from "./step";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const StagesLine = ({ project }: { project: IProject }) => {
  const { store } = useContext(Context);
  const [localStages, setLocalStages] = useState(project.stages);

  useEffect(() => {
    const nextIds = {};
    Object.values(project.stages).forEach((stage) => {
      nextIds[stage.next?.id || "root"] = stage;
    });
    const list = [] as IStage[];
    let item = nextIds["root"];
    for (let i = 0; i < project.stages.length; i++) {
      list.push(item);
      item = nextIds[item.id];
    }
    setLocalStages(list.reverse());
  }, [project.stages]);

  const handleAddStage = (stageNumber: number, order: "next" | "prev") => {
    const nextStageIndex = order === "next" ? stageNumber : stageNumber - 1;
    const newStage = {
      text: "New Stage",
      projectId: project.id,
      nextId:
        project.stages.length > nextStageIndex
          ? Number(localStages[nextStageIndex]?.id)
          : null
    };

    store.createStage(newStage);
  };

  return (
    <div className="relative flex h-full min-h-fit w-1 flex-col items-center justify-between rounded-xl bg-indigo-600">
      <Step
        first
        stageNumber={1}
        defaultText="Start"
        handleAddStage={handleAddStage}
      />
      {localStages.map((stage, index) => (
        <Step
          key={stage.id}
          stageNumber={index + 1}
          defaultText="Enter stage name"
          stage={stage}
          handleAddStage={handleAddStage}
        />
      ))}
      <Step
        last
        stageNumber={localStages?.length + 1 || 2}
        defaultText="Release"
        handleAddStage={handleAddStage}
      />
    </div>
  );
};

export default observer(StagesLine);
