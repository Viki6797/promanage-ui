import { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  Chip
} from "@mui/material";

import { NavLink } from "react-router-dom";

// 🔥 Import background properly (Vite-friendly)
import bgLight from "/bg-light.jpeg";

const drawerWidth = 220;

const MainLayout = ({ children, toggleTheme, mode, user, onLogout }) => {
  const role = user?.role;

  // ⭐ Apply dynamic background (fixes Vite build)
  useEffect(() => {
    if (mode === "light") {
      document.body.style.background = `url(${bgLight}) center/cover fixed`;
    } else {
      document.body.style.background = "#0d1117"; // dark mode
    }
    return () => {
      document.body.style.background = "";
    };
  }, [mode]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              mode === "light"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(17, 25, 40, 0.4)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            color: mode === "light" ? "#000" : "#fff"
          }
        }}
      >
        <Toolbar />
        <List>

          {role === "admin" && (
            <ListItemButton
              component={NavLink}
              to="/user-management"
              sx={{
                "&.active": {
                  backgroundColor:
                    mode === "light"
                      ? "rgba(25,118,210,0.15)"
                      : "rgba(255,255,255,0.1)"
                }
              }}
            >
              <ListItemText primary="Users" />
            </ListItemButton>
          )}

          <ListItemButton component={NavLink} to="/">
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/projects">
            <FolderIcon sx={{ mr: 2 }} />
            <ListItemText primary="Projects" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/tasks">
            <AssignmentIcon sx={{ mr: 2 }} />
            <ListItemText primary="Tasks" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/teams">
            <GroupIcon sx={{ mr: 2 }} />
            <ListItemText primary="Teams" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background:
              mode === "light"
                ? "rgba(240,240,240,0.8)"
                : "rgba(17, 25, 40, 0.6)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            color: mode === "light" ? "#000" : "#fff"
          }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ProManage UI
            </Typography>

            {/* ROLE DISPLAY */}
            <Typography sx={{ mr: 1, fontSize: "0.9rem" }}>
              {role}
            </Typography>

            <Chip
              label={role === "admin" ? "ADMIN" : "USER"}
              color={role === "admin" ? "error" : "primary"}
              size="small"
              sx={{ mr: 2 }}
            />

            {/* THEME TOGGLE */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: mode === "dark" ? "#ffffff" : "#000000",
                background:
                  mode === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.08)",
                borderRadius: "50%",
                padding: "6px",
                transition: "0.2s ease",
                "&:hover": {
                  background:
                    mode === "dark"
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.15)"
                }
              }}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            {/* LOGOUT */}
            <IconButton color="inherit" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
