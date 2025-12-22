import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import StatCard from "../components/StatCard";
import TaskStatusChart from "../components/TaskStatusChart";
import WeeklyChart from "../components/WeeklyChart";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(0);

  const [taskStatusData, setTaskStatusData] = useState({
    completed: 0,
    inProgress: 0,
    todo: 0,
  });

  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const fetchDashboardData = async () => {
    // Projects count
    const projSnap = await getDocs(collection(db, "projects"));
    setProjectsCount(projSnap.size);

    // Tasks count + status
    const taskSnap = await getDocs(collection(db, "tasks"));
    setTasksCount(taskSnap.size);

    let completed = 0,
      inProgress = 0,
      todo = 0;

    const todoArr = [];
    const inProgressArr = [];
    const doneArr = [];

    taskSnap.docs.forEach((doc) => {
      const task = doc.data();

      if (task.status === "Completed") {
        completed++;
        doneArr.push(task);
      } else if (task.status === "In Progress") {
        inProgress++;
        inProgressArr.push(task);
      } else {
        todo++;
        todoArr.push(task);
      }
    });

    setTaskStatusData({ completed, inProgress, todo });
    setKanbanTasks({ todo: todoArr, inProgress: inProgressArr, done: doneArr });

    // Team members total
    const teamSnap = await getDocs(collection(db, "teams"));
    let members = 0;
    teamSnap.docs.forEach((d) => {
      members += Number(d.data().members || 0);
    });

    setTeamMembersCount(members);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Dummy weekly productivity data
  const weeklyData = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 6 },
    { day: "Fri", value: 4 },
    { day: "Sat", value: 1 },
    { day: "Sun", value: 0 },
  ];

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <StatCard
          label="Projects"
          value={projectsCount}
          icon={<FolderIcon sx={{ color: "white" }} />}
          type="folder"
        />

        <StatCard
          label="Tasks"
          value={tasksCount}
          icon={<AssignmentIcon sx={{ color: "white" }} />}
          type="task"
        />

        <StatCard
          label="Team Members"
          value={teamMembersCount}
          icon={<GroupIcon sx={{ color: "white" }} />}
          type="group"
        />
      </div>

      <TaskStatusChart data={taskStatusData} />

      <WeeklyChart data={weeklyData} />

      <KanbanBoard tasks={kanbanTasks} />
    </div>
  );
};

export default Dashboard;
