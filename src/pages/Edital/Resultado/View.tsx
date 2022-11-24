import { useState } from "react";
import { Typography } from "@mui/material";
import Loading from "../../../Components/Loading";

export default function ResultadoEdital() {
  const [
    loading,
    setLoading, // eslint-disable-line @typescript-eslint/no-unused-vars
  ] = useState<boolean>(false);

  return loading ? <Loading /> : <Typography>Resultados</Typography>;
}
