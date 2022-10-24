import React from "react";
import { Link, Typography, Grid, CardMedia, Divider } from "@mui/material";

import PGCOMPLogo from "../assets/logos/pgcomp/sem-texto.png";
import UFBALogo from "../assets/logos/ufba/sem-texto.png";

function Footer() {
  return (
    <footer>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          textAlign: { xs: "center", sm: "start" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Grid item sm sx={{ color: "primary.contrastText" }}>
          <Typography fontSize="12px" fontWeight="bold">
            INSTITUTO DE COMPUTAÇÃO
          </Typography>

          <Typography fontSize="10px">
            Avenida Milton Santos, s/n - Campus de Ondina, PAF 2 - Salvador -
            Bahia, CEP 40.170-110
          </Typography>

          <Typography fontSize="10px">
            E-mail:&nbsp;
            <Link color="primary.light" href="mailto:ceapg-ic@ufba.br">
              ceapg-ic@ufba.br
            </Link>
          </Typography>
        </Grid>

        <Grid item sm="auto" sx={{ height: 80 - 32, mt: { xs: 2, sm: 0 } }}>
          <Grid sx={{ height: "100%" }} container direction="row">
            <Link
              sx={{ height: "100%" }}
              href="https://ufba.br/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                image={UFBALogo}
                alt="UFBA"
                sx={{ height: "100%" }}
              />
            </Link>
            <Divider
              sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.3)" }}
              orientation="vertical"
            />
            <Link
              sx={{ height: "100%" }}
              href="https://pgcomp.ufba.br/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                image={PGCOMPLogo}
                alt="PGCOMP UFBA"
                sx={{ height: "100%" }}
              />
              {/* </Grid> */}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}
export default Footer;
