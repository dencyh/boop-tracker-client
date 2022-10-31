import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreationInfo from "../bugs/bugInside/creationInfo";
import { Context } from "../..";
import CloseButton from "../../components/controls/closeButton";
import EditableField from "./editableField";
import Loader from "../../components/loader";
import Button from "../../components/controls/button";
import DeleteModal from "../../components/deleteModal";
import MultiSelect, {
  ReactSelectOption
} from "../../components/inputs/multiSelect";
import Toggle from "../../components/inputs/toggle";
import { IProject } from "../../models/IProject";

const ProjectView = () => {
  const { store } = useContext(Context);

  const { id } = useParams();

  useEffect(() => {
    store.getProjectById(Number(id));
    store.getViewers();
  }, [id]);
  const [allUsers, setAllUsers] = useState<ReactSelectOption[]>([]);
  const [viewers, setViewers] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    store.project.id
      ? setAllUsers(
          store.users.map((item) => ({
            label: item.firstName + " " + item.lastName,
            value: item.id.toString()
          }))
        )
      : "";
    store.project.id
      ? setViewers(
          store.project.viewers.map((item) => ({
            label: item.firstName + " " + item.lastName,
            value: item.id.toString()
          }))
        )
      : "";

    setProjectClosed(store.project.closed);
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

  const handleChange = ({ name, value }: { name: string; value }) => {
    if (name === "viewers") {
      const ids = value.map((item) => item.value);
      setViewers(value);
      const newViewers = store.users
        .filter((user) => ids.includes(user.id.toString()))
        .concat(store.user);

      store.updateProject({
        projectId: store.project.id,
        key: name as keyof IProject,
        newValue: newViewers
      });
    } else if (name === "closed") {
      setProjectClosed(value);
      store.updateProject({
        projectId: store.project.id,
        key: name as keyof IProject,
        newValue: value
      });
    }
  };

  const [projectClosed, setProjectClosed] = useState(
    store.project.closed || false
  );

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
            {store.isLoading && (
              <div className="absolute right-12">
                <Loader noText={true} />
              </div>
            )}
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
                    name="title"
                    entityName="project"
                  />
                </div>
                <div className="py-2">
                  <EditableField
                    text={`Description: ${store.project.description}`}
                    name="description"
                    entityName="project"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <h3>Closed:</h3>
                  <Toggle
                    handleChange={handleChange}
                    name="closed"
                    checked={projectClosed}
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
                <div className="w-4/5 2xl:w-80">
                  <h3>Viewers:</h3>
                  <div>
                    <MultiSelect
                      name="viewers"
                      options={allUsers}
                      value={viewers}
                      handleChange={handleChange}
                    />
                  </div>
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
