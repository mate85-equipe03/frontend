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
import { IInscricaoData, IFile } from "./Interfaces";

const requiredCheckboxes = [
  {
    id: 0,
    value: false,
    desc: "Li e estou ciente dos critérios de concessão de bolsa, tal qual estabelecida na Resolução 03/2022 - PGCOMP.",
  },
  {
    id: 1,
    value: false,
    desc: "Meu (minha) orientador(a) tem ciência da minha participação nesse Edital de Concessão de Bolsas.",
  },
  {
    id: 2,
    value: false,
    desc: "Venho, por meio deste formulário, requerer uma bolsa de estudos do PGCOMP. Tenho ciência de que, para receber bolsa de estudos, preciso ter dedicação exclusiva ao curso.",
  },
];

export default function Inscricao() {
  const [countFiles, setCountFiles] = React.useState<number>(0);

  const [inscricaoData, setInscricaoData] = React.useState<IInscricaoData>({
    historicosGraduacao: [],
    historicosPosGraduacao: [],
    producoesCientificas: [],
    enade: "",
    checkboxes: requiredCheckboxes, // TODO: Ver como deixar a quantidade variável (não sempre 3)
  });

  const setHistoricosGraduacao = (historicosGraduacao: IFile[]) => {
    setInscricaoData({
      ...inscricaoData,
      historicosGraduacao,
    });
  };

  const setHistoricosPosGraduacao = (historicosPosGraduacao: IFile[]) => {
    setInscricaoData({
      ...inscricaoData,
      historicosPosGraduacao,
    });
  };

  const setProducoesCientificas = (producoesCientificas: IFile[]) => {
    setInscricaoData({
      ...inscricaoData,
      producoesCientificas,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    inscricaoData.checkboxes[Number(event.target.name)].value =
      event.target.checked;

    setInscricaoData({
      ...inscricaoData,
    });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const previousFiles =
      inscricaoData[event.target.name as keyof IInscricaoData];

    const eventFiles = event.target.files;
    let currentCount = countFiles;
    if (eventFiles) {
      const newFiles = Array.from(eventFiles)?.map((file) => {
        currentCount += 1;
        return { id: currentCount, fileData: file };
      });

      setCountFiles(currentCount);
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
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <AttachInput
                inputName="historicosPosGraduacao"
                label="Histórico acadêmico de curso(s) de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
                files={inscricaoData.historicosPosGraduacao}
                setFiles={setHistoricosPosGraduacao}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              {/* Será gerado pelo sistema - abrir popup */}
              <AttachInput
                inputName="producoesCientificas"
                label="Produções Científicas"
                files={inscricaoData.producoesCientificas}
                setFiles={setProducoesCientificas}
              />
            </FormControl>

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
                {requiredCheckboxes.map((checkbox) => {
                  return (
                    <FormControlLabel
                      sx={{
                        py: 1,
                      }}
                      key={checkbox.id}
                      control={
                        <Checkbox
                          required
                          id={`checkbox-${checkbox.id}`}
                          name={`${checkbox.id}`}
                          checked={checkbox.value}
                        />
                      }
                      label={checkbox.desc}
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
