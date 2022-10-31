import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
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
import { PatternFormat } from "react-number-format";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import BtnSubmitLoading from "../../Components/BtnSubmitLoading";
import { IDados, ISignUpData } from "./Types";
import UserContext from "../../context/UserContext";
import getDadosAluno from "./Service";
import Loading from "../../Components/Loading";

export default function Cadastro() {
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [editError, setEditError] = React.useState<boolean>(false);

  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    nome: "",
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
  const { user } = useContext(UserContext);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (event.target.name === "matricula") {
      setSignUpData({
        ...signUpData,
        matricula: value,
        login: value,
      });
    } else {
      setSignUpData({
        ...signUpData,
        [event.target.name]: value,
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (isEditar()) {
      event.preventDefault();
      setLoading(true);
      api
        .patch("/alunos/editar-inscricao", {
          nome: signUpData.nome,
          semestre_pgcomp: signUpData.semestre_pgcomp,
          curso: signUpData.curso,
          lattes_link: signUpData.lattes_link,
          email: signUpData.email,
          telefone: signUpData.telefone,
        })
        .then(() => {
          navigate("/");
          setEditError(false);
        })
        .catch(() => {
          setEditError(true);
        })
        .finally(() => {
          setLoading(false);
          // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    } else {
      event.preventDefault();
      setLoading(true);
      api
        .post("/alunos", signUpData)
        .then(() => {
          navigate("/login", { state: { signUp: true } });
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

  useEffect(() => {
    setLoading(true);
    getDadosAluno()
      .then(({ data }) => {
      if(isEditar()){
        // setDados(data);
        signUpData.nome = data.aluno.nome;
          signUpData.matricula = data.aluno.matricula;
          signUpData.semestre_pgcomp = data.aluno.semestre_pgcomp;
        signUpData.curso = data.aluno.curso;
        signUpData.lattes_link = data.aluno.lattes_link;
        signUpData.email = data.email;
        signUpData.telefone = data.telefone;
      }
      })
    .catch(() => {
      // TODO: Ver como exibir erros va View
    })
    .finally(() => {
        setLoading(false);
      });
  }, []);

  function isEditar() {
    if (user) {
      return true;
    }
    return false;
  }

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
      {signUpError ||
        (editError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ocorreu um erro. Tente novamente.
          </Alert>
        ))}
      <Card sx={{ minWidth: 275, maxWidth: 500, pb: 4 }}>
        <CardHeader
          title={`${
            isEditar() ? "Editar" : ""
          } Cadastro`}
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
                placeholder="Digite seu nome completo"
                type="text"
                value={signUpData.nome}
                // value={isEditar() ? dados?.aluno.nome : signUpData.nome}
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
                // value={isEditar() ? dados?.aluno.matricula : signUpData.matricula}
                value={signUpData.matricula}
                onChange={handleChange}
                disabled={isEditar()}
              />
            </FormControl>
            {isEditar() ? (
              <Link to="/alterar-senha" target="_blank">
                Alterar Senha
              </Link>
            ) : (
              <div>
                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="senha">Senha</InputLabel>
                <OutlinedInput
                    id="senha"
                    name="senha"
                  label="Senha"
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
              </div>
            )}

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="semestre_pgcomp">
                Semestre de ingresso no PGCOMP
              </InputLabel>
              <PatternFormat
                id="semestre_pgcomp"
                name="semestre_pgcomp"
                label="Semestre de ingresso no PGCOMP"
                placeholder="Digite seu semestre de ingresso no PGCOMP"
                type="text"
                // value={isEditar() ? dados?.aluno.semestre_pgcomp : signUpData.semestre_pgcomp}
                value={signUpData.semestre_pgcomp}
                onChange={handleChange}
                format="####.#"
                mask="_"
                customInput={OutlinedInput}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <FormLabel id="selecionar-curso">
                Curso do(a) candidato(a)
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="selecionar-curso"
                name="curso"
                // value={isEditar() ? dados?.aluno.curso : signUpData.curso}
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
                // value={isEditar() ? dados?.aluno.lattes_link : signUpData.lattes_link}
                value={signUpData.lattes_link}
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
                // value={isEditar() ? dados?.email : signUpData.email}
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
                // value={isEditar() ? dados?.telefone : signUpData.telefone}
                value={signUpData.telefone}
                onChange={handleChange}
                format="(##) #####-####"
                mask="_"
                customInput={OutlinedInput}
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <BtnSubmitLoading
              label={isEditar() ? "Salvar Alterações" : "Enviar"}
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
