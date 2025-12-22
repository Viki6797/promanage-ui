import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f7fa",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
            },
          }
        : {
            background: {
              default: "#111827",
              paper: "#1f2937",
            },
            text: {
              primary: "#ffffff",
            },
          }),
    },
  });
