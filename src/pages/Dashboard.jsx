import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const columns = ["ID", "Project", "Status"];
  const rows = [
    [1, "Redesign Website", "In Progress"],
    [2, "Mobile App", "Completed"],
    [3, "Backend API", "Pending"],
  ];

  return (
    <div>
      <Navbar title="ProManage UI" />

      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <StatCard title="Projects" value="12" />
          <StatCard title="Tasks" value="87" />
          <StatCard title="Team Members" value="04" />
        </div>

        <h2 style={{ marginTop: "2rem" }}>Recent Projects</h2>
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Dashboard;
