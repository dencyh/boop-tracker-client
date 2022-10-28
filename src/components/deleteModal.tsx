import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "./inputs/input";
import { IProject } from "../models/IProject";
import { IBug } from "../models/IBug";

type DeleteModalProps = {
  deleteAction: () => void;
  entity: IProject | IBug;
};

const DeleteModal = ({ deleteAction, entity }: DeleteModalProps) => {
  const [buttonActive, setButtonActive] = useState(false);
  const disabledClass = "ring-red-300 text-red-400 disabled cursor-not-allowed";
  const activeClass = "text-white bg-red-500 hover:bg-red-600";

  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
  };

  useEffect(() => {
    setButtonActive(entity.title === value);
  }, [value]);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (entity.title === value) {
      deleteAction();
    }
  };

  return (
    <form
      className="flex h-fit flex-col justify-between rounded-xl bg-white p-12 py-8 drop-shadow-pop"
      onSubmit={handleSumbit}
    >
      <p>
        This will permanently delete{" "}
        <span className="font-bold">{entity.title}</span> project, all related
        bugs, comments and stages.
      </p>
      <p>
        Please type <span className="font-bold">{entity.title}</span> to
        confirm.
      </p>
      <div className="my-4">
        <Input label="" onChange={onChange} value={value} />
      </div>

      <button
        className={`mr-2 mb-2 w-fit rounded-lg  px-5 py-2.5 text-sm font-bold text-white ring-2 ring-inset ring-red-600  focus:outline-none  focus:ring-2  focus:ring-red-600  ${
          buttonActive ? activeClass : disabledClass
        }`}
        disabled={buttonActive ? false : true}
      >
        Delete permanently
      </button>
    </form>
  );
};

export default observer(DeleteModal);
