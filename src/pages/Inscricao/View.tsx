import React from "react";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";
import AttachInput from "./Components/AttachInput";
import { IInscricaoData } from "./Interfaces";

const requiredCheckboxes = [
  "Li e estou ciente dos critérios de concessão de bolsa, tal qual estabelecida na Resolução 01/2022 - PGCOMP.",
  "Meu (minha) orientador(a) tem ciência da minha participação nesse Edital de Concessão de Bolsas.",
  "Venho, por meio deste formulário, requerer uma bolsa de estudos do PGCOMP. Tenho ciência de que, para receber bolsa de estudos, preciso ter dedicação exclusiva ao curso.",
];

export default function Inscricao() {
  const [inscricaoData, setInscricaoData] = React.useState<IInscricaoData>({
    historicosGraduacao: null,
    historicosPosGraduacao: null,
    producoesCientificas: null,
    enade: "",
    checkboxes: [false, false, false], // TODO: Ver como deixar a quantidade variável (não sempre 3)
  });

  const setHistoricosGraduacao = (historicosGraduacao: FileList | null) => {
    setInscricaoData({
      ...inscricaoData,
      historicosGraduacao,
    });
  };

  const setHistoricosPosGraduacao = (
    historicosPosGraduacao: FileList | null
  ) => {
    setInscricaoData({
      ...inscricaoData,
      historicosPosGraduacao,
    });
  };

  const setProducoesCientificas = (producoesCientificas: FileList | null) => {
    setInscricaoData({
      ...inscricaoData,
      producoesCientificas,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { checkboxes } = inscricaoData;
    checkboxes[Number(event.target.name)] = event.target.checked;

    setInscricaoData({
      ...inscricaoData,
      checkboxes,
    });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const newFiles = event.target.files;
    const previousFiles =
      inscricaoData[event.target.name as keyof IInscricaoData];

    if (!previousFiles) {
      setInscricaoData({
        ...inscricaoData,
        [event.target.name]: newFiles,
      });
    } else {
      setInscricaoData({
        ...inscricaoData,
        [event.target.name]: [...previousFiles, ...newFiles],
      });
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.type === "checkbox") {
      handleCheckboxChange(event);
    } else if (event.target.type === "file") {
      handleFileInputChange(event);
    } else {
      setInscricaoData({
        ...inscricaoData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(inscricaoData);
  };

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
          <form
            id="inscricao-form"
            onChange={handleFormChange}
            onSubmit={sendForm}
          >
            <FormControl required fullWidth margin="normal">
              {/* Visível apenas para mestrandos calouros  */}
              <AttachInput
                inputName="historicosGraduacao"
                label="Histórico acadêmico de curso(s) de graduação"
                files={inscricaoData.historicosGraduacao}
                setFiles={setHistoricosGraduacao}
                // value={inscricaoData.historicosGraduacao}
                // formValues={inscricaoData}
                // setFormValues={setInscricaoData}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <AttachInput
                inputName="historicosPosGraduacao"
                label="Histórico acadêmico de curso(s) de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
                files={inscricaoData.historicosPosGraduacao}
                setFiles={setHistoricosPosGraduacao}
                // value={inscricaoData.historicosPosGraduacao}
                // formValues={inscricaoData}
                // setFormValues={setInscricaoData}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              {/* Será gerado pelo sistema - abrir popup */}
              <AttachInput
                inputName="producoesCientificas"
                label="Produções Científicas"
                files={inscricaoData.producoesCientificas}
                setFiles={setProducoesCientificas}
                // value={inscricaoData.producoesCientificas}
                // formValues={inscricaoData}
                // setFormValues={setInscricaoData}
              />
            </FormControl>

            {/* <FormControl required fullWidth margin="normal">
              <AttachInput
                name={"Publicações em PDF listadas no currículo lattes"}
              />
            </FormControl> */}

            <FormControl required fullWidth margin="normal" sx={{ mt: 3 }}>
              <InputLabel htmlFor="enade">
                Link para o ENADE do seu curso de graduação
              </InputLabel>
              <OutlinedInput
                id="enade"
                name="enade"
                label="Link para o ENADE do seu curso de graduação"
                placeholder="emec.mec.gov.br"
                type="text"
                value={inscricaoData.enade}
              />
            </FormControl>

            <FormControl
              required
              fullWidth
              margin="normal"
              sx={{
                color: "#00000099",
                mt: 3,
              }}
            >
              <Typography variant="body1" sx={{ pb: 1 }}>
                Marque as opções que se aplicam:
              </Typography>

              <FormGroup>
                {requiredCheckboxes.map((checkbox, index) => {
                  return (
                    <FormControlLabel
                      sx={{
                        py: 1,
                      }}
                      key={index}
                      control={
                        <Checkbox
                          required
                          id={`checkbox-${index}`}
                          name={`${index}`}
                          checked={inscricaoData.checkboxes[index]}
                        />
                      }
                      label={checkbox}
                    />
                  );
                })}
              </FormGroup>
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
