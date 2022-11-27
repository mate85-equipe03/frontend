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
  TextFieldProps,
  Box,
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
    dayjs("2022-11-28T18:50:00")
  );


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditalData({
      ...editalData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeDate = (newValue: Dayjs | null) => {
    setData(newValue);
  };

  handleChangeDate;
  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // setLoading(true);

    console.log(editalData);

    api.post("/processos-seletivos", editalData).then((data) => {
      console.log(data);
      //     navigate("/login", { state: { signUp: true } });
      //     setSignUpError(false);
    });
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Inscrições inicio"
                inputFormat="DD/MM/YYYY"
                value={data}
                onChange={handleChangeDate}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => <TextField {...params} />}
              />
            </LocalizationProvider>

            {/* 
            etapa_inscricao_inicio
            etapa_inscricao_fim
            etapa_analise_inicio
            etapa_analise_fim
            etapa_resultado_inicio
            etapa_resultado_fim 
            */}
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
