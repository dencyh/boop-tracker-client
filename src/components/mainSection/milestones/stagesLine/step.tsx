import React, { useEffect, useRef, useState } from "react";
import { IProject, IStage } from "../../../../models/IProject";
import CheckButton from "../../../controls/checkButton";
import Circle from "./circle";
import StepButton from "./stepButton";
import StepInput from "./stepInput";

const Step = ({
  stage,
  first = false,
  last = false,
  stageNumber,
  defaultText,
  handleAddStage
}: {
  stage?: IStage;
  first?: boolean;
  last?: boolean;
  stageNumber: number;
  defaultText: string;
  handleAddStage: (stageNumber: number, order: "next" | "prev") => void;
}) => {
  const [selected, setSelected] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [stageName, setStageName] = useState(stage?.id || defaultText);

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

  const [inputValue, setInputValue] = useState(stageName);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setStageName(inputValue);
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
          <StepButton
            name="+"
            onClick={() => handleAddStage(stageNumber, "prev")}
          />
        </div>
      )}
      <div className="flex w-full items-center gap-2">
        <div className="absolute right-10 w-fit truncate">{stageName}</div>
        <Circle
          selected={selected}
          name={stageNumber.toString()}
          onClick={() => setSelected((prev) => !prev)}
        />

        <div
          className={`absolute left-12 flex w-32 -translate-x-2 items-center ${
            selected ? "visible" : "invisible"
          }`}
        >
          <StepInput value={inputValue} onChange={handleInput} />
          <div className="ml-1">
            <CheckButton onClick={handleConfirm} />
          </div>
        </div>
      </div>

      {last ? (
        ""
      ) : (
        <div
          aria-label="add after"
          className={`mt-2 mb-1 ${selected ? "visible" : "invisible"}`}
        >
          <StepButton
            name="+"
            onClick={() => handleAddStage(stageNumber, first ? "prev" : "next")}
          />
        </div>
      )}
    </div>
  );
};

export default Step;
