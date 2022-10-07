import React from "react";
import CompletionFilter from "./completionFilter";
import { Filters } from "./projectsList";

type ProjectFiltersProps = {
  handleFilters: (filterName: string, checked: boolean) => void;
  filters: Filters[];
};
const ProjectFilters = ({ handleFilters, filters }: ProjectFiltersProps) => {
  return (
    <div className="my-5 flex items-center justify-between">
      <h3 className="mr-2 text-sm font-bold uppercase text-slate-500 dark:text-white">
        Projects
      </h3>
      <div className="flex">
        {filters.map((filter) => (
          <CompletionFilter
            key={filter.name}
            filter={filter}
            handleFilters={handleFilters}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectFilters;
