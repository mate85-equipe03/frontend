import React from "react";
import { Link, Typography, Stack } from "@mui/material";

import pgcomp from "../assets/pgcomp-horizontal.png";

function Footer() {
  return (
    <footer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          bgcolor: "primary.light",
          px: "2em",
          height: "100px",
        }}
      >
        <Typography fontSize="14px">
          <strong>INSTITUTO DE COMPUTAÇÃO</strong> <br />
          Avenida Milton Santos, s/n - Campus de Ondina, PAF 2 - Salvador -
          Bahia, CEP 40.170-110 <br />
          E-mail: <Link href="mailto:ceapg-ic@ufba.br">ceapg-ic@ufba.br</Link>
        </Typography>

        <Link href="https://pgcomp.ufba.br/" target="_blank" rel="noreferrer">
          <img src={pgcomp} alt="PGCOMP UFBA" height="100px" />
        </Link>
      </Stack>
    </footer>
  );
}
export default Footer;
