import React from "react";
import CompletionFilter from "./completionFilter";
import { Filters } from "./projectsList";

type ProjectFiltersProps = {
  handleFilters: (filterName: string, checked: boolean) => void;
  filters: Filters[];
};
const ProjectFilters = ({ handleFilters, filters }: ProjectFiltersProps) => {
  return (
    <div className="flex items-center justify-between my-5">
      <h3 className="text-sm mr-2 text-slate-500 font-bold uppercase dark:text-white">
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
