import React from "react";
import { Grid, Typography, ListItemText, ListItemButton } from "@mui/material";
import { IEditalAberto, IEditalEncerrado } from "../pages/Home";

interface IProps {
  edital: IEditalAberto | IEditalEncerrado;
}

export default function EditalItem({ edital }: IProps) {
  const isEditalAberto = "etapa" in edital;
  return (
    <ListItemButton sx={{ mx: 2 }} divider>
      <ListItemText>
        <Grid container direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 14 }}>{edital?.nome}</Typography>
          {edital?.inscrito && (
            <Typography sx={{ fontSize: 10, color: "primary.main" }}>
              Inscrito(a)
            </Typography>
          )}
        </Grid>
        <Typography sx={{ fontSize: 10, mr: 2 }}>
          {isEditalAberto
            ? `${edital?.etapa?.nome} - Até ${edital?.etapa?.data_fim}`
            : "Resultados disponíveis"}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}
