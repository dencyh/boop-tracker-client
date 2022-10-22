import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Input from "./inputs/input";
import Button from "./controls/button";
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
    console.log(entity.title === value);
  };

  useEffect(() => {
    setButtonActive(entity.title === value);
  }, [value]);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (entity.title === value) {
      console.log("action");
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

      <Button
        name="Delete permanently"
        color={`font-bold ring-inset ring-2 ring-red-600  focus:ring-red-600 focus:ring-2 hover:bg-white ${
          buttonActive ? activeClass : disabledClass
        }`}
        disabled={buttonActive ? false : true}
      />
    </form>
  );
};

export default observer(DeleteModal);
