import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../..";
import CreationInfo from "./creationInfo";
import SimpleDropdown from "../modal/simpleDropdown";
import { BugValues, priorityData, statusData } from "../modal/bugModal";
import { ProjectValues } from "../modal/projectModal";
import Multiselect from "multiselect-react-dropdown";
import Comment from "./comment";
import Textarea from "../../../inputs/textarea";
import Button from "../../../controls/button";

const BugInside = () => {
  const { store } = useContext(Context);

  const onChange = ({ currentTarget: { value } }) => {
    setMarkdownSource(value);
  };
  const [markdownSource, setMarkdownSource] = useState("");

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
  const [allUsers, setAllUsers] = useState([{ name: "1", id: "1" }]);
  const [assignedTo, setAssignedTo] = useState([{ name: "1", id: "1" }]);

  useEffect(() => {
    store.getBug(Number(id));
    store.getViewers();
  }, []);

  useEffect(() => {
    store.bug.id
      ? setAllUsers(
          store.users.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id
          }))
        )
      : "";
    store.bug.id
      ? setAssignedTo(
          store.bug.assignedTo.map((item) => ({
            name: item.firstName + " " + item.lastName,
            id: item.id
          }))
        )
      : "";
  }, [store.bug]);

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
  const handleComment = (text: string) => {
    store.postComment(text);
    setMarkdownSource("");
  };
  return (
    <div className="h-screen w-full overflow-auto p-8">
      {store.bug.id && (
        <div className="flex flex-col gap-4">
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
                {store.bug.title}
              </h2>
              <p className="py-2">{store.bug.description}</p>
            </div>
            <div className="flex w-60 flex-col items-end gap-2">
              <div className="w-80">
                <Multiselect
                  options={allUsers} // Options to display in the dropdown
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
            <div className="mb-6">Comments({store.bug.comments?.length}):</div>
            <ul>
              {store.bug.comments?.map((comment) => (
                <li key={comment.id} className="mb-8">
                  <Comment {...comment} />
                </li>
              ))}
            </ul>

            <div>
              <Textarea rows={5} onChange={onChange} value={markdownSource} />
              <Button
                name="Send"
                onClick={() => handleComment(markdownSource)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(BugInside);
