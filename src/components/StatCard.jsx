import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

const gradients = {
  folder: "linear-gradient(135deg, #4e65ff, #92effd)",
  task: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  group: "linear-gradient(135deg, #89f7fe, #66a6ff)",
  default: "linear-gradient(135deg, #e0eafc, #cfdef3)",
};

const StatCard = ({ label, value, icon, type }) => {
  const [animate, setAnimate] = useState(false);
  const [count, setCount] = useState(0);

  // Count-up animation
  useEffect(() => {
    setAnimate(true);

    let start = 0;
    const end = parseInt(value, 10);

    if (start === end || isNaN(end)) return;

    const duration = 800;
    const increment = Math.ceil(end / (duration / 30));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  const backgroundGradient = gradients[type] || gradients.default;

  return (
    <Card
      sx={{
        p: 2,
        width: 250,
        borderRadius: 3,
        background: `${backgroundGradient}, rgba(255,255,255,0.15)`,
        backdropFilter: "blur(8px)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: 4,
        transform: animate ? "scale(1)" : "scale(0.7)",
        opacity: animate ? 1 : 0,
        transition:
          "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ fontSize: 38, opacity: 0.9 }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
              {count}
            </Typography>
            <Typography sx={{ opacity: 0.8, color: "white" }}>{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
