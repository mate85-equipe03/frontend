import React from "react";
import { Typography, Button, Grid, List } from "@mui/material";
import { Add } from "@mui/icons-material";
import ProducoesView from "./ProducoesView";
import { IPropsProducoesInput } from "../Interfaces";

export default function Producoes({
  inputName,
  label,
  //   categorias,
  producoes,
  setProducoes,
}: IPropsProducoesInput) {
  const hasFiles = producoes && producoes.length !== 0;

  const deleteFile = (indexToDelete: number) => {
    const filteredArray = producoes.filter((prod) => prod.id !== indexToDelete);
    setProducoes(filteredArray);
  };

  console.log("prod");
  console.log(producoes);
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Typography
          component="label"
          htmlFor={inputName}
          sx={{
            cursor: "pointer",
            color: "#00000099",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {label} *
        </Typography>
      </Grid>

      {!hasFiles ? (
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ textTransform: "initial", py: 2 }}
        >
          Adicionar item
          <input
            id={inputName}
            name={inputName}
            type="file"
            accept=".pdf"
            multiple
            hidden
            // required
          />
        </Button>
      ) : (
        <>
          <List aria-labelledby={label} sx={{ pb: 0 }}>
            {Array.from(producoes)?.map((prod) => (
              <Grid key={prod.id}>
                <ProducoesView
                //   key={prod.id}
                  fileKey={prod.id}
                  fileName={prod.fileData.name}
                  deleteFile={deleteFile}
                />
                <Typography>Categoria: {prod.categoria_producao_id}</Typography> 
              </Grid>
            ))}
          </List>
          <Grid container direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "initial", py: 1 }}
            >
              <Add fontSize="small" />
              Adicionar item
              <input
                id={inputName}
                name={inputName}
                type="file"
                accept=".pdf"
                multiple
                hidden
                // required
              />
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
