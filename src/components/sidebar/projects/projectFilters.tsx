import React, { useState } from "react";
import CompletionFilter from "./completionFilters";

interface IProjectFilters {
  done: boolean;
  pending: boolean;
}

const ProjectFilters = () => {
  const [checked, setChecked] = useState<IProjectFilters>({
    done: false,
    pending: false
  });

  const handleCheck = (value: "done" | "pending"): void => {
    setChecked((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  return (
    <div className="flex justify-between my-5">
      <h3 className="text-sm text-slate-500 font-bold uppercase dark:text-white">
        Projects
      </h3>
      <div className="flex">
        <CompletionFilter
          value="done"
          checked={checked.done}
          onCheck={handleCheck}
        />
        <CompletionFilter
          value="pending"
          checked={checked.pending}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
