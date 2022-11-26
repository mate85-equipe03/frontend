import React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  valueSenha: string;
  valueConfirmacaoSenha: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Senhas({ valueSenha, valueConfirmacaoSenha, handleChange }: IProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <FormControl required fullWidth margin="normal">
        <InputLabel htmlFor="senha">Senha</InputLabel>
        <OutlinedInput
          id="senha"
          name="senha"
          label="Senha"
          placeholder="Digite sua senha"
          type={showPassword ? "text" : "password"}
          value={valueSenha}
          onChange={handleChange}
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
        <InputLabel htmlFor="confirmacaoSenha">Confirme sua senha</InputLabel>
        <OutlinedInput
          id="confirmacaoSenha"
          name="confirmacaoSenha"
          label="Confirme sua senha"
          placeholder="Confirme sua senha"
          type={showPassword ? "text" : "password"}
          value={valueConfirmacaoSenha}
          onChange={handleChange}
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
    </div>
  );
}
export default Senhas;
