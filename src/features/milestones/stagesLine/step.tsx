import React, { useContext, useEffect, useRef, useState } from "react";
import { IProject, IStage } from "../../../models/IProject";
import CheckButton from "../../../components/controls/checkButton";
import Circle from "./circle";
import StepButton from "./stepButton";
import StepInput from "./stepInput";
import { Context } from "../../..";
import DeleteButton from "../../../components/controls/DeleteButton";

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
  const { store } = useContext(Context);
  const [selected, setSelected] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  // const [stageName, setStageName] = useState(stage?.text || defaultText);

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

  const [inputValue, setInputValue] = useState(stage?.text || defaultText);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleEditStage = (text: string) => {
    if (!stage) return;
    store.updateStage({ text, stageId: stage.id, projectId: stage.project.id });
  };

  const handleDeleteStage = () => {
    if (!stage) return;
    store.deleteStage(stage);
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
        <div className="absolute right-10 w-fit truncate">
          {stage?.text || defaultText}
        </div>
        <Circle
          selected={selected}
          name={stageNumber.toString()}
          onClick={() => setSelected((prev) => !prev)}
        />

        <div
          className={`absolute left-12 flex w-44 -translate-x-2 items-center ${
            selected ? "visible" : "invisible"
          }`}
        >
          {!first && !last && (
            <>
              <StepInput value={inputValue} onChange={handleInput} />
              <div className="ml-1 flex">
                <CheckButton
                  onClick={() => handleEditStage(inputValue.toString())}
                />
                <DeleteButton onClick={() => handleDeleteStage()} />
              </div>
            </>
          )}
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
