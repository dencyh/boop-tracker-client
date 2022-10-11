import React, { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
};
const Table = ({ children }: TableProps) => {
  return <table className="table w-full">{children}</table>;
};

export default Table;
