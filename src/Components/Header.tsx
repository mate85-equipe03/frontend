import React, { useContext } from "react";
import { Button, CardMedia, Grid, Link } from "@mui/material";
import PosgressLogo from "../assets/logos/posgress/horizontal-fundo-escuro.png";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === "/login";
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <header>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: 80 - 8 }}
      >
        <Link href="/" sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            image={PosgressLogo}
            alt="Logo Posgress"
            sx={{ height: "100%" }}
          />
        </Link>

        {!isLogin && (
          <Grid alignItems="center">
            <Button variant="outlined" color="secondary" type="button" onClick={user ? logout : redirectToLogin}>
              {user ? "Sair" : "Login"}
            </Button>            
          </Grid>
        )}
      </Grid>
    </header>
  );
}
export default Header;
