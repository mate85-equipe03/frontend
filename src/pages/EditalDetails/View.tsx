import React, { useEffect, useState } from "react";
import { IDetails } from "./Types";
import getDetailsProcessoSeletivo from "./Service";

export default function EditalDetails() {
  const [edital, setEdital] = useState<IDetails | undefined>();

  useEffect(() => {
    getDetailsProcessoSeletivo()
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);
  return (
    <div>
      <h2>{edital?.titulo}</h2>
      <h2>{edital?.descricao}</h2>
      <h2>{edital?.semestre}</h2>
      <h2>{edital?.edital_url}</h2>
    </div>
  );
}
