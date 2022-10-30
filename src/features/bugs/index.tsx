import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/controls/button";
import BugView from "./projectList";
import ModalSelection from "./newModal";

const Bugs = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const modalBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleModal = (e: any) => {
      if (modalBgRef.current?.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleModal);
    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  });

  return (
    <>
      <div className="relative flex h-screen w-full flex-col overflow-auto">
        <div className="z-10 drop-shadow-pop">
          <ModalSelection isOpen={modalOpen} onClose={handleModalClose} />
        </div>
        <div
          ref={modalBgRef}
          className={"h-full w-full" + (modalOpen ? " blur" : "")}
        >
          <div className="m-8 mx-12">
            <h1 className="mb-4 border-b-2 pb-6 text-2xl font-bold text-gray-600">
              Bugs
            </h1>
            <BugView />
            <div className="absolute right-12 top-8">
              <Button name="New" onClick={handleModalOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bugs;
