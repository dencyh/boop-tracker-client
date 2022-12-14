import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import CreationInfo from "./creationInfo";
import SimpleDropdown from "../newModal/simpleDropdown";
import { BugValues, priorityData, statusData } from "../newModal/bugModal";
import CommentList from "./commentList";
import { IBug, IComment } from "../../../models/IBug";
import CommentForm from "./commentForm";
import CloseButton from "../../../components/controls/closeButton";
import EditableField from "../../projects/editableField";
import Button from "../../../components/controls/button";
import DeleteModal from "../../../components/deleteModal";
import Loader from "../../../components/loader";
import MultiSelect, {
  ReactSelectOption
} from "../../../components/inputs/multiSelect";

const BugInside = () => {
  const { store } = useContext(Context);
  const { id } = useParams();

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
  const [allUsers, setAllUsers] = useState<ReactSelectOption[]>([]);
  const [assignee, setAssignee] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    store.getBug(Number(id));
    store.getViewers();
  }, [id]);

  useEffect(() => {
    store.bug.id
      ? setAllUsers(
          store.users.map((item) => ({
            label: item.firstName + " " + item.lastName,
            value: item.id.toString()
          }))
        )
      : "";
    store.bug.id
      ? setAssignee(
          store.bug.assignedTo.map((item) => ({
            label: item.firstName + " " + item.lastName,
            value: item.id.toString()
          }))
        )
      : "";
  }, [store.bug, store.users]);

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

  const handleChange = ({
    name,
    value
  }: {
    name: string;
    value: string | string[] | Date | undefined;
  }) => {
    setBugValues({ ...bugValues, [name]: value });

    store.updateBug({ key: name as keyof IBug, newValue: value });
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

  const onViewersChange = ({ name, value }: { name: string; value }) => {
    const ids = value.map((option) => option.value);
    const assingedUsers = store.users.filter((user) => {
      return ids.includes(user.id.toString());
    });
    store.updateBug({ key: name as keyof IBug, newValue: assingedUsers });
  };

  return (
    <div className="relative h-screen w-full overflow-auto p-8">
      {store.bug.id !== Number(id) ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col gap-4 ${modalOpen ? "blur" : ""}`}
          ref={modalBgRef}
        >
          {store.isLoading && (
            <div className="fixed top-6 right-6 z-40 flex items-center justify-center text-white">
              <Loader noText />
            </div>
          )}
          <div>
            <CloseButton onClick={onClose} />
            <div className="flex justify-between border-b-2 p-4">
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
                    name="title"
                    entityName="bug"
                  />
                </h2>
                <div className="py-2">
                  <EditableField
                    text={store.bug.description}
                    name="description"
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
                <div className="w-4/5 2xl:w-80">
                  <h3>Assigned to:</h3>
                  <MultiSelect
                    name="assignedTo"
                    options={allUsers}
                    value={assignee}
                    handleChange={onViewersChange}
                  />
                </div>

                <SimpleDropdown
                  label={store.bug.status.toUpperCase()}
                  name="status"
                  menuItems={statusData}
                  handleChange={handleChange}
                />
                <SimpleDropdown
                  label={store.bug.priority.toUpperCase()}
                  name="priority"
                  menuItems={priorityData}
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                Comments({store.bug.comments?.length}):
              </div>
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
