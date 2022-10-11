import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../..";
import { IBug } from "../../../../models/IBug";

const BugLink = (bug: IBug) => {
  const { store } = useContext(Context);

  return (
    <Link to={`/bugs/${bug.id}`} onClick={() => store.getBug(Number(bug.id))}>
      <div>
        <p className="font-semibold text-gray-900">{bug.title}</p>
        <p className="text-gray-602 text-xs">{bug.description}</p>
        <p>
          <span className="mr-1">{bug.comments?.length || 0}</span>
          <FontAwesomeIcon icon={faMessage} />
        </p>
      </div>
    </Link>
  );
};

export default BugLink;
