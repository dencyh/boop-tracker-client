import React, { useEffect, useRef, useState } from "react";
import CloseButton from "../../controls/closeButton";
import { observer } from "mobx-react-lite";
import ProjectModal from "./projectModal";
import BugModal from "./bugModal";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSelection = ({ isOpen, onClose }: IModal) => {
  const activeButton = "border-b-2 border-slate-600";
  const inactiveButton = "text-slate-400";

  const [bugModal, setBugModal] = useState(true);
  const [projectModal, setProjectModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="absolute left-1/2 top-20 z-20 w-4/5 max-w-screen-lg -translate-x-1/2 rounded-xl bg-white p-12"
            ref={modalRef}
          >
            <div className="flex-between relative mb-4 flex">
              <div className="absolute -top-10 -left-10">
                <CloseButton onClick={onClose} />
              </div>
              <h2 className="text-xl font-semibold text-slate-600">
                <button
                  className={bugModal ? activeButton : inactiveButton}
                  onClick={() => {
                    setBugModal(true);
                    setProjectModal(false);
                  }}
                >
                  Bug
                </button>
                {" / "}
                <button
                  className={projectModal ? activeButton : inactiveButton}
                  onClick={() => {
                    setBugModal(false);
                    setProjectModal(true);
                  }}
                >
                  Project
                </button>
              </h2>
            </div>
            <div ref={modalRef}>
              {projectModal && <ProjectModal />}
              {bugModal && <BugModal />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(ModalSelection);
