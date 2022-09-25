import React, { useState } from "react";
import CompletionFilter from "./completionFilters";

const ProjectFilters = () => {
  const [checked, setChecked] = useState("radio2");
  const isRadioChecked = (value: string): boolean => checked === value;
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(e.currentTarget.value);
    console.log(checked);
  };
  return (
    <div className="flex items-center mr-4 m-5">
      <input
        className="w-4 h-4 text-green-600 accent-red-600"
        type="radio"
        name="radio"
        value="radio1"
        checked={isRadioChecked("radio1")}
        onChange={handleRadio}
      />
      <input
        className="w-4 h-4 text-green-600 accent-green-600 "
        type="radio"
        name="radio"
        value="radio2"
        checked={isRadioChecked("radio2")}
        onChange={handleRadio}
      />
      <CompletionFilter completed={false} />
      <CompletionFilter completed={true} />
    </div>
  );
};

export default ProjectFilters;
