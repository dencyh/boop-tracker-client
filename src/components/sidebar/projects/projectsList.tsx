import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./seachBar";
import ProjectFilters from "./projectFilters";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import ProjectItem from "./projectItem";
import HideArrowButton from "./hideButton";
import { IProject } from "../../../models/IProject";
import { Link } from "react-router-dom";

export interface Filters {
  name: keyof selectedFilter;
  color: string;
}

type selectedFilter = { open: boolean; closed: boolean };

const ProjectsList = () => {
  const { store } = useContext(Context);
  const filters: Filters[] = [
    {
      name: "open",
      color: "green"
    },
    {
      name: "closed",
      color: "violet"
    }
  ];
  const [selectedFilter, setSelectedFilter] = useState<selectedFilter>({
    open: true,
    closed: true
  });

  useEffect(() => {
    store.getUserProjects();
  }, []);

  const [isHidden, setIsHidden] = useState(false);
  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  const filterProjects = (projectsArr: IProject[], filter: selectedFilter) => {
    if (filter === null) {
      store.setCurrentProject({} as IProject);
      store.setFilteredProjects([]);
      return;
    }

    const result = [
      ...projectsArr.filter(
        (project) =>
          (project.closed && selectedFilter.closed) ||
          (!project.closed && selectedFilter.open)
      )
    ];
    return result;
  };

  useEffect(() => {
    // On load
    store.setFilteredProjects(
      filterProjects(store.projects, selectedFilter) as IProject[]
    );

    if (!store.filteredProjects.includes(store.currentProject)) {
      store.setCurrentProject({} as IProject);
    }
  }, [selectedFilter, store.projects]);

  const handleFilters = (filterName: string, checked: boolean) => {
    setSelectedFilter({ ...selectedFilter, [filterName]: checked });
  };

  const resetCurrentProject = () => {
    store.setCurrentProject({} as IProject);
  };

  return (
    <div
      className="drop-shadow-green-outline z-20 flex h-screen w-310px shrink-0 flex-col border-gray-700 bg-[#ebe5e4] dark:border-l dark:bg-gray-800 xl:w-80"
      tabIndex={-1}
    >
      <div className="mt-4 px-4">
        <div className="py-2.5">
          <SearchBar />
        </div>
        <ProjectFilters handleFilters={handleFilters} filters={filters} />
      </div>
      <button
        className={`ml-4 rounded-l-2xl p-4 pr-0 text-left text-lg font-bold hover:bg-white ${
          !store.currentProject.id ? "bg-white" : ""
        }`}
        onClick={resetCurrentProject}
      >
        All Project
      </button>
      <ul className="project-list ml-6 flex flex-col overflow-auto pl-4">
        {store.filteredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
      <HideArrowButton handleHide={handleHide} isHidden={isHidden} />
    </div>
  );
};

export default observer(ProjectsList);
