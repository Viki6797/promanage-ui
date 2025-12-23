import { Card } from "@mui/material";

const GlassCard = ({ children }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        padding: 2,
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.75)"
            : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        border: (theme) =>
          theme.palette.mode === "light"
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(255,255,255,0.08)",
        boxShadow: (theme) =>
          theme.palette.mode === "light"
            ? "0 4px 12px rgba(0,0,0,0.08)"
            : "0 4px 18px rgba(0,0,0,0.35)",
        transition: "0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 6px 14px rgba(0,0,0,0.15)"
              : "0 6px 22px rgba(0,0,0,0.5)",
        },
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
