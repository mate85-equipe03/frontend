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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import api from "../services/Api";
import Loading from "../Components/Loading";

interface ISignUpData {
  // pendente incluir "nome" no back
  // "matricula" e "login" duplicados, possuem mesmo valor.
  login: string;
  matricula: string;
  senha: string;
  confirmacaoSenha: string;
  semestre_pgcomp: number | string;
  curso: string;
  lattes_link: string;
  email: string;
  telefone: string;
}

export default function Cadastro() {
  const [signUpError, setSignUpError] = React.useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [nome, setNome] = React.useState<string>(""); // A ser implementado no back

  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    login: "",
    matricula: "",
    senha: "",
    confirmacaoSenha: "",
    semestre_pgcomp: "",
    curso: "",
    lattes_link: "",
    email: "",
    telefone: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value;
    if (event.target.type === "number") {
      value = Number(event.target.value);
    } else {
      value = event.target.value;
    }
    setSignUpData({
      ...signUpData,
      [event.target.name]: value,
      login: signUpData.matricula,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    // console.log(signUpData);
    event.preventDefault();
    setLoading(true);
    api
      .post("/alunos", signUpData)
      .then(() => {
        // navigate("/login");
        setSignUpSuccess(true);
        setSignUpError(false);
      })
      .catch(() => {
        setSignUpSuccess(false);
        setSignUpError(true);
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
      {signUpSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Cadastro realizado com sucesso.
        </Alert>
      )}
      {signUpError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ocorreu um erro. Tente novamente.
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
              <InputLabel htmlFor="nome">Nome</InputLabel>
              <OutlinedInput
                id="nome"
                name="nome"
                label="nome"
                placeholder="Digite seu nome completo"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="matricula">Matrícula</InputLabel>
              <OutlinedInput
                id="matricula"
                name="matricula"
                label="matricula"
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
              <InputLabel htmlFor="semestre_pgcomp">
                Semestre de ingresso no PGCOMP
              </InputLabel>
              <OutlinedInput
                id="semestre_pgcomp"
                name="semestre_pgcomp"
                label="Semestre de ingresso no PGCOMP"
                placeholder="Digite seu semestre de ingresso no PGCOMP"
                type="number"
                value={signUpData.semestre_pgcomp}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <FormLabel id="botãoSelecaoCurso">
                Curso do(a) candidado(a)
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="botãoSelecaoCurso"
                name="curso"
                value={signUpData.curso}
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
              <InputLabel htmlFor="lattes_link">
                Link para o CV Lattes
              </InputLabel>
              <OutlinedInput
                id="lattes_link"
                name="lattes_link"
                label="link para o CV Lattes"
                placeholder="www.example.com.br"
                type="url"
                value={signUpData.lattes_link}
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
                type="email"
                value={signUpData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="telefone">Telefone / Celular</InputLabel>
              <OutlinedInput
                id="telefone"
                name="telefone"
                label="Telefone / Celular"
                placeholder="(00) 00000-0000"
                type="tel"
                value={signUpData.telefone}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </CardContent>

        <CardActions sx={{ pb: 4, px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
              <Button fullWidth type="submit" form="sign-up-form" size="large" disabled={loading}>
                {loading ? <Loading/> : "Enviar" } 
              </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
