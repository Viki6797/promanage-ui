import { useEffect, useState } from "react";
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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
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

  const handleAdd = async () => {
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
      });
    }

    setOpen(false);
    resetForm();
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") return; // role check
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
      <h2>Tasks</h2>

      <Button
        variant="contained"
        sx={{ marginBottom: 2 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        + Add Task
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={task.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.owner}</TableCell>
                <TableCell>
                  <Chip label={task.status} color={statusColors[task.status]} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(task)}>EDIT</Button>

                  {userRole === "admin" && (
                    <Button
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      DELETE
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
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
          <Button onClick={handleAdd}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tasks;
