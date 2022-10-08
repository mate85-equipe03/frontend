import { createTheme } from "@mui/material/styles";

const hoverColor = "#538dff";

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
            color: "hoverColor",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      variants: [
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: paletteTheme.palette.primary.light,
            color: paletteTheme.palette.primary.light,
            ":hover": {
              borderColor: hoverColor,
              color: hoverColor,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            textTransform: "initial",
            color: paletteTheme.palette.primary.light,
            ":hover": {
              color: hoverColor,
            },
          },
        },
      ],
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          border: "1px solid",
          borderRadius: 4,
          borderColor: "#00000044",
        },
      },
    },
  },
});

export default theme;
