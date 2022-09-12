import React from "react";
import { Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Typography variant="h1" align="center">Hello, World!</Typography>
    </Grid>
  );
}
