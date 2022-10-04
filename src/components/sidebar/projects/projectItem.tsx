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
      className={`flex justify-between my-1 h-full w-full text-left p-3  font-bold text-gray-600 border-r-0  rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-indigo-100  dark:hover:bg-gray-800
          ${project.id === store.currentProject.id ? "bg-indigo-100" : ""}
      `}
      role="button"
      onClick={() => {
        store.setCurrentProject(project);
      }}
    >
      <div>{project.title}</div>
      <div className={color}>
        <FontAwesomeIcon icon={faCircleDot} className="mr-1" />
      </div>
    </li>
  );
};

export default observer(ProjectItem);
