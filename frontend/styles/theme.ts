import { Alumni_Sans, Bungee_Inline } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const bungeeInline = Bungee_Inline({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCC33",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#212121",
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: alumniSans.style.fontFamily,
  },
});

export default theme;
