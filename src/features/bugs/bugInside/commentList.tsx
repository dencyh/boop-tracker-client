import React from "react";
import { IComment } from "../../../models/IBug";
import Comment from "./comment";

type CommentListPorps = {
  comments: IComment[];
  getReplies: (parentId: number) => IComment[];
};
const CommentList = ({ comments, getReplies }: CommentListPorps) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <Comment {...{ comment, getReplies }} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
