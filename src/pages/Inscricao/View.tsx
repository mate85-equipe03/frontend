import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AttachInput from "./Components/AttachInput";

export default function Inscricao() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 5 }}>
        <CardHeader
          title="Inscrição em Processo Seletivo"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          sx={{ px: 3 }}
          subheader="Edital 03/2022 de Concessão de Bolsas de Mestrado e Doutorado - PGCOMP"
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form id="inscricao-form">

            <AttachInput name={"Histórico acadêmico de curso(s) de graduação"} />

            <FormControl required fullWidth margin="normal">
              {/* Visível apenas para mestrandos calouros  */}
              <InputLabel htmlFor="enade">
                Link para o ENADE do seu curso de graduação
              </InputLabel>
              <OutlinedInput
                id="enade"
                name="enade"
                label="Link para o ENADE do seu curso de graduação"
                placeholder="emec.mec.gob.br"
                type="text"
                //value={}
                //onChange={}
              />
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
