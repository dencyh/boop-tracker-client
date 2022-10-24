import React, { useCallback, useState } from "react";
import { IBug } from "../../../models/IBug";
import Table from "./table";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";
import _ from "lodash";
import StatusBadge from "./statusBadge";
import CreatedAt from "./createdAt";
import Due from "./due";
import BugLink from "./bugLink";
import Reporter from "./reporter";

type TableProps = {
  data: IBug[];
  sortKey: SortKeys;
  sortOrder: SortOrder;
};

type SortKeys = keyof IBug;
type SortOrder = "asc" | "desc";

const sortData = ({
  tableData,
  sortKey,
  sortOrder
}: {
  tableData: IBug[];
  sortKey: SortKeys;
  sortOrder: SortOrder;
}) => {
  if (!sortKey) return tableData;

  const sortedData = _.orderBy(tableData, [sortKey], [sortOrder]);

  return sortedData;
};

const BugTable = ({ data, sortKey, sortOrder }: TableProps) => {
  const columns = [
    {
      text: "Bug",
      class: "w-4/12 py-2 text-sm",
      path: "title",
      component: (bug) => <BugLink {...bug} />
    },
    {
      text: "Status",
      class: "w-1/12 py-2 text-sm pr-4 text-center",
      path: "status",
      component: (bug) => <StatusBadge {...{ bug, path: "status" }} />
    },
    {
      text: "Priority",
      class: "w-1/12 py-2 text-sm text-center",
      path: "priority",
      component: (bug) => <StatusBadge {...{ bug, path: "priority" }} />
    },
    {
      text: "Created",
      class: "w-2/12 py-2 text-xs font-semibold text-gray-600 text-center",
      path: "createdAt",
      component: (bug) => <CreatedAt {...bug} />
    },
    {
      text: "Due",
      class: "w-2/12 py-2 text-xs font-semibold text-gray-600 text-center",
      path: "due",
      component: (bug) => <Due {...bug} />
    },
    {
      text: "Reporter",
      class: "w-2/12 py-2 text-sm text-right",
      path: "createdBy.id",
      component: (bug) => <Reporter {...bug} />
    }
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, sortOrder }),
    [data, sortKey, sortOrder]
  );
  return (
    <Table>
      {/* <TableHeaders {...{ columns }} /> */}
      <TableBody {...{ columns, data: sortedData() }} />
    </Table>
  );
};

export default BugTable;
