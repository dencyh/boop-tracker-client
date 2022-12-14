import React, { useContext, useEffect, useRef, useState } from "react";
import CloseButton from "../../../components/controls/closeButton";
import { observer } from "mobx-react-lite";
import ProjectModal from "./projectModal";
import BugModal from "./bugModal";
import { Context } from "../../..";
import Loader from "../../../components/loader";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSelection = ({ isOpen, onClose }: IModal) => {
  const { store } = useContext(Context);
  const activeButton = "border-b-2 border-slate-600";
  const inactiveButton = "text-slate-400";

  const [bugModal, setBugModal] = useState(true);
  const [projectModal, setProjectModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.getViewers();
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="absolute left-1/2 top-20 z-20 w-4/5 max-w-screen-lg -translate-x-1/2 rounded-xl bg-white p-12"
            ref={modalRef}
          >
            {store.isLoading && (
              <div className="absolute top-6 right-12 z-40 flex items-center justify-center text-white">
                <Loader noText />
              </div>
            )}
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
            <div ref={modalRef} className="relative">
              {projectModal && <ProjectModal onClose={onClose} />}
              {bugModal && <BugModal onClose={onClose} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(ModalSelection);
