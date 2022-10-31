import React, { useContext, useEffect, useState } from "react";
import ProjectFilters from "./projectFilters";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import ProjectItem from "./projectItem";
import HideArrowButton from "./hideButton";
import { IProject } from "../../models/IProject";
import Search from "../../features/bugs/newModal/search";
import { useLocation, useNavigate } from "react-router-dom";

export interface Filters {
  name: keyof selectedFilter;
  color: string;
}

type selectedFilter = { open: boolean; closed: boolean };

const ProjectsList = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
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
    ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
    return result;
  };

  useEffect(() => {
    store.setFilteredProjects(
      filterProjects(store.projects, selectedFilter) as IProject[]
    );

    if (!store.filteredProjects.includes(store.currentProject)) {
      store.setCurrentProject({} as IProject);
    }
  }, [selectedFilter, store.projects, query]);

  const handleFilters = (filterName: string, checked: boolean) => {
    setSelectedFilter({ ...selectedFilter, [filterName]: checked });
  };

  const resetCurrentProject = () => {
    store.setCurrentProject({} as IProject);
    store.filterBugs();
    if (
      location.pathname.startsWith("/bugs") ||
      location.pathname.startsWith("/projects")
    )
      navigate("/bugs");
  };

  const handleSearch = ({ value }) => {
    setQuery(value);
  };

  return (
    <div
      className={`${
        isHidden ? "w-0" : "w-310px xl:w-80"
      } drop-shadow-green-outline relative z-20 flex h-screen shrink-0 flex-col border-gray-700 bg-[#ebe5e4] duration-200 dark:border-l dark:bg-gray-800`}
      tabIndex={-1}
    >
      {isHidden ? (
        ""
      ) : (
        <div className={`${isHidden ? "scale-0" : "scale-100"} duration-300`}>
          <div className="mt-4 px-4">
            <div className="py-2.5">
              <Search
                label=""
                name="projectSearch"
                placeholder="Search"
                handleChange={handleSearch}
              />
            </div>
            <ProjectFilters handleFilters={handleFilters} filters={filters} />
          </div>
          <button
            className={`ml-4 w-full rounded-l-2xl p-4 pr-0 text-left text-lg font-bold hover:bg-white ${
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
        </div>
      )}
      <div className="absolute top-1/2 right-0">
        <HideArrowButton onClick={handleHide} isHidden={isHidden} />
      </div>
    </div>
  );
};

export default observer(ProjectsList);
