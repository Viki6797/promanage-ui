import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Projects = ({ userRole }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    if (editProject) {
      await updateDoc(doc(db, "projects", editProject.id), {
        name,
        owner,
      });
    } else {
      await addDoc(collection(db, "projects"), {
        name,
        owner,
      });
    }

    setOpen(false);
    setEditProject(null);
    setName("");
    setOwner("");
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") return; // only admin allowed
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setName(project.name);
    setOwner(project.owner);
    setOpen(true);
  };

  const handleOpen = () => {
    setEditProject(null);
    setName("");
    setOwner("");
    setOpen(true);
  };

  return (
    <div>
      <h2>Projects</h2>
      <Button variant="contained" onClick={handleOpen}>
        + Add Project
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(project)}>EDIT</Button>

                  {userRole === "admin" && (
                    <Button
                      color="error"
                      onClick={() => handleDelete(project.id)}
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editProject ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Name"
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
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;
