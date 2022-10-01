import React, { useEffect, useState } from "react";

type Value = "done" | "pending";

interface ICompletionFilter {
  value: "done" | "pending";
  checked: boolean;
  onCheck: (value: Value) => void;
}

const CompletionFilter = ({ value, checked, onCheck }: ICompletionFilter) => {
  const [focus, setFocus] = useState(false);
  const ringColor = value === "done" ? "ring-green-600" : "ring-red-600";
  const ringHover =
    value === "done" ? "hover:ring-green-600" : "hover:ring-red-600";
  const bgColor = value === "done" ? "bg-green-600" : "bg-red-600";

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <label
      className={`m-2 w-5 h-5 bg-white rounded-sm shadow-md p-1 hover:cursor-pointer outline-none ${
        focus ? ringColor : "ring-gray-100"
      } ring-2 ${ringHover} drop-shadow-sm  flex justify-center items-center transition-all`}
    >
      <input
        type="checkbox"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          onCheck(e.currentTarget.value as Value);
        }}
      />
      {checked ? (
        <span
          aria-hidden={true}
          className={`w-full h-full ${bgColor} rounded-sm transition-all`}
        ></span>
      ) : (
        ""
      )}
    </label>
  );
};

export default CompletionFilter;
