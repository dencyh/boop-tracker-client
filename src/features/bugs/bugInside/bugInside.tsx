import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import CreationInfo from "./creationInfo";
import SimpleDropdown from "../newModal/simpleDropdown";
import { BugValues, priorityData, statusData } from "../newModal/bugModal";
import Multiselect from "multiselect-react-dropdown";
import CommentList from "./commentList";
import { IBug, IComment } from "../../../models/IBug";
import CommentForm from "./commentForm";
import CloseButton from "../../../components/controls/closeButton";
import EditableField from "../../projects/editableField";
import { IProject } from "../../../models/IProject";
import Button from "../../../components/controls/button";
import DeleteModal from "../../../components/deleteModal";

const BugInside = () => {
  const { store } = useContext(Context);

  const initialBugValues: BugValues = {
    title: "",
    description: "",
    assignedTo: [],
    status: "open",
    priority: "medium",
    due: new Date(),
    projectId: 0
  };

  const [bugValues, setBugValues] = useState<BugValues>(initialBugValues);
  const { id } = useParams();
  const [allUsers, setAllUsers] = useState([{ name: "1", id: "1" }]);
  const [assignedTo, setAssignedTo] = useState([{ name: "1", id: "1" }]);

  useEffect(() => {
    store.getBug(Number(id));
    store.getViewers();
  }, []);

  const commentByParentId = useMemo(() => {
    if (store.bug?.comments?.length) {
      const group = {};
      store.bug.comments.forEach((comment) => {
        group[comment.parent?.id || "root"] ||= [];
        group[comment.parent?.id || "root"].push(comment);
      });
      return group;
    } else {
      return [];
    }
  }, [store.bug?.comments]);

  const getReplies = (parentId: number): IComment[] => {
    return commentByParentId[parentId];
  };

  const [comments, setComments] = useState({
    replies: [] as IComment[],
    rootComments: [] as IComment[]
  });

  useEffect(() => {
    setComments({
      replies: [],
      rootComments: commentByParentId["root"]
    });
  }, [store.bug.comments]);

  useEffect(() => {
    store.bug.id
      ? setAllUsers(
          store.users.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id.toString()
          }))
        )
      : "";
    store.bug.id
      ? setAssignedTo(
          store.bug.assignedTo.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id.toString()
          }))
        )
      : "";
  }, [store.bug]);

  const handleValues = (
    option: keyof IBug | keyof IProject,
    value: keyof BugValues
  ) => {
    setBugValues({
      ...bugValues,
      [value]: option
    });

    store.updateBug({ field: value, newValue: option });
  };
  const handleComment = (e, value, parentId) => {
    e.preventDefault();
    store.postComment(value, parentId);
  };

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/bugs", { replace: true });
  };

  const modalBgRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleModal = (e) => {
      if (modalBgRef.current?.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleModal);
    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  });

  const handleDeleteModal = () => {
    setModalOpen(true);
  };

  const deleteAction = () => {
    setModalOpen(false);
    store.deleteBug(store.bug.id);
    navigate("/bugs", { replace: true });
  };

  const onChange = (e) => {
    const ids = e.map((option) => option.id);
    const assingedUsers = store.users.filter((user) => {
      return ids.includes(user.id.toString());
    });
    console.log(assingedUsers);
    store.updateBug({ field: "assignedTo", newValue: assingedUsers });
  };

  return (
    <div className="relative h-screen w-full overflow-auto p-8">
      {store.bug.id && (
        <div
          className={`flex flex-col gap-4 ${modalOpen ? "blur" : ""}`}
          ref={modalBgRef}
        >
          <CloseButton onClick={onClose} />
          <div className="flex justify-between rounded-md border-b-2 p-4">
            <div>
              <CreationInfo
                {...{
                  firstName: store.bug.createdBy.firstName,
                  lastName: store.bug.createdBy.lastName,
                  projectTitle: store.bug.project.title,
                  createdAt: store.bug.createdAt,
                  updatedAt: store.bug.updatedAt
                }}
              />
              <h2 className="mt-2 py-2 text-3xl font-semibold">
                <EditableField
                  text={store.bug.title}
                  valueName="title"
                  entityName="bug"
                />
              </h2>
              <div className="py-2">
                <EditableField
                  text={store.bug.description}
                  valueName="description"
                  entityName="bug"
                />
              </div>
            </div>
            <div className="relative flex w-60 flex-col items-end gap-2">
              <div className="absolute -top-12">
                {store.bug?.createdBy?.id === store.user.id && (
                  <Button
                    name="Delete"
                    color="bg-red-400 hover:bg-red-500"
                    onClick={() => handleDeleteModal()}
                  />
                )}
              </div>
              <div className="w-80">
                <Multiselect
                  options={allUsers} // Options to display in the dropdown
                  selectedValues={assignedTo} // Preselected value to persist in dropdown
                  onSelect={(e) => onChange(e)} // Function will trigger on select event
                  onRemove={(e) => onChange(e)} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>

              <SimpleDropdown
                label={store.bug.status.toUpperCase()}
                name="status"
                menuItems={statusData}
                handleValues={handleValues}
              />
              <SimpleDropdown
                label={store.bug.priority.toUpperCase()}
                name="priority"
                menuItems={priorityData}
                handleValues={handleValues}
              />
            </div>
          </div>

          <div>
            <div className="mb-6">Comments({store.bug.comments?.length}):</div>
            <ul>
              {comments.rootComments?.length > 0 && (
                <CommentList
                  {...{
                    comments: comments.rootComments,
                    getReplies
                  }}
                />
              )}
            </ul>
          </div>

          <CommentForm handleComment={handleComment} />
        </div>
      )}
      {modalOpen && (
        <div className="absolute top-1/2 left-1/2 z-40 m-0 w-1/2 -translate-y-1/2 -translate-x-1/2">
          <DeleteModal deleteAction={deleteAction} entity={store.bug} />
        </div>
      )}
    </div>
  );
};

export default observer(BugInside);
