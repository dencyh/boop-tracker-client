import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import SearchBar from "./seachBar";
import ProjectFilters from "./projectFilters";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import ProjectItem from "./projectItem";
import HideButton from "./hideButton";

const ProjectsList = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getUserProjects();
  }, []);

  const [isHidden, setIsHidden] = useState(false);
  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className="w-310px z-20 drop-shadow-green-outline flex flex-col shrink-0 xl:w-80 h-screen bg-gray-100 dark:bg-gray-800 dark:border-l border-gray-700"
      tabIndex={-1}
    >
      <div className="p-4">
        <div className="py-2.5">
          <SearchBar />
        </div>
        <ProjectFilters />
      </div>
      <ul className="flex flex-col pl-4">
        {store.projects.map((project) => (
          <ProjectItem key={project.id} title={project.title} />
        ))}
      </ul>
      <HideButton handleHide={handleHide} isHidden={isHidden} />
    </div>
  );
};

export default observer(ProjectsList);
