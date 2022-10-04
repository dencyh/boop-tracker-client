import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import SearchBar from "./seachBar";
// eslint-disable-next-line import/namespace, import/default
import ProjectFilters from "./projectFilters";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import ProjectItem from "./projectItem";
import HideButton from "./hideButton";
import { IProject } from "../../../models/IProject";

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
    if (filter === null) return [];
    return projectsArr.filter(
      (project) =>
        (project.closed && selectedFilter.closed) ||
        (!project.closed && selectedFilter.open)
    );
  };

  let filteredProjects = filterProjects(store.projects, selectedFilter);

  useEffect(() => {
    console.log({ ...store.currentProject });
    filteredProjects = filterProjects(store.projects, selectedFilter);
  }, [selectedFilter, store.projects]);

  const handleFilters = (filterName: string, checked: boolean) => {
    setSelectedFilter({ ...selectedFilter, [filterName]: checked });
  };

  const resetCurrentProject = () => {
    store.setCurrentProject({} as IProject);
  };

  return (
    <div
      className="w-310px z-20 drop-shadow-green-outline flex flex-col shrink-0 xl:w-80 bg-gray-100 dark:bg-gray-800 dark:border-l border-gray-700 h-screen"
      tabIndex={-1}
    >
      <div className="px-4 mt-4">
        <div className="py-2.5">
          <SearchBar />
        </div>
        <ProjectFilters handleFilters={handleFilters} filters={filters} />
      </div>
      <h3
        role="button"
        className={`font-bold text-lg mx-4 p-4 rounded-2xl hover:bg-indigo-100 ${
          !store.currentProject.id ? "bg-indigo-100" : ""
        }`}
        onClick={resetCurrentProject}
      >
        All Project
      </h3>
      <ul className="project-list flex flex-col ml-6 px-4 overflow-auto">
        {filteredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
      <HideButton handleHide={handleHide} isHidden={isHidden} />
    </div>
  );
};

export default observer(ProjectsList);
