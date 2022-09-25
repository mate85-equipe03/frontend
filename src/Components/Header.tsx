import React, { useContext } from "react";
import { Button, CardMedia, Grid, Link } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PosgressLogo from "../assets/logos/posgress/horizontal-fundo-escuro.png";
import UserContext from "../context/UserContext";
import AccountMenu from "./AccountMenu";

function Header() {
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === "/login";
  const { user } = useContext(UserContext);

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
        {!isLogin &&
          (user ? (
            <AccountMenu />
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={redirectToLogin}
            >
              Login
            </Button>
          ))}
      </Grid>
    </header>
  );
}
export default Header;
