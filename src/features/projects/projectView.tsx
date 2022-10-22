import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import CreationInfo from "../bugs/bugInside/creationInfo";
import { Context } from "../..";
import CloseButton from "../../components/controls/closeButton";
import { IComment } from "../../models/IBug";
import { BugValues } from "../bugs/newModal/bugModal";
import EditableField from "./editableField";
import Loader from "../../components/misc/loader";
import EditForm from "./editForm";
import Button from "../../components/controls/button";
import DeleteModal from "../../components/deleteModal";

const ProjectView = () => {
  const { store } = useContext(Context);

  const { id } = useParams();

  useEffect(() => {
    store.getProjectById(Number(id));
  }, [id]);

  //   const handleValues = (
  //     option: string | string[] | Date | undefined,
  //     value: keyof BugValues
  //   ) => {
  //     setBugValues({
  //       ...bugValues,
  //       [value]: option
  //     });

  //     store.updateBug(value, option);
  //   };
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/bugs", { replace: true });
  };

  const handleDeleModal = () => {
    setModalOpen(true);
  };

  const modalBgRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const deleteAction = () => {
    setModalOpen(false);
    store.deleteProject(store.project.id);
    navigate("/bugs", { replace: true });
  };

  return (
    <>
      <div
        className={`h-screen w-full overflow-auto p-8 ${
          modalOpen ? "blur" : ""
        }`}
        ref={modalBgRef}
      >
        {!store.project?.createdBy?.firstName ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4">
            <CloseButton onClick={onClose} />
            <div className="flex justify-between rounded-md border-b-2 p-4">
              <div>
                <CreationInfo
                  {...{
                    firstName: store.project.createdBy.firstName,
                    lastName: store.project.createdBy.lastName,
                    createdAt: store.project.createdAt,
                    updatedAt: store.project.updatedAt
                  }}
                />
                <div className="mt-2 py-2 text-3xl font-semibold">
                  <EditableField
                    text={store.project.title}
                    valueName="title"
                    entityName="project"
                  />
                </div>
                <div className="py-2">
                  <EditableField
                    text={`Description: ${store.project.description}`}
                    valueName="description"
                    entityName="project"
                  />
                </div>
              </div>
              <div className="flex w-60 flex-col items-end gap-2">
                <Button
                  name="Delete"
                  color="bg-red-400 hover:bg-red-500"
                  onClick={() => handleDeleModal()}
                />
                {/* <div className="w-80">
                <Multiselect
                  options={allUsers} // Options to display in the dropdown
                  selectedValues={assignedTo} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                /> 
              </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      {modalOpen && (
        <div className="absolute top-1/2 left-1/2 z-40 m-0 w-1/2 -translate-y-1/2 -translate-x-1/2">
          <DeleteModal deleteAction={deleteAction} entity={store.project} />
        </div>
      )}
    </>
  );
};

export default observer(ProjectView);
