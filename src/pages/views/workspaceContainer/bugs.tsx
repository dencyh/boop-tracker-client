import React, { useState } from "react";
import Button from "../../../components/controls/button";
import Modal from "../../../components/mainSection/projectModal";

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
      <div className="relative flex items-start justify-between p-4 z-10 w-full bg-white">
        <Modal isOpen={modalOpen} onClose={handleModalClose} />
        <div className="z-10 text-3xl w-96">Bugs</div>
        <Button name="New" onClick={handleModalOpen} />
      </div>
    </>
  );
};

export default Bugs;
