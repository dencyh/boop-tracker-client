import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import ProjectView from "./projectView";

const Project = () => {
  return (
    <>
      <ProjectView />
    </>
  );
};

export default Project;
