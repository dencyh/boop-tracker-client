import React, { useContext, useEffect } from "react";
import { IProject } from "../../models/IProject";
import {
  faCircleDot,
  faPenToSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const color = project.closed ? "text-violet-600" : "text-green-600";

  const handleEditProject = () => {
    navigate(`/projects/${project.id}`, { replace: true });
  };

  return (
    <li
      onClick={() => {
        store.setCurrentProject(project);
      }}
      className="relative"
    >
      {project.id === store.currentProject.id && (
        <button
          className="absolute right-6 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-lg ring-1 ring-inset ring-gray-500 hover:bg-gray-600 hover:text-white"
          onClick={() => handleEditProject()}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}
      <button
        className={`my-1 mr-0 flex h-full w-full gap-4 rounded-l-xl border-r-0  p-3 text-left font-bold text-gray-600 hover:bg-white focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800  dark:focus:ring-gray-800
          ${project.id === store.currentProject.id ? "bg-white" : ""}
      `}
      >
        <div className={color}>
          <FontAwesomeIcon icon={faCircleDot} />
        </div>
        <div>{project.title}</div>
      </button>
    </li>
  );
};

export default observer(ProjectItem);
