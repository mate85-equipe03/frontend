import React from "react";
import { Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface IProps {
  isInscrito: boolean;
}

export default function Inscrito({ isInscrito }: IProps) {
  return isInscrito ? (
    <Grid sx={{ color: "success.main", fontWeight: "bold" }}>
      <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
      Inscrito(a)
    </Grid>
  ) : (
    <Grid sx={{ color: "error.main", fontWeight: "bold" }}>
      <CancelIcon fontSize="small" sx={{ mr: 0.5 }} />
      Não Inscrito(a)
    </Grid>
  );
}
