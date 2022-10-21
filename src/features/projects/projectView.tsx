import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import CreationInfo from "../bugs/bugInside/creationInfo";
import { Context } from "../..";
import CloseButton from "../../components/controls/closeButton";
import { IComment } from "../../models/IBug";
import { BugValues } from "../bugs/newModal/bugModal";
import EditableField from "./editableField";
import Loader from "../../components/misc/loader";

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
  const handleComment = (e, value, parentId) => {
    e.preventDefault();
    store.postComment(value, parentId);
  };

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/bugs", { replace: true });
  };

  return (
    <div className="h-screen w-full overflow-auto p-8">
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
              <h2 className="mt-2 py-2 text-3xl font-semibold">
                <EditableField text={store.project.title} />
              </h2>
              <p className="py-2">
                <EditableField
                  text={`Description: ${store.project.description}`}
                />
              </p>
            </div>
            <div className="flex w-60 flex-col items-end gap-2">
              <div className="w-80">
                {/* <Multiselect
                options={allUsers} // Options to display in the dropdown
                selectedValues={assignedTo} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProjectView);
