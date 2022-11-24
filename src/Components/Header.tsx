import React, { useContext } from "react";
import { Button, CardMedia, Grid, Link } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PosgressLogo from "../assets/logos/sisbolsas/horizontal-fundo-escuro.png";
import UserContext from "../context/UserContext";
import AccountMenu from "./AccountMenu";

function Header() {
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === "/login";
  const isCadastro = useLocation().pathname === "/cadastro";
  const { user } = useContext(UserContext);

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <header>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
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
        {user ? (
          <AccountMenu />
        ) : (
          <Grid>
            {!isCadastro && !isLogin && (
              <Button
                variant="text"
                disableRipple
                onClick={redirectToCadastro}
                sx={{ mr: 1 }}
              >
                Cadastre-se
              </Button>
            )}
            {!isLogin && (
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={redirectToLogin}
                sx={{ textTransform: "initial" }}
              >
                Login
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </header>
  );
}
export default Header;
