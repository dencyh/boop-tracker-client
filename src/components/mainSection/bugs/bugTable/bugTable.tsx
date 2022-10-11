import React, { useCallback, useState } from "react";
import { IBug } from "../../../../models/IBug";
import { IProject } from "../../../../models/IProject";
import Table from "./table";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";
import _ from "lodash";

type TableProps = {
  data: IBug[];
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

const BugTable = ({ data }: TableProps) => {
  const [sortKey, setSortKey] = useState<SortKeys>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const columns = [
    {
      text: "Bug",
      class: "w-4/12 py-2 px-2",
      key: "title"
    },
    {
      text: "Status",
      class: "w-1/12 py-2 px-2",
      key: "status"
    },
    {
      text: "Priority",
      class: "w-1/12 py-2 px-2",
      key: "priority"
    },
    {
      text: "Created",
      class: "w-2/12 py-2 px-2",
      key: "created_at"
    },
    {
      text: "Due",
      class: "w-2/12 py-2 px-2",
      key: "due"
    },
    {
      text: "Reporter",
      class: "w-2/12 py-2 px-2",
      key: "created_by.id"
    }
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, sortOrder }),
    [data, sortKey, sortOrder]
  );
  return (
    <Table>
      <TableHeaders {...{ columns }} />
      <TableBody {...{ columns, data: data }} />
    </Table>
  );
};

export default BugTable;
