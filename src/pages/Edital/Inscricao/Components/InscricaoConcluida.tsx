import * as React from "react";
import { Grid, Link, Typography } from "@mui/material";

interface IProps {
  editalId: number;
}

export default function InscricaoConcluida({ editalId }: IProps) {
  return (
    <Grid container direction="column" sx={{ py: 3 }}>
      <Typography align="center" variant="h5">
        Parabéns!
      </Typography>
      <Typography sx={{ pt: 0.5, pb: 1.5 }} align="center">
        Sua inscrição foi concluída com sucesso.
      </Typography>
      {/* TODO: Ver link certo */}
      <Link align="center" href={`/edital/${editalId}/inscricao`}>
        Editar inscrição
      </Link>
    </Grid>
  );
}
