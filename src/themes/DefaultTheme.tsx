import { createTheme } from "@mui/material/styles";

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: "#00297a",
      light: "#9bc9ff",
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
          border: "1px solid",
          borderColor: paletteTheme.palette.primary.main,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: paletteTheme.palette.primary.main,
          opacity: "1",
          "::after": { borderTopColor: paletteTheme.palette.primary.main },
          "::before": { borderTopColor: paletteTheme.palette.primary.main },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          ":hover": {
            color: "#538dff",
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
