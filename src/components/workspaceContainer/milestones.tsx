import React, { useContext } from "react";
import { Context } from "../..";
import Line from "../mainSection/milestones/stepProgress";
import Timeline from "../mainSection/milestones/timeline";

const Milestones = () => {
  const { store } = useContext(Context);

  return (
    <div className="relative mx-auto my-2 flex h-fit w-96 items-center justify-between">
      {/* <div className="m-8">
        {store.projects.map((project) => (
          <div key={project.id}>{project.title}</div>
        ))}
      </div> */}
      <Line />
      <div className="absolute left-20 my-4 h-full">
        <Timeline />
      </div>
    </div>
  );
};

export default Milestones;
