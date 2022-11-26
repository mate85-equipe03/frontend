import { List, ListItem, Link, Typography } from "@mui/material";
import { IAluno } from "../../interfaces/Interfaces";

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
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              &#8226;&emsp;Nome:&nbsp;&nbsp;
            </Typography>
            <Typography>{dadosInscrito.nome}</Typography>
          </ListItem>
          <ListItem>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              &#8226;&emsp;Curso:&nbsp;&nbsp;
            </Typography>
            <Typography>{dadosInscrito.curso}</Typography>
          </ListItem>
          <ListItem>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              &#8226;&emsp;Matrícula:&nbsp;&nbsp;
            </Typography>
            <Typography>{dadosInscrito.matricula}</Typography>
          </ListItem>
          <ListItem>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              &#8226;&emsp;
            </Typography>
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
