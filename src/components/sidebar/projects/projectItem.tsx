import React from "react";
import { IProject } from "../../../models/IProject";

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <li className="flex justify-start w-full my-1">
      <button className="h-full w-full text-left p-5 bg-white font-medium text-gray-500 border border-r-0 border-gray-200 rounded-l-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
        {project.title} {String(project.closed)}
      </button>
    </li>
  );
};

export default ProjectItem;
