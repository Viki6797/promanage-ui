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
} from "@mui/material";

const Projects = ({ userRole }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  const fetchProjects = async () => {
    const snap = await getDocs(collection(db, "projects"));
    setProjects(
      snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async () => {
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
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setName(project.name);
    setOwner(project.owner);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle>Projects</PageTitle>


      {/* ADD PROJECT BUTTON */}
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => {
          setEditProject(null);
          setName("");
          setOwner("");
          setOpen(true);
        }}
      >
        + Add Project
      </Button>

      {/* PROJECT GRID */}
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {project.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  Owner: {project.owner}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Project ID: {index + 1}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="text"
                    sx={{ color: "#1e88e5", fontWeight: "bold" }}
                    onClick={() => handleEdit(project)}
                  >
                    EDIT
                  </Button>
                {userRole === "admin" && (
                  <Button
                    color="error"
                    onClick={() => handleDelete(project.id)}
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
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;
