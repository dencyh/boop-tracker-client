import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../..";
import Textarea from "../../inputs/textarea";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Bug = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  console.log(typeof id);

  useEffect(() => {
    store.getBug(Number(id));
  }, []);

  useEffect(() => {
    console.log(store.bug);
  }, [store.bug]);
  return (
    <div className="p-4">
      <h4 className="text-sm text-gray-500">
        Created at {dayjs(store.bug.created_at).format("HH:mm DD-MM-YYYY")},
        last time updated {dayjs(store.bug.updated_at).fromNow()}
      </h4>
      <h3 className="mt-1 font-mono text-sm text-gray-500">
        <FontAwesomeIcon icon={faLink} />
        <span className="ml-2">Project - {store.bug.project?.title}</span>
      </h3>
      <h2 className="my-2 text-3xl">{store.bug.title}</h2>
      <p className="my-4">{store.bug.description}</p>
      <div className="mt-6 mb-2">Comments({store.bug.comments?.length}):</div>
      <ul>
        {store.bug.comments?.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default observer(Bug);
