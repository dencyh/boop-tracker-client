import React, { useState } from "react";
import Button from "../../../components/controls/button";
import BugView from "../../../components/mainSection/bugs/bugView";
import ModalSelection from "../../../components/mainSection/bugs/modalSelection";

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
        <div className="123">
          <ModalSelection isOpen={modalOpen} onClose={handleModalClose} />
        </div>
        <div
          className={
            "w-full h-full " + (modalOpen ? "blur-sm bg-gray-200" : "")
          }
        >
          <div className="m-12">
            <BugView />
            <div className="absolute right-12 top-12">
              <Button name="New" onClick={handleModalOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bugs;
