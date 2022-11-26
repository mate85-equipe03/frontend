import React, { useContext, useEffect } from "react";
import {
  Alert,
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
import { PatternFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import api, { getDadosAluno } from "../services/Api";
import BtnSubmitLoading from "../components/BtnSubmitLoading";
import { ISignUpDataTeacher } from "../interfaces/Interfaces";
import UserContext from "../context/UserContext";
import Loading from "../components/Loading";
import Senhas from "../components/Senhas";

export default function CadastroTeacher() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [signUpError, setSignUpError] = React.useState<boolean>(false);
  const [editError, setEditError] = React.useState<boolean>(false);
  const [senhaError, setSenhaError] = React.useState<boolean>(false);

  const [signUpData, setSignUpData] = React.useState<ISignUpDataTeacher>({
    nome: "",
    login: "",
    siape: "",
    senha: "",
    confirmacaoSenha: "",
    email: "",
    telefone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (event.target.name === "siape") {
      setSignUpData({
        ...signUpData,
        siape: value,
        login: value,
      });
    } else {
      setSignUpData({
        ...signUpData,
        [event.target.name]: value,
      });
    }
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signUpData.senha !== signUpData.confirmacaoSenha) {
      setSenhaError(true);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      api
        .post("/professores", signUpData)
        .then(() => {
          navigate("/", { state: { signUp: true } });
          setSignUpError(false);
        })
        .catch(() => {
          setSignUpError(true);
        })
        .finally(() => {
          setLoading(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {senhaError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          As senhas não são iguais. Tente novamente.
        </Alert>
      )}
      {(signUpError || editError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ocorreu um erro. Tente novamente.
        </Alert>
      )}
      <Card sx={{ minWidth: 275, maxWidth: 500, pb: 4 }}>
        <CardHeader
          title={"Cadastro de Professor"}
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
                label="Nome"
                placeholder="Digite o nome completo do professor"
                type="text"
                value={signUpData.nome}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="siape">SIAPE</InputLabel>
              <OutlinedInput
                id="siape"
                name="siape"
                label="SIAPE"
                placeholder="Digite o SIAPE"
                type="text"
                value={signUpData.siape}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="E-mail"
                placeholder="exemplo@email.com.br"
                type="email"
                value={signUpData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="telefone">Telefone / Celular</InputLabel>
              <PatternFormat
                id="telefone"
                name="telefone"
                label="Telefone / Celular"
                placeholder="(00) 00000-0000"
                type="tel"
                value={signUpData.telefone}
                onChange={handleChange}
                format="(##) #####-####"
                mask="_"
                customInput={OutlinedInput}
              />
            </FormControl>
            <Senhas
                valueSenha={signUpData.senha}
                valueConfirmacaoSenha={signUpData.confirmacaoSenha}
                handleChange={handleChange}
            />
          </form>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <BtnSubmitLoading
              label={"Enviar"}
              formId="sign-up-form"
              loading={loading}
              fullWidth
            />
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
