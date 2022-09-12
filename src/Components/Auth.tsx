import * as React from "react";
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
  Typography,
} from "@mui/material";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

interface FormLogin {
  login: string;
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const [values, setValues] = React.useState<FormLogin>({
    login: "",
    password: "",
    showPassword: false,
  });

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
    // console.log(values);
  };

  return (
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

      <CardContent sx={{ px: 10 }}>
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
                  }senha`}
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </CardContent>

      <CardActions sx={{ px: 10 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            fullWidth
            type="submit"
            onClick={sendForm}
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Grid>
      </CardActions>

      <Grid
        container
        direction="column"
        alignItems="center"
        className="text-sm"
        sx={{ mt: 3, p: 2, backgroundColor: "primary.light" }}
      >
        <Typography>
          Não tem conta? <Link href="#login">Cadastre-se</Link>
        </Typography>
        <Link href="#senha">Esqueci minha senha</Link>
      </Grid>
    </Card>
  );
}
