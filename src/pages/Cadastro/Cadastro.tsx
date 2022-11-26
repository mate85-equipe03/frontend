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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import api, { getDadosAluno } from "../../services/Api";
import BtnSubmitLoading from "../../components/BtnSubmitLoading";
import { ISignUpData } from "../../interfaces/Interfaces";
import UserContext from "../../context/UserContext";
import Loading from "../../components/Loading";
import Senhas from "../../components/Senhas";

export default function Cadastro() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [signUpError, setSignUpError] = React.useState<boolean>(false);
  const [editError, setEditError] = React.useState<boolean>(false);
  const [senhaError, setSenhaError] = React.useState<boolean>(false);

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

  function isEditar() {
    if (user) {
      return true;
    }
    return false;
  }

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditar()) {
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
          navigate("/", { state: { edit: true } });
          setEditError(false);
        })
        .catch(() => {
          setEditError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (signUpData.senha !== signUpData.confirmacaoSenha) {
      setSenhaError(true);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
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
        if (user) {
          setSignUpData((oldValue) => {
            return {
              ...oldValue,
              nome: data.aluno.nome,
              matricula: String(data.aluno.matricula),
              semestre_pgcomp: String(data.aluno.semestre_pgcomp),
              curso: data.aluno.curso,
              lattes_link: data.aluno.lattes_link,
              email: data.email,
              telefone: data.telefone,
            };
          });
        }
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

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
          title={isEditar() ? "Editar Dados Pessoais" : "Cadastro"}
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
                disabled={isEditar()}
              />
            </FormControl>
            {isEditar() ? (
              <Link to="/alterar-senha" target="_blank">
                Alterar Senha
              </Link>
            ) : (
              <Senhas
                valueSenha={signUpData.senha}
                valueConfirmacaoSenha={signUpData.confirmacaoSenha}
                handleChange={handleChange}
              />
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
