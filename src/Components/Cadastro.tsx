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
  Link,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import api from "../api";

interface FormLogin {
  name: string;
  matricula: number;
  password: string;
  passwordConfirmation: string;
  semester: string;
  course: string;
  link: string;
  email: string;
  tel: string;
}

export default function Cadastro() {
  const [value, setValue] = React.useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const navigate = useNavigate();

  const [signUpData, setSignUpData] = React.useState<FormLogin>({
    name: "",
    matricula: 0,
    password: "",
    passwordConfirmation: "",
    semester: "",
    course: "",
    link: "",
    email: "",
    tel: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [loginError, setLoginError] = React.useState<boolean>(false);

  const handleChange = () => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpData({
        ...signUpData,
        [event.target.name]: event.target.value,
      });
    };
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = () => {
    api
      .post("/autenticacao/login ### PEGAR ENDEREÇO CORRETO COM BACKEND?? ###")
      .then(() => {
        navigate("/confirmacao");
      })
      .catch(() => {
        setLoginError(true);
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
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Informações inválidas. Tente novamente.
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
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="cadastro">Nome</InputLabel>
            <OutlinedInput
              id="nome"
              name="name"
              label="Nome"
              placeholder="Digite seu nome completo"
              type="text"
              value={signUpData.name}
              onChange={handleChange()}
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login">Matrícula</InputLabel>
            <OutlinedInput
              id="matricula"
              name="matricula"
              label="Matrícula"
              placeholder="Digite seu login"
              type="text"
              value={signUpData.matricula}
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
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="senha">Senha</InputLabel>
            <OutlinedInput
              id="senha"
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              value={signUpData.password}
              onChange={handleChange()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`${showPassword ? "Ocultar" : "Mostrar"} senha`}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="confirmacaoSenha">Confirme</InputLabel>
            <OutlinedInput
              id="confirmacaoSenha"
              name="passwordConfirm"
              label="Confirme"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "passwordConfirm"}
              value={signUpData.passwordConfirmation}
              onChange={handleChange()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`${showPassword ? "Ocultar" : "Mostrar"} senha`}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="cadastro">
              Semestre de ingresso no PGCOM
            </InputLabel>
            <OutlinedInput
              id="ingresso"
              name="semester"
              label="Semestre de ingresso no PGCOM"
              placeholder="Digite seu nome completo"
              type="text"
              value={signUpData.semester}
              onChange={handleChange()}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Grau do candidado
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleRadioChange}
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
              name="Link"
              label="Link para o CV Lattes"
              placeholder="www.example.com.br"
              type="text"
              value={signUpData.link}
              onChange={handleChange()}
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="Email"
              label="Email"
              placeholder="exemplo@email.com.br"
              type="text"
              value={signUpData.email}
              onChange={handleChange()}
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="cadastro">Telefone / Celular</InputLabel>
            <OutlinedInput
              id="tel"
              name="Tel"
              label="Telefone / Celular"
              placeholder="(00) 00000-0000"
              type="text"
              value={signUpData.tel}
              onChange={handleChange()}
            />
          </FormControl>
        </CardContent>

        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              type="submit"
              onClick={() => {
                navigate(-1);
              }}
              size="large"
            >
              Voltar
            </Button>
            <Button type="submit" onClick={sendForm} size="large">
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
          <Link color="primary.light" href="/login" fontSize="12px">
            Voltar a tela inicial
          </Link>
        </Grid>
      </Card>
    </Grid>
  );
}
