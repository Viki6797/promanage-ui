import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";

import StatCard from "../components/StatCard";
import TaskStatusChart from "../components/TaskStatusChart";
import WeeklyChart from "../components/WeeklyChart";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {

  // ⭐ Correct FIX — no fetchDashboardData needed because we use REALTIME listeners

  const handleTaskDrop = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });

      // ❌ REMOVE THIS (not needed & was causing error)
      // fetchDashboardData();

      console.log("Status updated:", newStatus);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

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

  const [weeklyData, setWeeklyData] = useState([
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
  ]);

  useEffect(() => {
    // 🔥 REAL TIME PROJECT COUNT
    onSnapshot(collection(db, "projects"), (projSnap) => {
      setProjectsCount(projSnap.size);
    });

    // 🔥 REAL TIME TEAM MEMBERS
    onSnapshot(collection(db, "teams"), (teamSnap) => {
      let members = 0;
      teamSnap.docs.forEach((d) => {
        members += Number(d.data().members || 0);
      });
      setTeamMembersCount(members);
    });

    // 🔥 REAL TIME TASKS + KANBAN + WEEKLY
    onSnapshot(collection(db, "tasks"), (taskSnap) => {
      setTasksCount(taskSnap.size);

      let completed = 0;
      let inProgress = 0;
      let todo = 0;

      const todoArr = [];
      const inProgressArr = [];
      const doneArr = [];

      const tempWeek = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0,
        Fri: 0, Sat: 0, Sun: 0,
      };

      taskSnap.docs.forEach((docItem) => {
        const task = { id: docItem.id, ...docItem.data() };

        // STATUS BREAKDOWN
        if (task.status === "Done") {
          completed++;
          doneArr.push(task);
        } else if (task.status === "In Progress") {
          inProgress++;
          inProgressArr.push(task);
        } else {
          todo++;
          todoArr.push(task);
        }

        // WEEKLY DATA
        if (task.createdAt?.toDate) {
          const dayIndex = task.createdAt.toDate().getDay();
          const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          tempWeek[map[dayIndex]]++;
        }
      });

      setTaskStatusData({ completed, inProgress, todo });

      setKanbanTasks({
        todo: todoArr,
        inProgress: inProgressArr,
        done: doneArr,
      });

      setWeeklyData([
        { day: "Mon", value: tempWeek.Mon },
        { day: "Tue", value: tempWeek.Tue },
        { day: "Wed", value: tempWeek.Wed },
        { day: "Thu", value: tempWeek.Thu },
        { day: "Fri", value: tempWeek.Fri },
        { day: "Sat", value: tempWeek.Sat },
        { day: "Sun", value: tempWeek.Sun },
      ]);
    });
  }, []);

  return (
    <div>

      {/* HEADER ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard Overview
          </Typography>
        </Box>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <StatCard label="Projects" value={projectsCount} icon={<FolderIcon />} type="folder" />
        <StatCard label="Tasks" value={tasksCount} icon={<AssignmentIcon />} type="task" />
        <StatCard label="Team Members" value={teamMembersCount} icon={<GroupIcon />} type="group" />
      </div>

      {/* Pie Chart */}
      <TaskStatusChart data={taskStatusData} />

      {/* Weekly Chart */}
      <WeeklyChart data={weeklyData} />

      {/* Kanban Board with drag handler */}
      <KanbanBoard tasks={kanbanTasks} onDropTask={handleTaskDrop} />

    </div>
  );
};

export default Dashboard;
