import { Button, Card, CardHeader, Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function NotArchived() {
  const navigate = useNavigate();

  const { editalId } = useParams();

  const redirectToEnroll = () => {
    navigate(`/edital/${editalId}/inscricao`);
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card>
        <CardHeader
          title="Edital em andamento"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
          }}
          sx={{ px: 3 }}
          subheader="Ainda é possível se inscrever pelo botão abaixo"
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Box textAlign="center">
          <Button
            type="button"
            onClick={redirectToEnroll}
            size="large"
            sx={{
              mb: 2,
            }}
          >
            Inscreva-se
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
