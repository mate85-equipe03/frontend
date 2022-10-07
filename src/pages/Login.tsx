import React, { useContext } from "react";
import {
  Alert,
  Card,
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
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import UserContext from "../context/UserContext";
import BtnSubmitLoading from "../Components/BtnSubmitLoading";

interface ILoginData {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [loginData, setLoginData] = React.useState<ILoginData>({
    username: "",
    password: "",
  });

  // const redirecionaCadastro = () => {
  //  navigate("/cadastro");
  // };

  // const redirecionaRecuperar = () => {
  //  navigate("/recuperar");
  // };

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [loginError, setLoginError] = React.useState<boolean>(false);

  const handleChange = () => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({
        ...loginData,
        [event.target.name]: event.target.value,
      });
    };
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = (accessToken: string) => {
    const modifiedUser = { username: loginData.username, token: accessToken };
    setUser(modifiedUser);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem("user", JSON.stringify(modifiedUser));
    navigate("/");
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    api
      .post("/autenticacao/login", loginData)
      .then(({ data }) => {
        login(data?.access_token);
      })
      .catch(() => {
        setLoginError(true);
      })
      .finally(() => {
        setLoading(false);
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
          Credenciais inválidas. Tente novamente.
        </Alert>
      )}
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardHeader
          title="Login"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form id="login-form" onSubmit={sendForm}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login">Matrícula/SIAPE</InputLabel>
              <OutlinedInput
                id="login"
                name="username"
                label="Matrícula/SIAPE"
                placeholder="Digite sua Matrícula/SIAPE"
                type="text"
                value={loginData.username}
                onChange={handleChange()}
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
                value={loginData.password}
                onChange={handleChange()}
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
          </form>
        </CardContent>

        <BtnSubmitLoading label="Login" form="login-form" loading={loading} />

        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ mt: 3, p: 2, backgroundColor: "primary.main" }}
        >
          <Typography fontSize="12px" color="primary.contrastText">
            Não tem conta?&nbsp;
            <Link color="primary.light" href="/cadastro">
              Cadastre-se
            </Link>
          </Typography>
          <Link color="primary.light" fontSize="12px" href="/recuperar-senha">
            Esqueci minha senha
          </Link>
        </Grid>
      </Card>
    </Grid>
  );
}
