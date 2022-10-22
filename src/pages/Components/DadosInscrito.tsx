import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { IAluno } from "../RevisarInscricao/Interfaces";

interface IProps {
  dadosInscrito: IAluno | undefined;
}

function DadosAlunos({ dadosInscrito }: IProps) {
  return (
    <>
      {dadosInscrito && (
        <List
          component="nav"
          aria-labelledby="dados-inscrito"
          subheader={
            <ListSubheader
              id="dados-inscrito"
              color="primary"
              sx={{
                fontSize: 20,
                paddingLeft: 0,
              }}
            >
              Dados do Inscrito
            </ListSubheader>
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

export default DadosAlunos;
