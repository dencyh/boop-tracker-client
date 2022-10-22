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
    store.getViewers();
  }, [id]);
  const [allUsers, setAllUsers] = useState([{ name: "1", id: "1" }]);
  const [viewers, setViewers] = useState([{ name: "1", id: "1" }]);

  useEffect(() => {
    console.log(store.project);
  }, [store.project]);

  useEffect(() => {
    store.project.id
      ? setAllUsers(
          store.users.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id.toString()
          }))
        )
      : "";
    store.project.id
      ? setViewers(
          store.project.viewers.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id.toString()
          }))
        )
      : "";
  }, [store.project, store.users]);

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/bugs", { replace: true });
  };

  const handleDeleteModal = () => {
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

  const onChange = (e) => {
    const ids = e.map((option) => option.id);
    const newViewers = store.users
      .filter((user) => ids.includes(user.id.toString()))
      .concat(store.user);

    console.log(newViewers);
    store.updateProject({
      projectId: store.project.id,
      option: "viewers",
      newValue: newViewers
    });
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
                {store.project?.createdBy?.id === store.user.id && (
                  <Button
                    name="Delete"
                    color="bg-red-400 hover:bg-red-500"
                    onClick={() => handleDeleteModal()}
                  />
                )}
                <div className="w-80">
                  <Multiselect
                    options={allUsers} // Options to display in the dropdown
                    selectedValues={viewers} // Preselected value to persist in dropdown
                    onSelect={(e) => onChange(e)} // Function will trigger on select event
                    onRemove={(e) => onChange(e)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
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
