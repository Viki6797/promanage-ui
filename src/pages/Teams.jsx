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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    if (userRole !== "admin") return; // role check ❗
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
      <h2>Teams</h2>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        + Add Team
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams.map((team, index) => (
              <TableRow key={team.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{team.teamName}</TableCell>
                <TableCell>{team.members}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(team)}>EDIT</Button>

                  {userRole === "admin" && (
                    <Button
                      color="error"
                      onClick={() => handleDelete(team.id)}
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

      {/* Modal Dialog */}
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
            label="Members Count"
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
