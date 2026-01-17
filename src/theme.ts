import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0b2a6f" },   // blu
    secondary: { main: "#ffd200" }, // giallo
    error: { main: "#e53935" },     // rosso accento
    background: {
      default: "#0a0c10",
      paper: "rgba(10, 12, 16, 0.92)",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
});
