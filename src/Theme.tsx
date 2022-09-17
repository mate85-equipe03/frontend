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
    styleOverrides: {
      root: {
        color: "#fff",
      },
    },
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
          borderColor: paletteTheme.palette.primary.light,
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
          color: "paletteTheme.palette.primary.light",
          fontWeight: "bold",
          ":hover": {
            color: "#538dff",
          },
        },
      },
      variants: [
        {
          props: { variant: "lightText" },
          style: {
            color: "red",
          },
        },
      ],
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

export default theme;
