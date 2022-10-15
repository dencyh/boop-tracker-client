import React, { useState } from "react";

const StepInput = ({ initValue }: { initValue: string }) => {
  const [value, setValue] = useState(initValue);
  return (
    <form className=" w-full rounded-lg border border-indigo-600">
      <input
        className="w-full rounded-lg p-1 text-sm font-bold text-gray-600"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default StepInput;
