import React, { useContext, useEffect, useState } from "react";
import { IProject } from "../../../../models/IProject";
import Step from "./step";
import { v4 } from "uuid";
import { Context } from "../../../..";
import _ from "lodash";

const StagesLine = ({ project }: { project: IProject }) => {
  const { store } = useContext(Context);
  const [localStages, setLocalStages] = useState(project.stages);
  useEffect(() => {
    setLocalStages(
      [...project.stages].sort((a, b) => {
        if (!a.next?.id || !b.next?.id) return 1; // null = last
        return Number(a.next.id) - Number(b.next.id);
      })
    );
  }, [project.stages]);

  const handleAddStage = (stageNumber: number, order: "next" | "prev") => {
    const nextStageIndex = order === "next" ? stageNumber : stageNumber - 1;
    console.log(nextStageIndex);
    const newStage = {
      text: "New Stage",
      projectId: Number(project.id),
      nextId:
        project.stages.length > nextStageIndex
          ? Number(localStages[nextStageIndex]?.id)
          : null
    };

    console.log(newStage);
    store.createStage(newStage);

    // setLocalStages((prev) => {
    //   prev.splice(index, 0, {
    //     ...prev[index],
    //     id: v4(),
    //     text: "New Stage",
    //     next: prev[index + 1]
    //   });
    //   return [...prev];
    // });
  };

  // useEffect(() => {
  //   store.createStage({});
  // }, [localStages]);

  const handleSumbitStage = (stage) => {
    console.log(stage);
  };

  return (
    <div className="relative flex h-full min-h-fit w-1 flex-col items-center justify-between rounded-xl bg-indigo-600">
      <Step
        first
        stageNumber={1}
        defaultText="Start"
        handleAddStage={handleAddStage}
      />
      {localStages?.map((stage, index) => (
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

export default StagesLine;
