import React from "react";
import Button from "../microComponents/controls/button";
import CloseButton from "../microComponents/controls/closeButton";
import Toggle from "../microComponents/controls/toggle";
import Input from "../microComponents/inputs/input";
import Textarea from "../microComponents/inputs/textarea";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: IModal) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-16 w-2/3 m-5">
          <h2 className="text-xl">Project</h2>
          <form className="flex flex-col mx-auto">
            <CloseButton onClick={onClose} />
            <Input label="Title" />
            <Textarea label="Description" rows={5} />
            <Toggle name="Finished" />
            <div className="w-fit mt-5">
              <Button name="Create" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
