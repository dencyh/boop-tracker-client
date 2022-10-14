import React from "react";

const StepInput = ({ value }: { value: string }) => {
  return (
    <form className=" w-full rounded-lg border border-indigo-600">
      <input
        className="w-full rounded-lg p-1 text-sm font-bold text-gray-600"
        value={value}
      />
    </form>
  );
};

export default StepInput;
