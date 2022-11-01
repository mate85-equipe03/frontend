import * as React from "react";
import { Grid, Link, Typography } from "@mui/material";

export default function InscricaoConcluida() {
  return (
    <Grid container direction="column" sx={{ py: 3 }}>
      <Typography align="center" variant="h5">
        Parabéns!
      </Typography>
      <Typography sx={{ pt: 0.5, pb: 1.5 }} align="center">
        Sua inscrição foi concluída com sucesso.
      </Typography>
      {/* TODO: Ver link certo */}
      <Link align="center" href="/">
        Editar inscrição
      </Link>
    </Grid>
  );
}
