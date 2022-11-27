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
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import { IRecoverData } from "../interfaces/Interfaces";

export default function Recuperar() {
  const navigate = useNavigate();

  const [recoverData, setrecoverData] = React.useState<IRecoverData>({
    matricula: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setrecoverData({
      ...recoverData,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.post("/????", recoverData).then(() => {
      navigate("/");
    });
    // .then(() => {
    //  console.log(recoverData);
    // });
    // .catch();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {/* {signUpError && (
      //<Alert severity="error" sx={{ mb: 2 }}>
      Credenciais inválidas. Tente novamente.
      </Alert>
      )}  */}

      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardHeader
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
          title="Esqueceu a senha?"
          subheader="Informe sua matrícula ou SIAPE que enviaremos o passo-a-passo para recupera-lá"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form onSubmit={sendForm}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="matricula">Matrícula/SIAPE</InputLabel>
              <OutlinedInput
                id="matricula"
                name="matricula"
                label="Matrícula/SIAPE"
                placeholder="Digite sua matricula/SIAPE"
                type="text"
                value={recoverData.matricula}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </CardContent>

        <CardActions sx={{ pb: 4, px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="center" alignItems="center">
            <Button fullWidth type="submit" size="large">
              Recuperar senha
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
