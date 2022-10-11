import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../..";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import CreationInfo from "./creationInfo";
import SimpleDropdown from "./simpleDropdown";
import { BugValues, priorityData, statusData } from "./bugModal";
import { ProjectValues } from "./projectModal";
import Multiselect from "multiselect-react-dropdown";

const Bug = () => {
  const { store } = useContext(Context);

  const initialBugValues: BugValues = {
    title: "",
    description: "",
    assignedTo: [],
    status: "open",
    priority: "medium",
    due: new Date(),
    projectId: ""
  };

  const [bugValues, setBugValues] = useState<BugValues>(initialBugValues);
  const { id } = useParams();
  const [bugData, setBugDate] = useState();
  const [assigned, setAssigned] = useState([{ name: "1", id: "1" }]);
  const [assignedTo, setAssignedTo] = useState([{ name: "1", id: "1" }]);

  useEffect(() => {
    store.getBug(Number(id));
    store.getViewers();
  }, []);

  useEffect(() => {
    store.bug.id
      ? setAssigned(
          store.users.map((item) => ({
            name: item.first_name + item.last_name,
            id: item.id
          }))
        )
      : "";
    store.bug.id
      ? setAssignedTo(
          store.bug.assigned_to.map((item) => ({
            name: item.first_name + item.last_name,
            id: item.id
          }))
        )
      : "";
  }, [store.bug]);

  useEffect(() => console.log(assigned), [assigned]);

  //   useEffect(() => {}, [store.bug]);

  const handleValues = (
    option: string | string[] | Date | undefined,
    value: keyof BugValues | keyof ProjectValues
  ) => {
    setBugValues({
      ...bugValues,
      [value]: option
    });

    if (value === "projectId") {
      store.projects.forEach((project) => {
        if (Number(project.id) === Number(option)) {
          store.setCurrentProject(project);
        }
      });
    }
  };
  return (
    <div className="w-full p-8">
      {store.bug.id && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between p-4">
            <div>
              <CreationInfo
                {...{
                  firstName: store.bug.created_by.first_name,
                  lastName: store.bug.created_by.last_name,
                  projectTitle: store.bug.project.title,
                  createdAt: store.bug.created_at,
                  updatedAt: store.bug.updated_at
                }}
              />
              <h2 className="mt-2 py-2 text-3xl font-semibold">
                {store.bug.title}
              </h2>
              <p className="py-2">{store.bug.description}</p>
            </div>
            <div className="flex w-60 flex-col items-end gap-2">
              {/* <div className="text-right">
                Assigned to:{" "}
                <div>
                  {store.bug.assigned_to
                    .map((user) => user.first_name + " " + user.last_name)
                    .join(", ")}
                </div>
              </div> */}
              {/* <CheckboxDropdown
                label="Assign to"
                name="assignedTo"
                menuItems={store.users}
                handleValues={handleValues}
              /> */}
              <div className="w-80">
                <Multiselect
                  options={assigned} // Options to display in the dropdown
                  selectedValues={assignedTo} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
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
            <div>Comments({store.bug.comments?.length}):</div>
            <ul>
              {/* <Comment /> */}
              <li>{/* <div>{parser(comment)}</div> */}</li>
              {/* {store.bug.comments?.map((comment) => (
        <li key={comment}>{parser(comment)}</li>
      ))} */}
            </ul>

            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <CreationInfo
    //     {...{
    //       firstName: store.bug.created_by.first_name,
    //       lastName: store.bug.created_by.last_name,
    //       createdAt: store.bug.created_at,
    //       updatedAt: store.bug.updated_at
    //     }}
    //   />
    //   <div>
    //     <h2>Title</h2>
    //  <ul className={styles.tags}>
    //   {tags.map((name) => (
    //     <li key={name}>
    //       <a href={`/tag/${name}`}>#{name}</a>
    //     </li>
    //   ))}
    // </ul>
    // {children && <div className={styles.content}>{children}</div>}
    // <ul className={styles.postDetails}>
    //   <li>
    //     <EyeIcon />
    //     <span>{viewsCount}</span>
    //   </li>
    //   <li>
    //     <CommentIcon />
    //     <span>{commentsCount}</span>
    //   </li>
    // </ul>
    //     <div>
    //       <FontAwesomeIcon icon={faMessage} />
    //       <span>{0}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default observer(Bug);
