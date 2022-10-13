import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Context } from "../../../..";
import { IComment } from "../../../../models/IBug";
import CommentForm from "./commentForm";
import CommentList from "./commentList";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import InitialsAvatar from "./initialsAvatar";

type CommentPorps = {
  comment: IComment;
  getReplies: (parentId: string) => IComment[];
};
const Comment = ({ comment, getReplies }: CommentPorps) => {
  const { store } = useContext(Context);
  const [isReplying, setIsReplying] = useState(false);
  const firstName = comment.user.firstName;
  const lastName = comment.user.lastName;

  const childComments = getReplies(comment.id);

  const handleComment = (e, value, parentId) => {
    e.preventDefault();
    store.postComment(value, parentId);
    setIsReplying(false);
  };
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <span>
          <InitialsAvatar {...{ firstName, lastName }} />
        </span>
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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {comment.text}
        </ReactMarkdown>
        {comment.id} - {comment.parent?.id}
      </div>
      <div className="flex gap-2 text-sm font-semibold text-slate-700">
        <button onClick={() => setIsReplying((prev) => !prev)}>
          {isReplying ? "Cancel" : "Reply"}
        </button>
        <button>Edit</button>
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
