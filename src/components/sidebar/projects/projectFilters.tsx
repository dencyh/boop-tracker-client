import React, { useState } from "react";
import CompletionFilter from "./completionFilters";

interface IProjectFilters {
  open: boolean;
  closed: boolean;
}

const ProjectFilters = () => {
  const [checked, setChecked] = useState<IProjectFilters>({
    open: true,
    closed: true
  });

  const handleCheck = (value: "open" | "closed"): void => {
    setChecked((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  return (
    <div className="flex items-center justify-between my-5">
      <h3 className="text-sm mr-2 text-slate-500 font-bold uppercase dark:text-white">
        Projects
      </h3>
      <div className="flex">
        <CompletionFilter
          value="open"
          checked={checked.open}
          onCheck={handleCheck}
        />
        <CompletionFilter
          value="closed"
          checked={checked.closed}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
