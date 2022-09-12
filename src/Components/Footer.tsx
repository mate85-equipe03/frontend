import React from "react";
import { Link, Typography, Grid, CardMedia } from "@mui/material";

import pgcomp from "../assets/pgcomp-horizontal.png";

function Footer() {
  return (
    <footer>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          bgcolor: "primary.light",
          px: "2em",
          minHeight: "100px",
          minWidth: "400px",
        }}
      >
        <Grid item>
          <Typography fontSize="14px" fontWeight="bold">
            INSTITUTO DE COMPUTAÇÃO
          </Typography>

          <Typography fontSize="14px">
            Avenida Milton Santos, s/n - Campus de Ondina, PAF 2 - Salvador -
            Bahia, CEP 40.170-110
          </Typography>

          <Typography fontSize="14px">
            E-mail: <Link href="mailto:ceapg-ic@ufba.br">ceapg-ic@ufba.br</Link>
          </Typography>
        </Grid>

        <Grid item height="80px">
          <Link href="https://pgcomp.ufba.br/" target="_blank" rel="noreferrer">
            <CardMedia
              component="img"
              image={pgcomp}
              alt="PGCOMP UFBA"
              height="100%"
            />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
}
export default Footer;
