import { List, ListItem, ListItemText, Link, Typography } from "@mui/material";
import { IAluno } from "../Revisao/RevisarInscricao/Interfaces";

interface IProps {
  dadosInscrito: IAluno | undefined;
}

function DadosCandidato({ dadosInscrito }: IProps) {
  return (
    <List
      component="nav"
      aria-labelledby="dados-inscrito"
      subheader={
        <Typography variant="h6" sx={{ mt: 1 }}>
          Dados do Candidato
        </Typography>
      }
    >
      {dadosInscrito && (
        <>
          <ListItem>
            <ListItemText primary={dadosInscrito.nome} />
          </ListItem>
          <ListItem>
            <ListItemText primary={dadosInscrito.curso} />
          </ListItem>
          <ListItem>
            <ListItemText primary={dadosInscrito.matricula} />
          </ListItem>
          <ListItem>
            <Link href={dadosInscrito.lattes_link} target="blank">
              Currículo Lattes
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );
}

export default DadosCandidato;
