import React, { useState } from "react";
import Button from "../../../components/controls/button";
import BugView from "../../../components/mainSection/bugView";
import ModalSelection from "../../../components/mainSection/modalSelection";

const Bugs = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className="relative flex flex-col w-full border-l border-gray-200">
        <ModalSelection isOpen={modalOpen} onClose={handleModalClose} />
        <div
          className={"w-full h-full " + (modalOpen ? "blur bg-gray-200" : "")}
        >
          <div className="flex items-start justify-between z-10 w-full mt-12">
            <BugView />
            <Button name="New" onClick={handleModalOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bugs;
