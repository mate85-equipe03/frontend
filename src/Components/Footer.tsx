import React from "react";
import { Link, Typography, Grid, CardMedia } from "@mui/material";

import PGCOMPLogo from "../assets/pgcomp-horizontal.png";

function Footer() {
  return (
    <footer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          textAlign: { xs: "center", sm: "start" },
        }}
      >
        <Grid item sm>
          <Typography fontSize="12px" fontWeight="bold">
            INSTITUTO DE COMPUTAÇÃO
          </Typography>

          <Typography fontSize="10px">
            Avenida Milton Santos, s/n - Campus de Ondina, PAF 2 - Salvador -
            Bahia, CEP 40.170-110
          </Typography>

          <Typography fontSize="10px">
            E-mail: <Link href="mailto:ceapg-ic@ufba.br">ceapg-ic@ufba.br</Link>
          </Typography>
        </Grid>

        <Grid
          item
          sm="auto"
          sx={{ height: 80 - 32, mt: { xs: 2, sm: 0 }, ml: { xs: 0, sm: 5 } }}
        >
          <Link href="https://pgcomp.ufba.br/" target="_blank" rel="noreferrer">
            <CardMedia
              component="img"
              image={PGCOMPLogo}
              alt="PGCOMP UFBA"
              sx={{ height: "100%" }}
            />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
}
export default Footer;
