import React, { ReactNode } from "react";
import { IBug } from "../../../../models/IBug";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";

type TableProps = {
  children: ReactNode;
};
const Table = ({ children }: TableProps) => {
  return <table className="table w-full">{children}</table>;
};

export default Table;
