import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface FormLogin {
  matricula: string;
}

interface Props {
  setUser: (value: string) => void;
}

export default function Recover({ setUser }: Props) {
  const navigate = useNavigate();

  const [recoverData, setrecoverData] = React.useState<FormLogin>({
    matricula: "",
  });

  const handleChange = () => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setrecoverData({
        ...recoverData,
        [event.target.name]: event.target.value,
      });
    };
  };

  const sendForm = () => {
    api.post("/autenticacao/login", recoverData).then(() => {
      setUser(recoverData.matricula);
      navigate("/");
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardHeader
          sx={{
            justifyContent: "center",
          }}
          title="Esqueceu a senha?"
          subheader="Entre sua matrícula que enviaremos o passo-a-passo para recupera-lá"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="matricula">Matrícula</InputLabel>
            <OutlinedInput
              id="matricula"
              name="matricula"
              label="Matricula"
              placeholder="Digite sua matricula"
              type="text"
              value={recoverData.matricula}
              onChange={handleChange()}
              endAdornment={
                <InputAdornment position="end">
                  <Tooltip title="Discentes devem informar a matrícula. Docentes devem informar o SIAPE.">
                    <IconButton>
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
          </FormControl>
        </CardContent>

        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="center" alignItems="center">
            <Button fullWidth type="submit" onClick={sendForm} size="large">
              Login
            </Button>
          </Grid>
        </CardActions>

        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ mt: 3, p: 2, backgroundColor: "primary.main" }}
        >
          <Link color="primary.light" href="/" fontSize="12px">
            Voltar à tela inicial
          </Link>
        </Grid>
      </Card>
    </Grid>
  );
}
