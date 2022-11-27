import React, { useContext, useEffect, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { PatternFormat } from "react-number-format";
import BtnSubmitLoading from "../components/BtnSubmitLoading";
import { IEditalData } from "../interfaces/Interfaces";
import api from "../services/Api";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function NovoEdital() {
  const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false);

  const [editalData, setEditalData] = React.useState<IEditalData>({
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

  const [data, setData] = React.useState<Dayjs | null>(
    // dayjs("2022-11-28T18:50:00")
    dayjs("2022/11/28")
  );

  interface IDatasEtapas {
    etapa_inscricao_inicio: Dayjs | null;
    etapa_inscricao_fim: Dayjs | null;
    etapa_analise_inicio: Dayjs | null;
    etapa_analise_fim: Dayjs | null;
    etapa_resultado_inicio: Dayjs | null ;
    etapa_resultado_fim: Dayjs | null ;
  }

  const [datas, setDatas] = React.useState<IDatasEtapas>({
    // dayjs("2022/11/28")
    etapa_inscricao_inicio: null,
    etapa_inscricao_fim: null,
    etapa_analise_inicio: null,
    etapa_analise_fim: null,
    etapa_resultado_inicio: null,
    etapa_resultado_fim: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditalData({
      ...editalData,
      [event.target.name]: event.target.value,
    });
  };

  const formatData = (data: Dayjs | null) => {
    return data ? data.format("YYYY/MM/DD") : "";
  };

  useEffect(()=>{
    //Formata datas
    setEditalData({
      ...editalData,
      etapa_resultado_inicio: formatData(datas.etapa_resultado_inicio),
      etapa_resultado_fim: formatData(datas.etapa_resultado_fim),
    });
  },[datas]);
  
  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(datas);
    console.log(editalData);

    // setLoading(true);

    // api.post("/processos-seletivos", editalData).then((data) => {
    //   console.log(data);
    //   //     navigate("/login", { state: { signUp: true } });
    //   //     setSignUpError(false);
    // });
    //   .catch(() => {
    //     setSignUpError(true);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    //   });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 500, pb: 4 }}>
        <CardHeader
          title={"Cadastrar Processo Seletivo"}
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
              <InputLabel htmlFor="titulo">Titulo</InputLabel>
              <OutlinedInput
                id="titulo"
                name="titulo"
                label="Titulo"
                placeholder="Digite o título do edital"
                type="text"
                value={editalData.titulo}
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
                value={editalData.descricao}
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
                value={editalData.semestre}
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
                value={editalData.edital_url}
                onChange={handleChange}
              />
            </FormControl>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Etapas
            </Typography>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}> Inscrições </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_inscricao_inicio">
                      Data de Inicio
                    </InputLabel>
                    <PatternFormat
                      id="etapa_inscricao_inicio"
                      name="etapa_inscricao_inicio"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_inscricao_inicio}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <Typography> até </Typography>
                </Grid>

                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_inscricao_fim">
                      Data de Fim
                    </InputLabel>
                    <PatternFormat
                      id="etapa_inscricao_fim"
                      name="etapa_inscricao_fim"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_inscricao_fim}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}> Análise </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_analise_inicio">
                      Data de Inicio
                    </InputLabel>
                    <PatternFormat
                      id="etapa_analise_inicio"
                      name="etapa_analise_inicio"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_analise_inicio}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <Typography> até </Typography>
                </Grid>

                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_analise_fim">
                      Data de Fim
                    </InputLabel>
                    <PatternFormat
                      id="etapa_analise_fim"
                      name="etapa_analise_fim"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_analise_fim}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>

            {/* <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}> Resultados </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_resultado_inicio">
                      Data de Inicio
                    </InputLabel>
                    <PatternFormat
                      id="etapa_resultado_inicio"
                      name="etapa_resultado_inicio"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_resultado_inicio}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <Typography> até </Typography>
                </Grid>

                <Grid item xs={5}>
                  <FormControl required>
                    <InputLabel htmlFor="etapa_resultado_fim">
                      Data de Fim
                    </InputLabel>
                    <PatternFormat
                      id="etapa_resultado_fim"
                      name="etapa_resultado_fim"
                      label="Data de Inicio"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={editalData.etapa_resultado_fim}
                      onChange={handleChange}
                      format="##/##/####"
                      mask="_"
                      customInput={OutlinedInput}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl> */}

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="etapa_resultado_fim"
                inputFormat="DD/MM/YYYY"
                value={datas.etapa_resultado_fim}
                onChange={(newData) => {
                  setDatas({
                    ...datas,
                    etapa_resultado_fim: newData,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}> Resultados </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={5.3}>
                  <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Data de Inicio" //Resultados
                        inputFormat="DD/MM/YYYY"
                        value={datas.etapa_resultado_inicio}
                        onChange={(newData) => {
                          setDatas({
                            ...datas,
                            etapa_resultado_inicio: newData,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item>
                  <Typography> até </Typography>
                </Grid>

                <Grid item xs={5.3}>
                  <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Data de Fim" //Resultados
                        inputFormat="DD/MM/YYYY"
                        value={datas.etapa_resultado_fim}
                        onChange={(newData) => {
                          setDatas({
                            ...datas,
                            etapa_resultado_fim: newData,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <BtnSubmitLoading
              label={"Enviar"}
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
