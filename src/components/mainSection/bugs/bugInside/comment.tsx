import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IComment } from "../../../../models/IBug";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import InitialsAvatar from "./initialsAvatar";

const Comment = (comment: IComment) => {
  const firstName = comment.user.first_name;
  const lastName = comment.user.last_name;
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <span>
          <InitialsAvatar {...{ firstName, lastName }} />
        </span>
        <span className="font-semibold">
          {comment.user.first_name} {comment.user.last_name}
        </span>
        <span className="text-gray-500">
          &#8226; {dayjs(comment.updated_at).fromNow()}
        </span>
      </div>
      <div className="prose mb-2 text-gray-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {comment.text}
        </ReactMarkdown>
      </div>
      <div className="flex gap-2 text-sm font-semibold text-slate-700">
        <button>Reply</button>
        <button>Edit</button>
        {/* <button>
          <FontAwesomeIcon icon={faHeartRegular} />
          <span className="text-rose-600">
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </button> */}
      </div>
    </>
  );
};

export default Comment;
