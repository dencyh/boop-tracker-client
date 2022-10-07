import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import relativeTime from "dayjs/plugin/relativeTime";
import BugNumbers from "./bugNumbers";
import { IBug } from "../../../models/IBug";
dayjs.extend(relativeTime);

export interface BugStats {
  number: number;
  text: string;
  color: string;
}

const BugView = () => {
  const { store } = useContext(Context);

  const [bugStats, setBugStats] = useState({
    open: {
      number: 35,
      text: "Open bugs",
      color: "bg-green-300"
    },
    done: {
      number: 12,
      text: "Closed bugs",
      color: "bg-violet-200"
    },
    overdue: {
      number: 4,
      text: "Overdue",
      color: "bg-rose-300"
    },
    today: {
      number: 2,
      text: "Due today",
      color: "bg-lime-200"
    },
    week: {
      number: 8,
      text: "Due this week",
      color: "bg-teal-200"
    }
  });

  const checkBugTime = (bug: IBug) =>
    Math.floor(dayjs(bug.due).diff(dayjs(new Date()), "day", true));

  const reduceNumberFuncs = {
    open: (sum: number, bug: IBug) => (bug.status === "open" ? sum + 1 : sum),
    done: (sum: number, bug: IBug) => (bug.status === "done" ? sum + 1 : sum),
    overdue: (sum: number, bug: IBug) =>
      checkBugTime(bug) < 0 ? sum + 1 : sum,
    today: (sum: number, bug: IBug) =>
      checkBugTime(bug) === 0 ? sum + 1 : sum,
    week: (sum: number, bug: IBug) =>
      checkBugTime(bug) > 0 && checkBugTime(bug) < 7 ? sum + 1 : sum
  };

  const calculateNumbers = (callback: (sum: number, bug: IBug) => number) => {
    return store.projects.reduce((acc, project) => {
      if (!project.bugs.length) {
        return acc + 0;
      } else {
        return acc + project.bugs.reduce(callback, 0);
      }
    }, 0);
  };

  calculateNumbers(reduceNumberFuncs.week);

  useEffect(() => {
    setBugStats((prev) => {
      return Object.keys(prev).reduce(
        (acc, key) => {
          return {
            ...acc,
            [key]: {
              ...acc[key],
              number: calculateNumbers(reduceNumberFuncs[key])
            }
          };
        },
        { ...prev }
      );
    });
  }, [store.projects]);

  return (
    <div>
      <h1 className="mb-4 border-b-2 pb-6 text-2xl font-bold text-gray-600">
        Bugs
      </h1>
      <div className="flex gap-8 border-b-2 pb-6">
        {Object.keys(bugStats).map((stat) => (
          <BugNumbers key={stat} {...bugStats[stat]} />
        ))}
      </div>
      <table className="mb-6 min-w-full leading-normal">
        <thead>
          <tr>
            <th className="w-2/6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
              Bug
            </th>
            <th className="w-1/6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
              Status
            </th>
            <th className="w-1/6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
              Created
            </th>
            <th className="w-1/6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
              Due
            </th>
            <th className="w-1/6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
              Reporter
            </th>
          </tr>
        </thead>
      </table>
      {(store.currentProject.id
        ? [...[], store.currentProject]
        : store.filteredProjects
      ).map((project) => (
        <div key={project.id}>
          {/* <h3 className="text-lg font-bold">{project.title}</h3> */}
          <table className="mb-12 min-w-full border-b-2 pb-2 leading-normal">
            <thead className="text-left">
              <tr>
                <th>{project.title}</th>
              </tr>
            </thead>
            <tbody>
              {project.bugs.map((bug) => (
                <tr key={bug.title} className="border-b-2 text-sm">
                  <td className="w-2/6 py-2">
                    <div className="ml-3 mb-4">
                      <p className="text-gray-900">{bug.title}</p>
                      <p className="text-xs text-gray-600">{bug.description}</p>
                    </div>
                  </td>
                  <td className="w-1/6">
                    <span className="mr-2 rounded-xl bg-violet-500 px-2.5 py-1 font-medium text-white dark:bg-gray-700 dark:text-gray-300">
                      {bug.status}
                    </span>
                  </td>
                  <td className="w-1/6">
                    <p className="text-gray-900">
                      {dayjs(bug.created_at).format("DD/MM/YYYY")}
                    </p>
                  </td>
                  <td className="w-1/6">
                    <p className="text-gray-600">
                      {dayjs(bug.due).format("DD/MM HH:mm")}
                    </p>
                    <p className="text-gray-600">{dayjs(bug.due).fromNow()}</p>
                  </td>
                  <td className="w-1/6">
                    <h5>{bug.created_by.first_name}</h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default observer(BugView);
