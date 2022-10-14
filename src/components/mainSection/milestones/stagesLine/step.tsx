import React, { useEffect, useRef, useState } from "react";
import Circle from "./circle";
import StepButton from "./stepButton";
import StepInput from "./stepInput";

const Step = ({ first, last }: { first?: boolean; last?: boolean }) => {
  const [selected, setSelected] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const name = "Devel opemnt";

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelect = (e: any) => {
      if (!divRef.current?.contains(e.target)) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleSelect);
    return () => {
      document.removeEventListener("mousedown", handleSelect);
    };
  });

  const handleInput = () => {
    console.log(123);
  };
  return (
    <div
      className="relative flex w-fit cursor-pointer flex-col items-center justify-center"
      ref={divRef}
    >
      {first ? (
        ""
      ) : (
        <div
          aria-label="add before"
          className={`mb-2 mt-1 ${selected ? "visible" : "invisible"}`}
        >
          <StepButton name="+" onClick={() => handleInput()} />
        </div>
      )}
      <div className="flex w-full items-center gap-2">
        <div className="absolute right-10 w-fit truncate">{name}</div>
        <Circle
          selected={selected}
          name={"1"}
          onClick={() => setSelected((prev) => !prev)}
        />

        <div
          className={`absolute left-12 w-32 -translate-x-2 ${
            selected ? "visible" : "invisible"
          }`}
        >
          <StepInput value={name} />
        </div>
      </div>

      {last ? (
        ""
      ) : (
        <div
          aria-label="add after"
          className={`mt-2 mb-1 ${selected ? "visible" : "invisible"}`}
        >
          <StepButton name="+" onClick={() => handleInput()} />
        </div>
      )}
    </div>
  );
};

export default Step;
