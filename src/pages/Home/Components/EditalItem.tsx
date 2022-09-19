import React, { useContext } from "react";
import { Grid, Typography, ListItemText, ListItemButton } from "@mui/material";
import { IEdital } from "../Types";
import UserContext from "../../../context/UserContext";
import moment from "moment";

interface IProps {
  edital: IEdital;
}

export default function EditalItem({ edital }: IProps) {
  const isEditalAberto = edital.etapas.length > 0;
  const { user, setUser } = useContext(UserContext);

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

  return (
    <ListItemButton sx={{ mx: 2 }} divider>
      <ListItemText>
        <Grid container direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 14 }}>{edital?.titulo}</Typography>
          {user && (
            <Typography sx={{ fontSize: 10, color: "primary.main" }}>
              Inscrito(a)
            </Typography>
          )}
        </Grid>
        <Typography sx={{ fontSize: 10, mr: 2 }}>
          {isEditalAberto
            ? `${edital?.etapas[0]?.name} - Até ${dateToStr(
                edital?.etapas[0]?.data_fim
              )}`
            : "Resultados disponíveis"}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}