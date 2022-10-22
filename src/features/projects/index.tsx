import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import ProjectView from "./projectView";

const Project = () => {
  return (
    <div className="relative h-full w-full">
      <ProjectView />
    </div>
  );
};

export default Project;
