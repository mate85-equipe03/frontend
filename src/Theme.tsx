import { createTheme } from "@mui/material/styles";

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: "#3BC572",
      light: "#3BC5724D",
      contrastText: "#fff",
    },
  },
});

const theme = createTheme(paletteTheme, {
  typography: {
    h1: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
    h2: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
    h3: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
    h4: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
    h5: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
    h6: {
      color: paletteTheme.palette.primary.main,
      fontWeight: "bold",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #3BC57280",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: paletteTheme.palette.primary.main,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          ":hover": {
            color: paletteTheme.palette.primary.dark,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

export default theme;
