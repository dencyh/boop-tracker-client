import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import relativeTime from "dayjs/plugin/relativeTime";
import BugNumbers from "./bugNumbers";
import { IBug } from "../../models/IBug";
import BugTable from "./bugTable";
import Table from "./bugTable/table";
import TableHeaders from "./bugTable/tableHeaders";
import Filters from "./filters";
import { checkBugTime } from "../../services/utils";
dayjs.extend(relativeTime);

type SortKeys = keyof IBug;
type SortOrder = "asc" | "desc";

type Column = {
  text: string;
  class: string;
  path: keyof IBug;
};

const headerColumns: Column[] = [
  {
    text: "Bug",
    class: "w-4/12 py-2 text-xs font-semibold uppercase text-gray-600",
    path: "title"
  },
  {
    text: "Status",
    class:
      "w-1/12 py-2 text-xs text-center pr-4 font-semibold uppercase text-gray-600",
    path: "status"
  },
  {
    text: "Priority",
    class:
      "w-1/12 py-2 text-xs text-center font-semibold uppercase text-gray-600",
    path: "priority"
  },
  {
    text: "Created",
    class:
      "w-2/12 py-2 text-xs text-center font-semibold uppercase text-gray-600",
    path: "createdAt"
  },
  {
    text: "Due",
    class:
      "w-2/12 py-2 text-xs text-center font-semibold uppercase text-gray-600",
    path: "due"
  },
  {
    text: "Reporter",
    class:
      "w-2/12 py-2 text-xs text-right font-semibold uppercase text-gray-600",
    path: "createdBy"
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
      : store.filteredProjectsWithBugs
  );

  const [bugStats, setBugStats] = useState({
    open: {
      number: "-",
      text: "Open bugs",
      color: "bg-emerald-400"
    },
    done: {
      number: "-",
      text: "Closed bugs",
      color: "bg-violet-400"
    },
    overdue: {
      number: "-",
      text: "Overdue",
      color: "bg-rose-400"
    },
    today: {
      number: "-",
      text: "Due today",
      color: "bg-amber-400"
    },
    week: {
      number: "-",
      text: "Due in 7 days",
      color: "bg-sky-400"
    }
  });

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
        : store.filteredProjectsWithBugs
    );
  }, [store.currentProject, store.filteredProjectsWithBugs]);

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
    store.filteredProjectsWithBugs,
    store.currentProject,
    store.projects,
    visibleProjects
  ]);

  // Sorting
  const [sortKey, setSortKey] = useState<SortKeys>("priority");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (value: keyof IBug) => {
    setSortKey(value);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <div className="mb-3">
        <Filters />
      </div>
      <div className="flex gap-8 border-b-2 pb-6">
        {Object.keys(bugStats).map((stat) => (
          <BugNumbers key={stat} {...bugStats[stat]} />
        ))}
      </div>
      <Table>
        <TableHeaders
          {...{ columns: headerColumns, handleSort, sortKey, sortOrder }}
        />
      </Table>
      {visibleProjects.map((project) => (
        <div key={project.id} className="pb-2">
          <h3 className="mt-4 border-b-2 pb-2 text-xl font-bold">
            {project.title}
          </h3>
          <BugTable
            data={project.bugs}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
        </div>
      ))}
    </div>
  );
};

export default observer(ProjectList);
