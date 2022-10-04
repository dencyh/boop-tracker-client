import React, { FormEvent, useContext, useEffect, useState } from "react";
import CloseButton from "../controls/closeButton";
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

  return (
    <>
      {isOpen && (
        <>
          <div className="absolute left-1/2 -translate-x-1/2 top-20 max-w-screen-lg w-4/5 z-20 p-12 bg-white rounded-xl">
            <div className="relative flex flex-between mb-4">
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
            {projectModal && <ProjectModal />}
            {bugModal && <BugModal />}
          </div>
        </>
      )}
    </>
  );
};

export default observer(ModalSelection);
