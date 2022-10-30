import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Context } from "../../..";
import { IComment } from "../../../models/IBug";
import CommentForm from "./commentForm";
import CommentList from "./commentList";
import InitialsAvatar from "./initialsAvatar";

type CommentPorps = {
  comment: IComment;
  getReplies: (parentId: number) => IComment[];
};
const Comment = ({ comment, getReplies }: CommentPorps) => {
  const { store } = useContext(Context);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const firstName = comment.user.firstName;
  const lastName = comment.user.lastName;

  const childComments = getReplies(comment.id);

  const handleComment = (e, value, parentId) => {
    e.preventDefault();
    store.postComment(value, parentId);
    setIsReplying(false);
  };

  const updateComment = (e, value) => {
    e.preventDefault();
    store.updateComment(value, comment.id);
    setIsEditing(false);
  };
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <div className="h-10 w-10">
          <InitialsAvatar {...{ firstName, lastName }} />
        </div>
        <span className="font-semibold">
          {comment.user.firstName} {comment.user.lastName}
        </span>
        <span className="text-gray-500">
          &#8226;{" "}
          {comment.createdAt === comment.updatedAt
            ? dayjs(comment.updatedAt).fromNow()
            : `edited ${dayjs(comment.updatedAt).fromNow()}`}
        </span>
      </div>
      <div className="prose ml-3 mb-2 text-gray-700">
        {isEditing ? (
          <CommentForm
            {...{
              handleComment: updateComment,
              parentId: comment.id,
              initialValue: comment.text
            }}
          />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {comment.text}
          </ReactMarkdown>
        )}
      </div>
      <div className="flex gap-2 text-sm font-semibold text-slate-700">
        <button
          onClick={() => {
            setIsReplying((prev) => !prev);
            setIsEditing(false);
          }}
        >
          {isReplying ? "Cancel" : "Reply"}
        </button>
        {store.user.id === comment.user.id ? (
          <button
            onClick={() => {
              setIsReplying(false);
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        ) : (
          ""
        )}
        {/* <button>
          <FontAwesomeIcon icon={faHeartRegular} />
          <span className="text-rose-600">
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </button> */}
      </div>
      {isReplying && (
        <div className="mt-2 ml-3">
          <CommentForm {...{ handleComment, parentId: comment.id }} />
        </div>
      )}
      {childComments?.length > 0 && (
        <div className="ml-12 mt-2">
          <CommentList
            {...{
              comments: childComments,
              getReplies,
              handleComment
            }}
          />
        </div>
      )}
    </>
  );
};

export default Comment;
