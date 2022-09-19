import React from "react";
import { CardMedia, Grid, Link } from "@mui/material";
import PosgressLogo from "../assets/logo-posgress/horizontal-fundo-escuro.png";

function Header() {
  return (
    <header>
      <Grid
        container
        direction="column"
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
      </Grid>
    </header>
  );
}
export default Header;
