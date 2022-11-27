import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  CardActions,
  Typography,
  Alert,
} from "@mui/material";

import { PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { NomesEtapasEnum } from "../enums/Enums";
import { postNovoEdital } from "../services/Api";
import { IDatasEtapas, ICadastroEdital } from "../interfaces/Interfaces";
import BtnSubmitLoading from "../components/BtnSubmitLoading";
import InputData from "../components/InputData";

export default function NovoEdital() {
  const navigate = useNavigate();

  const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false);
  const [novoEditalError, setNovoEditalError] = React.useState<boolean>(false);

  const [cadastroEdital, setCadastroEdital] = React.useState<ICadastroEdital>({
    titulo: "",
    descricao: "",
    semestre: "",
    edital_url: "",
    etapa_inscricao_inicio: "",
    etapa_inscricao_fim: "",
    etapa_analise_inicio: "",
    etapa_analise_fim: "",
    etapa_resultado_inicio: "",
    etapa_resultado_fim: "",
  });

  const [datas, setDatas] = React.useState<IDatasEtapas>({
    etapa_inscricao_inicio: null,
    etapa_inscricao_fim: null,
    etapa_analise_inicio: null,
    etapa_analise_fim: null,
    etapa_resultado_inicio: null,
    etapa_resultado_fim: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCadastroEdital({
      ...cadastroEdital,
      [event.target.name]: event.target.value,
    });
  };

  const formatData = (data: Dayjs | null) => {
    return data ? data.format("YYYY/MM/DD") : "";
  };

  useEffect(() => {
    // Formata datas
    setCadastroEdital((prevState) => {
      return {
        ...prevState,
        etapa_inscricao_inicio: formatData(datas.etapa_inscricao_inicio),
        etapa_inscricao_fim: formatData(datas.etapa_inscricao_fim),
        etapa_analise_inicio: formatData(datas.etapa_analise_inicio),
        etapa_analise_fim: formatData(datas.etapa_analise_fim),
        etapa_resultado_inicio: formatData(datas.etapa_resultado_inicio),
        etapa_resultado_fim: formatData(datas.etapa_resultado_fim),
      };
    });
  }, [datas]);

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);

    postNovoEdital(cadastroEdital)
      .then(() => {
        setNovoEditalError(false);
        navigate("/", { state: { novoEdital: true } });
      })
      .catch(() => {
        setNovoEditalError(true);
      })
      .finally(() => {
        setLoadingBtn(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {novoEditalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ocorreu um erro. Tente novamente.
        </Alert>
      )}
      <Card sx={{ minWidth: 275, maxWidth: 500, pb: 4 }}>
        <CardHeader
          title="Cadastrar Processo Seletivo"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />
        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form id="novo-edital-form" onSubmit={sendForm}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="titulo">Título</InputLabel>
              <OutlinedInput
                id="titulo"
                name="titulo"
                label="Título"
                placeholder="Digite o título do edital"
                type="text"
                value={cadastroEdital.titulo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="descricao">Descrição</InputLabel>
              <OutlinedInput
                id="descricao"
                name="descricao"
                label="Descrição"
                placeholder="Digite a descrição do edital"
                type="text"
                value={cadastroEdital.descricao}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="Semestre Vigente">
                Semestre Vigente
              </InputLabel>
              <PatternFormat
                id="semestre"
                name="semestre"
                label="Semestre Vigente"
                placeholder="Digite o semestre vigente"
                type="text"
                value={cadastroEdital.semestre}
                onChange={handleChange}
                format="####.#"
                mask="_"
                customInput={OutlinedInput}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="edital_url">URL do Edital</InputLabel>
              <OutlinedInput
                id="edital_url"
                name="edital_url"
                label="URL do Edital"
                placeholder="Digite a URL do edital"
                type="url"
                value={cadastroEdital.edital_url}
                onChange={handleChange}
              />
            </FormControl>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Etapas
            </Typography>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.INSCRICOES_ABERTAS}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_inscricao"
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.ANALISE_DE_INSCRICOES}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_analise"
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.RESULTADO_FINAL}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_resultado"
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <BtnSubmitLoading
              label="Enviar"
              formId="novo-edital-form"
              loading={loadingBtn}
              fullWidth
            />
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
