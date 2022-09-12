import React from "react";
import { Grid, Link } from "@mui/material";
import PosgressLogo from "../assets/posgress-horizontal.png";

function Header() {
  return (
    <header>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          bgcolor: "primary.light",
          px: "2em",
          height: "100px",
        }}
      >
        <Link href="/">
          <img src={PosgressLogo} alt="PGCOMP UFBA" height="100px" />
        </Link>
      </Grid>
    </header>
  );
}
export default Header;
