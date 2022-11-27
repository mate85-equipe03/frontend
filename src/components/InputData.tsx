import React from "react";

import { FormControl, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IDatasEtapas } from "../interfaces/Interfaces";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  datas: IDatasEtapas;
  setDatas: (datas: IDatasEtapas) => void;
  etapa: string;
}

export default function InputData({ datas, setDatas, etapa }: IProps) {
  const etapaInicio = etapa + "_inicio";
  const etapaFim = etapa + "_fim";

  const dataInicio = datas ? (datas as any)[etapaInicio] : null;
  const data = datas ? (datas as any)[etapaFim] : null;

  return (
    <>
      <FormControl required>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Data de Fim"
            inputFormat="DD/MM/YYYY"
            value={data}
            onChange={(newData) => {
              setDatas({
                ...datas,
                [etapaFim]: newData,
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
}
