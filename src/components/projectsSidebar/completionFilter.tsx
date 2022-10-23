import React, { useState } from "react";
import { Filters } from ".";

interface ICompletionFilter {
  filter: Filters;
  handleFilters: (filterName: string, checked: boolean) => void;
}

const CompletionFilter = ({ filter, handleFilters }: ICompletionFilter) => {
  const { name, color } = filter;

  const [focus, setFocus] = useState(false);
  const [isChecked, setIsCheck] = useState(true);
  const ringColor = color === "green" ? "ring-green-600" : "ring-violet-600";
  const ringHover =
    color === "green" ? "hover:ring-green-600" : "hover:ring-violet-600";
  const bgColor = color === "green" ? "bg-green-600" : "bg-violet-600";

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <label className="mr-1 flex items-center">
      <div
        className={`m-2 h-5 w-5 rounded-sm bg-white p-1 shadow-md outline-none hover:cursor-pointer ${
          focus ? ringColor : "ring-gray-100"
        } ring-2 ${ringHover} flex  items-center justify-center drop-shadow-sm transition-all`}
      >
        <input
          type="checkbox"
          className="hidden-checkbox"
          value={name}
          checked={isChecked}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleFilters(e.target.value, e.target.checked);
            setIsCheck(e.target.checked);
          }}
        />
        {isChecked ? (
          <span
            aria-hidden={true}
            className={`h-full w-full ${bgColor} rounded-sm transition-all`}
          ></span>
        ) : (
          ""
        )}
      </div>
      <div className="text-xs font-semibold uppercase text-slate-600">
        {name}
      </div>
    </label>
  );
};

export default CompletionFilter;
