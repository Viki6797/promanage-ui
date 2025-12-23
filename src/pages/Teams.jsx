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

const Teams = ({ userRole }) => {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");

  const fetchTeams = async () => {
    const snap = await getDocs(collection(db, "teams"));
    setTeams(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
    );
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSave = async () => {
    if (editTeam) {
      await updateDoc(doc(db, "teams", editTeam.id), {
        teamName,
        members: Number(members),
      });
    } else {
      await addDoc(collection(db, "teams"), {
        teamName,
        members: Number(members),
      });
    }

    fetchTeams();
    resetForm();
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "teams", id));
    fetchTeams();
  };

  const handleEdit = (team) => {
    setEditTeam(team);
    setTeamName(team.teamName);
    setMembers(team.members);
    setOpen(true);
  };

  const resetForm = () => {
    setEditTeam(null);
    setTeamName("");
    setMembers("");
  };

  return (
    <div>
      <PageTitle>Teams</PageTitle>


      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        + Add Team
      </Button>

      {/* TEAM GRID */}
      <Grid container spacing={3}>
        {teams.map((team, index) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
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
                  {team.teamName}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Members: {team.members}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => handleEdit(team)}>EDIT</Button>

                {userRole === "admin" && (
                  <Button color="error" onClick={() => handleDelete(team.id)}>
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
        <DialogTitle>{editTeam ? "Edit Team" : "Add Team"}</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Team Name"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Members"
            type="number"
            fullWidth
            value={members}
            onChange={(e) => setMembers(e.target.value)}
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

export default Teams;
