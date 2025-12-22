import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserManagement from "./pages/UserManagement"; // ✅ FIXED IMPORT

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Teams from "./pages/Teams";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <MainLayout
        user={user}
        onLogout={handleLogout}
        toggleTheme={toggleTheme}
        mode={mode}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/projects" element={<Projects userRole={user.role} />} />
          <Route path="/tasks" element={<Tasks userRole={user.role} />} />
          <Route path="/teams" element={<Teams userRole={user.role} />} />

          {/* ADMIN ONLY */}
          {user.role === "admin" && (
            <Route path="/user-management" element={<UserManagement />} />
          )}

          {/* USER visiting admin routes = redirect to dashboard */}
          <Route
            path="/user-management"
            element={<Dashboard />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
