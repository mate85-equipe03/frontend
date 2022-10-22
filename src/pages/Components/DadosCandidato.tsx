import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";
import { IAluno } from "../RevisarInscricao/Interfaces";

interface IProps {
  dadosInscrito: IAluno | undefined;
}

function DadosCandidato({ dadosInscrito }: IProps) {
  return (
    <>
      {dadosInscrito && (
        <List
          component="nav"
          aria-labelledby="dados-inscrito"
          subheader={
            <Typography variant="h6" sx={{mt:3}}>Dados do Candidato</Typography>
          }
        >
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
        </List>
      )}
    </>
  );
}

export default DadosCandidato;
