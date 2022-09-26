import {
  Grid,
  Button,
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
            <FormControl required fullWidth margin="normal">
              {/* Visível apenas para mestrandos calouros  */}
              <AttachInput
                name={"Histórico acadêmico de curso(s) de graduação"}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <AttachInput
                name={
                  "Histórico acadêmico de curso(s) de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              {/* Será gerado pelo sistema - abrir popup */}
              <AttachInput name={"Produções Científicas"} />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <AttachInput
                name={"Publicações em PDF listadas no currículo lattes"}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
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
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 1 }}
            >
              <Button type="submit" form="inscricao-form" size="large">
                Enviar
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
