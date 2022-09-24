import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { IDetails } from "./Types";
import getDetailsProcessoSeletivo from "./Service";
import { Button, Grid, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  //const [loading, setLoading] = useState<boolean>(true); Definir se faz sentido usar
  const [isInscrito, setIsInscrito] = useState<boolean>(true);
  const {edital_id} = useParams();

  const redirectToSubscribe  = () => {
    navigate("/definir"); //Definir rota de inscrição
  };

  useEffect(() => {
    //setLoading(true);
    getDetailsProcessoSeletivo(edital_id)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        //setLoading(false);
      });
  }, []);
  return (
    <div>
      <h2>{edital?.titulo}</h2>
      <h2>{edital?.descricao}</h2>
      <h2>{edital?.semestre}</h2>
      <h2>{edital?.edital_url}</h2>
      {edital?.arquivado ?(
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontSize: 20, color: "primary.main" }}>
        Resultados disponíveis
        </Typography>
      </Grid>
        
      ) : (
        
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {(user && isInscrito) ?(
              <Typography sx={{ fontSize: 20, color: "primary.main" }}>
              Inscrito(a)
              </Typography>
            ) : (
              <Button type="button" onClick={redirectToSubscribe} size="large">
              Inscreva-se
              </Button>
            )}
            
          </Grid>    
      )}
      
    </div>
  );
}
