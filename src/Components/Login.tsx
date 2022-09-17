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
  Typography,
} from "@mui/material";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface FormLogin {
  login: string;
  password: string;
  showPassword: boolean;
}

interface Props {
  setUser: (value: string) => void;
}

export default function Login({ setUser }: Props) {
  const navigate = useNavigate();

  const [values, setValues] = React.useState<FormLogin>({
    login: "",
    password: "",
    showPassword: false,
  });

  const [loginError, setLoginError] = React.useState<boolean>(false);

  const handleChange = (prop: keyof FormLogin) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [prop]: event.target.value,
      });
    };
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const sendForm = () => {
    api
      .post("/autenticacao/login", {
        username: values.login,
        password: values.password,
      })
      .then(() => {
        setUser(values.login);
        navigate("/");
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
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login">Login</InputLabel>
            <OutlinedInput
              id="login"
              label="Login"
              placeholder="Digite seu login"
              type="text"
              value={values.login}
              onChange={handleChange("login")}
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
              label="Senha"
              placeholder="Digite sua senha"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`${
                      values.showPassword ? "Ocultar" : "Mostrar"
                    } senha`}
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
          <Typography fontSize="12px" color="primary.contrastText">
            Não tem conta?
            <Link color="primary.light" href="#login">
              Cadastre-se
            </Link>
          </Typography>
          <Link color="primary.light" href="#senha" fontSize="12px">
            Esqueci minha senha
          </Link>
        </Grid>
      </Card>
    </Grid>
  );
}
