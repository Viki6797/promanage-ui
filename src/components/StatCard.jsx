import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, type }) => {
  const gradientMap = {
    folder: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    task: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    group: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{ width: "100%" }}
    >
      <Card
        elevation={4}
        sx={{
          borderRadius: "18px",
          padding: 2,
          background: gradientMap[type] || gradientMap.folder,
          color: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* ICON BUBBLE */}
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            {icon}
          </Box>

          {/* TEXT */}
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", lineHeight: 1 }}
            >
              {value}
            </Typography>
            <Typography sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
              {label}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
