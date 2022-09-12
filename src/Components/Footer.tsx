import React from "react";
import { Link, Typography, Grid } from "@mui/material";

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
          height: "100px",
        }}
      >
        <Grid>
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

        <Link href="https://pgcomp.ufba.br/" target="_blank" rel="noreferrer">
          <img src={pgcomp} alt="PGCOMP UFBA" height="100px" />
        </Link>
      </Grid>
    </footer>
  );
}
export default Footer;
