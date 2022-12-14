import React, { useContext } from "react";
import { IProject } from "../../models/IProject";
import {
  faCircleDot,
  faPenToSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useLocation, useNavigate } from "react-router-dom";

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const color = project.closed ? "text-violet-600" : "text-green-600";

  const handleEditProject = (e) => {
    e.stopPropagation();
    navigate(`/projects/${project.id}`);
  };

  const handleSetProject = () => {
    store.setCurrentProject(project);
    store.filterBugs();
    if (
      location.pathname.startsWith("/bugs") ||
      location.pathname.startsWith("/projects")
    )
      navigate("/bugs");
  };

  return (
    <li onClick={() => handleSetProject()} className="relative">
      {project.id === store.currentProject.id &&
        project.createdBy.id === store.user.id && (
          <button
            className="absolute right-6 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-lg ring-1 ring-inset ring-gray-500 hover:bg-gray-600 hover:text-white"
            onClick={(e) => handleEditProject(e)}
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
        <div className="w-2/3">{project.title}</div>
      </button>
    </li>
  );
};

export default observer(ProjectItem);
