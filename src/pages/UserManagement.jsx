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
} from "@mui/material";

const UserManagement = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // plain password (demo mode)
  const [role, setRole] = useState("user");

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (editUser) {
      await updateDoc(doc(db, "users", editUser.id), {
        username,
        password,
        role,
      });
    } else {
      await addDoc(collection(db, "users"), {
        username,
        password,
        role,
      });
    }

    fetchUsers();
    resetForm();
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  const resetForm = () => {
    setEditUser(null);
    setUsername("");
    setPassword("");
    setRole("user");
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setUsername(user.username);
    setPassword(user.password);
    setRole(user.role);
    setOpen(true);
  };

  return (
    <div>
      <PageTitle>User Management</PageTitle>


      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        + Add User
      </Button>

      {/* USERS GRID */}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <GlassCard
              sx={{
                borderRadius: 4,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.35)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{user.username}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Role: {user.role.toUpperCase()}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => handleEdit(user)}>EDIT</Button>

                  {userRole === "admin" && (
                      <Button color="error" onClick={() => handleDelete(user.id)}>
                          DELETE
                      </Button>
                  )}
              </CardActions>

            </GlassCard>
          </Grid>
        ))}
      </Grid>

      {/* ADD/EDIT USER MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="dense"
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
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

export default UserManagement;
