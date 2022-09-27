import React from "react";
import Button from "../controls/button";
import CloseButton from "../controls/closeButton";
import Toggle from "../controls/toggle";

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
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-gray-400">
              Title
              <input
                type="text"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Project name..."
              />
            </label>
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-gray-400">
              Description
              <textarea
                rows={4}
                className="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Project description..."
              ></textarea>
            </label>
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
