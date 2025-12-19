import DataTable from "../components/DataTable";

const columns = ["ID", "Project", "Status"];

const rows = [
  [1, "Redesign Website", "In Progress"],
  [2, "Mobile App", "Completed"],
  [3, "Backend API", "Pending"],
];

export default {
  title: "Components/DataTable",
  component: DataTable,
};

export const Default = {
  args: {
    columns,
    rows,
  },
};

