import { Alumni_Sans } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// export const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   fallback: ["Helvetica", "Arial", "sans-serif"],
// });

export const alumniSans = Alumni_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
// #FF9B42 - laranja
// #C75000 - laranja 
// #FFCC33 - amarelo 

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
