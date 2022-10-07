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
      <div className="relative flex w-full flex-col">
        <div className="z-10 drop-shadow-pop">
          <ModalSelection isOpen={modalOpen} onClose={handleModalClose} />
        </div>
        <div className={"h-full w-full" + (modalOpen ? " blur-sm" : "")}>
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
