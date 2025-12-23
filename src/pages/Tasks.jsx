import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import GlassCard from "../components/GlassCard";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";

const statusColors = {
  "To Do": "default",
  "In Progress": "warning",
  Done: "success",
};

const priorityColors = {
  Low: "success",
  Medium: "warning",
  High: "error",
};

const Tasks = ({ userRole }) => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Low");

  const fetchTasks = async () => {
    const snap = await getDocs(collection(db, "tasks"));
    setTasks(
      snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async () => {
    if (editTask) {
      await updateDoc(doc(db, "tasks", editTask.id), {
        name,
        owner,
        status,
        priority,
      });
    } else {
      await addDoc(collection(db, "tasks"), {
        name,
        owner,
        status,
        priority,
        createdAt: new Date(),
      });
    }

    setOpen(false);
    resetForm();
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setName(task.name);
    setOwner(task.owner);
    setStatus(task.status);
    setPriority(task.priority);
    setOpen(true);
  };

  const resetForm = () => {
    setEditTask(null);
    setName("");
    setOwner("");
    setStatus("To Do");
    setPriority("Low");
  };

  return (
    <div>
      <PageTitle>Tasks</PageTitle>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        + Add Task
      </Button>

      {/* TASK GRID */}
      <Grid container spacing={3}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <GlassCard
              sx={{
                borderRadius: 4,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.35)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {task.name}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Owner: {task.owner}
                </Typography>

                <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                  <Chip
                    label={task.status}
                    color={statusColors[task.status]}
                    size="small"
                  />
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                    size="small"
                  />
                </div>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => handleEdit(task)}>EDIT</Button>

                {userRole === "admin" && (
                  <Button
                    color="error"
                    onClick={() => handleDelete(task.id)}
                  >
                    DELETE
                  </Button>
                )}
              </CardActions>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      {/* ADD/EDIT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editTask ? "Edit Task" : "Add Task"}</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Task Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Owner"
            fullWidth
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />

          <TextField
            margin="dense"
            select
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>

          <TextField
            margin="dense"
            select
            label="Priority"
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tasks;
