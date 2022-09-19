import React from "react";
import { Grid, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

export default function PageNotFound() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ height: "100%", pt: 8 }}
    >
      <SearchOff color="primary" sx={{ fontSize: "15em" }} />
      <Typography variant="h1">404</Typography>
      <Typography variant="subtitle2">Página não encontrada</Typography>
    </Grid>
  );
}
