import { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const triggerError = () => {
    setError("Invalid username or password");
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async () => {
    setError("");

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return triggerError();

    const user = snapshot.docs[0].data();

    if (user.password !== password) return triggerError();

    onLogin({ username: user.username, role: user.role });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={shake ? "shake" : ""}
        style={{
          width: "360px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.20)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "25px",
            background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Login
        </h2>

        {/* USERNAME */}
        <div style={{ position: "relative", marginBottom: "22px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ position: "relative", marginBottom: "22px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {/* Eye icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          style={styles.btn}
        >
          Login
        </motion.button>

        {/* ERROR */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: "red",
              marginTop: "12px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </motion.p>
        )}

        {/* Shake animation */}
        <style>
          {`
          .shake {
            animation: shakeAnim 0.3s ease-in-out;
          }
          @keyframes shakeAnim {
            0% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            50% { transform: translateX(6px); }
            75% { transform: translateX(-6px); }
            100% { transform: translateX(0); }
          }
        `}
        </style>
      </motion.div>
    </div>
  );
};

/* ------------------------ */
/* Fully centered inputs    */
/* ------------------------ */
const styles = {
  input: {
    width: "100%",
    height: "45px",
    padding: "0 14px",
    borderRadius: "10px",
    border: "2px solid rgba(255,255,255,0.9)",
    background: "rgba(255,255,255,0.9)",
    color: "#000",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
    color: "#333",
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
