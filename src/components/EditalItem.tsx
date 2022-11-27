import React from "react";
import moment from "moment";
import { Grid, Typography, ListItemText, ListItemButton } from "@mui/material";
import { IEdital } from "../interfaces/Interfaces";
// import UserContext from "../../../context/UserContext";

interface IProps {
  edital: IEdital;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function EditalItem({ edital, onClick }: IProps) {
  const isEditalAberto = edital.etapas.length > 0;
  // const { user } = useContext(UserContext);

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

  return (
    <ListItemButton sx={{ mx: 2 }} divider onClick={onClick}>
      <ListItemText>
        <Grid container direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 14 }}>{edital?.titulo}</Typography>
          {/* {user && (
            <Typography sx={{ fontSize: 10, color: "primary.main" }}>
              Inscrito(a)
            </Typography>
          )} */}
        </Grid>
        <Typography sx={{ fontSize: 10, mr: 2 }}>
          {isEditalAberto
            ? `${edital?.etapas[0]?.name}
            - Até 
            ${dateToStr(edital?.etapas[0]?.data_fim)}`
            : "Resultados disponíveis"}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}
