import React from "react";
import {
  Alert,
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
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import api from "../services/Api";

interface ISignUpData {
  name: string;
  matricula: number | undefined;
  senha: string;
  confirmacaoSenha: string;
  semestre: string;
  grau: string;
  link: string;
  email: string;
  tel: string;
}

export default function Cadastro() {
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = React.useState<boolean>(false);

  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    name: "",
    matricula: undefined,
    senha: "",
    confirmacaoSenha: "",
    semestre: "",
    grau: "",
    link: "",
    email: "",
    tel: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/????", signUpData)
      .then(() => {
        navigate("/");
      })
      // .then(() => {
      //  console.log(signUpData);
      // })
      //.catch(() => {
      //  setSignUpError(true);
      //});
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {signUpError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Credenciais inválidas. Tente novamente.
        </Alert>
      )}
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardHeader
          title="Cadastro"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form id="sign-up-form" onSubmit={sendForm}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="name">Nome</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                label="name"
                placeholder="Digite seu nome completo"
                type="text"
                value={signUpData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="matricula">Matrícula</InputLabel>
              <OutlinedInput
                id="matricula"
                name="matricula"
                label="Matrícula"
                placeholder="Digite sua matrícula"
                type="text"
                value={signUpData.matricula}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="senha">Senha</InputLabel>
              <OutlinedInput
                id="senha"
                name="senha"
                label="senha"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                value={signUpData.senha}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={`${
                        showPassword ? "Ocultar" : "Mostrar"
                      } senha`}
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="confirmacaoSenha">
                Confirme sua senha
              </InputLabel>
              <OutlinedInput
                id="confirmacaoSenha"
                name="confirmacaoSenha"
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                type={showPassword ? "text" : "password"}
                value={signUpData.confirmacaoSenha}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={`${
                        showPassword ? "Ocultar" : "Mostrar"
                      } senha`}
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="semestre">
                Semestre de ingresso no PGCOMP
              </InputLabel>
              <OutlinedInput
                id="semestre"
                name="semestre"
                label="Semestre de ingresso no PGCOMP"
                placeholder="Digite seu semestre de ingresso no PGCOMP"
                type="text"
                value={signUpData.semestre}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <FormLabel id="botãoSelecaoGrau">
                Grau do(a) candidado(a)
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="botãoSelecaoGrau"
                name="grau"
                value={signUpData.grau}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Mestrado"
                  control={<Radio />}
                  label="Mestrado"
                />
                <FormControlLabel
                  value="Doutorado"
                  control={<Radio />}
                  label="Doutorado"
                />
              </RadioGroup>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="link">Link para o CV Lattes</InputLabel>
              <OutlinedInput
                id="link"
                name="link"
                label="link para o CV Lattes"
                placeholder="www.example.com.br"
                type="text"
                value={signUpData.link}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="Email"
                placeholder="exemplo@email.com.br"
                type="text"
                value={signUpData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="tel">Telefone / Celular</InputLabel>
              <OutlinedInput
                id="tel"
                name="tel"
                label="Telefone / Celular"
                placeholder="(00) 00000-0000"
                type="text"
                value={signUpData.tel}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </CardContent>

        <CardActions sx={{ pb: 4, px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Button fullWidth type="submit" form="sign-up-form" size="large">
              Enviar
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
