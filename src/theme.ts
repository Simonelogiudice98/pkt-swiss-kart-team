import { createTheme } from "@mui/material/styles";

const titleFont = "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
const bodyFont = "var(--font-body), serif";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0b2a6f" },
    secondary: { main: "#ffd200" },
    error: { main: "#e53935" },
    background: { default: "#0d1b2a", paper: "rgba(13, 27, 42, 0.92)" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: bodyFont,   
    button: { fontFamily: titleFont },
    h1: { fontFamily: titleFont },
    h2: { fontFamily: titleFont },
    h3: { fontFamily: titleFont },
    h4: { fontFamily: titleFont },
    h5: { fontFamily: titleFont },
    h6: { fontFamily: titleFont },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: bodyFont },
        "h1,h2,h3,h4,h5,h6": { fontFamily: titleFont }, 
      },
    },
  },
});
