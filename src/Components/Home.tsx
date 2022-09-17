import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  user: string;
  setUser: (value: string) => void;
}

export default function Home({ user, setUser }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    setUser("");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {user ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography variant="h3" align="center">
            Hello, {user}!
          </Typography>
          <Button type="button" onClick={logout} size="large">
            Sair
          </Button>
        </Grid>
      ) : (
        <Button type="button" onClick={redirectToLogin} size="large">
          Login
        </Button>
      )}
    </Grid>
  );
}
