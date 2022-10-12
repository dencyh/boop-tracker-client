import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import relativeTime from "dayjs/plugin/relativeTime";
import BugNumbers from "./bugNumbers";
import { IBug } from "../../../models/IBug";
import BugTable from "./bugTable";
import Table from "./bugTable/table";
import TableHeaders from "./bugTable/tableHeaders";
dayjs.extend(relativeTime);

const headerColumns = [
  {
    text: "Bug",
    class: "w-4/12 py-2 text-xs font-semibold uppercase text-gray-600"
  },
  {
    text: "Status",
    class:
      "w-1/12 py-2 text-xs text-center pr-4 font-semibold uppercase text-gray-600"
  },
  {
    text: "Priority",
    class:
      "w-1/12 py-2 text-xs text-center pr-4 font-semibold uppercase text-gray-600"
  },
  {
    text: "Created",
    class:
      "w-2/12 py-2 text-xs text-center font-semibold uppercase text-gray-600"
  },
  {
    text: "Due",
    class:
      "w-2/12 py-2 text-xs text-center font-semibold uppercase text-gray-600"
  },
  {
    text: "Reporter",
    class:
      "w-2/12 py-2 text-xs text-right font-semibold uppercase text-gray-600"
  }
];
export interface BugStats {
  number: number;
  text: string;
  color: string;
}

const ProjectList = () => {
  const { store } = useContext(Context);

  const [visibleProjects, setVisibleProjects] = useState(
    store.currentProject.id
      ? [...[], store.currentProject]
      : store.filteredProjects
  );

  useEffect(() => console.log(visibleProjects), [visibleProjects]);

  const [bugStats, setBugStats] = useState({
    open: {
      number: "-",
      text: "Open bugs",
      color: "bg-green-300"
    },
    done: {
      number: "-",
      text: "Closed bugs",
      color: "bg-violet-200"
    },
    overdue: {
      number: "-",
      text: "Overdue",
      color: "bg-rose-300"
    },
    today: {
      number: "-",
      text: "Due today",
      color: "bg-lime-200"
    },
    week: {
      number: "-",
      text: "Due in 7 days",
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

  const calculateNumbers = (
    state,
    callback: (sum: number, bug: IBug) => number
  ) => {
    return state.reduce((acc, project) => {
      if (!project.bugs.length) {
        return acc + 0;
      } else {
        return acc + project.bugs.reduce(callback, 0);
      }
    }, 0);
  };

  useEffect(() => {
    setVisibleProjects(
      store.currentProject.id
        ? [...[], store.currentProject]
        : store.filteredProjects
    );
  }, [store.currentProject, store.filteredProjects]);

  useEffect(() => {
    setBugStats((prev) => {
      return Object.keys(prev).reduce(
        (acc, key) => {
          return {
            ...acc,
            [key]: {
              ...acc[key],
              number: calculateNumbers(visibleProjects, reduceNumberFuncs[key])
            }
          };
        },
        { ...prev }
      );
    });
  }, [
    store.filteredProjects,
    store.currentProject,
    store.projects,
    visibleProjects
  ]);

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
      <Table>
        <TableHeaders {...{ columns: headerColumns }} />
        {/* <TableBody {...{ columns, data: data }} /> */}
      </Table>
      {visibleProjects.map((project) => (
        <div key={project.id} className="pb-2">
          <h3 className="mt-4 border-b-2 pb-2 text-xl font-bold">
            {project.title}
          </h3>
          <BugTable data={project.bugs} />
        </div>
      ))}
    </div>
  );
};

export default observer(ProjectList);
