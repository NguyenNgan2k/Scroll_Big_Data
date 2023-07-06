import React from "react";
import { data as initialData } from "./data";
import TableBody from "./TableBody";
import HeaderCell from "./HeaderCell";

const sortFunction = (data, key, sortOrder) => {
  return data.sort((a, b) => {
    if (typeof a[key] === "string") {
      if (sortOrder === "asc") return a[key].localeCompare(b[key]);
      return b[key].localeCompare(a[key]);
    }

    if (sortOrder === "asc") return a[key] > b[key] ? 1 : -1;
    return b[key] > a[key] ? 1 : -1;
  });
};

const Table = () => {
  const [data, setData] = React.useState(initialData);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const sortData = (key) => {
    const sorted = sortFunction(data, key, sortOrder);
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <table>
      <thead>
        <tr>
          <HeaderCell field="id" header="ID" sortData={sortData} />
          <HeaderCell
            field="first_name"
            header="First name"
            sortData={sortData}
          />
          <HeaderCell
            field="last_name"
            header="Last name"
            sortData={sortData}
          />
          <HeaderCell field="email" header="E-mail" sortData={sortData} />
          <HeaderCell field="gender" header="Gender" sortData={sortData} />
        </tr>
      </thead>

      <TableBody data={data} />
    </table>
  );
};

export default Table;
