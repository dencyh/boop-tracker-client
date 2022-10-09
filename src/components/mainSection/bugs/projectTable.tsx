import React, { useContext } from "react";
import { IProject } from "../../../models/IProject";
import { statusPriorityColors as statusBgColors } from "../../../data/statusBgColors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IBug } from "../../../models/IBug";
import { Link } from "react-router-dom";
import { Context } from "../../..";
dayjs.extend(relativeTime);

const ProjectTable = (project: IProject) => {
  const { store } = useContext(Context);
  return (
    <table className="mb-12 min-w-full border-b-2 pb-2 leading-normal">
      <thead className="text-left">
        <tr>
          <th>{project.title}</th>
        </tr>
      </thead>
      <tbody>
        {project.bugs.map((bug: IBug) => (
          <tr key={bug.id} className="border-b-2 text-sm">
            <td className="w-4/12 py-2 px-2">
              <Link to={`/bugs/${bug.id}`}>
                <div className="ml-3 mb-4">
                  <p className="text-gray-900">{bug.title}</p>
                  <p className="text-xs text-gray-600">{bug.description}</p>
                </div>
              </Link>
            </td>
            <td className="w-1/12 px-2">
              <span
                className={`mr-2 rounded-xl ${
                  statusBgColors[bug.status]
                } px-2.5 py-1 font-medium text-white dark:bg-gray-700 dark:text-gray-300 `}
              >
                {bug.status}
              </span>
            </td>
            <td className="w-1/12 px-2">
              <span
                className={`mr-2 rounded-xl ${
                  statusBgColors[bug.priority]
                } px-2.5 py-1 font-medium text-white dark:bg-gray-700 dark:text-gray-300`}
              >
                {bug.priority}
              </span>
            </td>
            <td className="w-2/12 px-2">
              <p className="text-gray-900">
                {dayjs(bug.created_at).format("DD/MM/YYYY")}
              </p>
            </td>
            <td className="w-2/12 px-2">
              <p className="text-gray-600">
                {dayjs(bug.due).format("DD/MM HH:mm")}
              </p>
              <p className="text-gray-600">{dayjs(bug.due).fromNow()}</p>
            </td>
            <td className="w-2/12 px-2">
              <h5>{bug.created_by.first_name}</h5>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
