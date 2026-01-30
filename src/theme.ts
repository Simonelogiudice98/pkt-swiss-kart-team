import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0b2a6f" },
    secondary: { main: "#ffd200" },
    error: { main: "#e53935" },
    background: {
      default: "#0a0c10",
      paper: "rgba(10, 12, 16, 0.92)",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      "var(--font-cambo), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
});
