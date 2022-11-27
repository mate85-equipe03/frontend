import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IDatasEtapas } from "../interfaces/Interfaces";

interface IProps {
  datas: IDatasEtapas;
  setDatas: (datas: IDatasEtapas) => void;
  etapa: string;
}

export default function InputData({ datas, setDatas, etapa }: IProps) {
  const etapaInicio = `${etapa}_inicio`;
  const etapaFim = `${etapa}_fim`;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const dataInicio = datas ? (datas as any)[etapaInicio] : null;
  const dataFim = datas ? (datas as any)[etapaFim] : null;

  return (
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
              label="Data de Inicio"
              inputFormat="DD/MM/YYYY"
              value={dataInicio}
              onChange={(newData) => {
                setDatas({
                  ...datas,
                  [etapaInicio]: newData,
                });
              }}
              /* eslint-disable react/jsx-props-no-spreading */
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      {etapa !== "etapa_resultado" && (
        <>
          <Grid item>
            <Typography> até </Typography>
          </Grid>

          <Grid item xs={5.3}>
            <FormControl required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Data de Fim"
                  inputFormat="DD/MM/YYYY"
                  value={dataFim}
                  onChange={(newData) => {
                    setDatas({
                      ...datas,
                      [etapaFim]: newData,
                    });
                  }}
                  /* eslint-disable react/jsx-props-no-spreading */
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
