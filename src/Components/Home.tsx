import React, { useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
            Hello, {user?.username}!
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
