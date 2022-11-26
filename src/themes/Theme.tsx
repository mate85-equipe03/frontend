import { createTheme, lighten } from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid";

const hoverColor = "#538dff";

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: "#00297a",
      light: "#9bc9ff",
      contrastText: "#fff",
    },
    warning: {
      main: "#fbc33c",
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
    MuiDataGrid: {
      defaultProps: {
        pageSize: 5,
        rowsPerPageOptions: [5],
        localeText: ptBR.components.MuiDataGrid.defaultProps.localeText,
      },
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: lighten(paletteTheme.palette.primary.main, 0.5),
          height: 371,
          "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-select":
            {
              marginBottom: 0,
              fontSize: 13,
            },
        },
        row: {
          ":hover": {
            color: paletteTheme.palette.primary.main,
            backgroundColor: lighten(paletteTheme.palette.primary.main, 0.88),
            cursor: "pointer",
          },
        },
        columnHeaders: {
          backgroundColor: lighten(paletteTheme.palette.primary.main, 0.2),
          color: paletteTheme.palette.primary.contrastText,
          "& .MuiSvgIcon-root": {
            color: paletteTheme.palette.primary.contrastText,
          },
        },
      },
    },
  },
});

export default theme;
