import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardHeader
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
          title="Verifique o email cadastrado"
          subheader="Enviamos um passo-a-passo para recuperar sua senha"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }} />

        <CardActions sx={{ pb: 4, px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="center" alignItems="center">
            <Button
              fullWidth
              type="submit"
              size="large"
              onClick={redirectToHome}
            >
              Voltar à página inicial
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
