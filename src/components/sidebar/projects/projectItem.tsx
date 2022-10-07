import React, { useContext } from "react";
import { IProject } from "../../../models/IProject";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { store } = useContext(Context);

  const color = project.closed ? "text-violet-600" : "text-green-600";
  return (
    <li
      className={`my-1 mr-0 flex h-full w-full gap-4 rounded-xl border-r-0  p-3 text-left font-bold text-gray-600 hover:bg-white focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800  dark:focus:ring-gray-800
          ${project.id === store.currentProject.id ? "bg-white" : ""}
      `}
      role="button"
      onClick={() => {
        store.setCurrentProject(project);
      }}
    >
      <div className={color}>
        <FontAwesomeIcon icon={faCircleDot} />
      </div>
      <div>{project.title}</div>
    </li>
  );
};

export default observer(ProjectItem);
