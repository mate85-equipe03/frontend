import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import getDetailsProcessoSeletivo from "../../Detalhes/Service";
import AttachInput from "./AttachInput";
import { IDetails } from "../../Detalhes/Interfaces";
import { IFile, IProducao } from "../Interfaces";
import UserContext from "../../../../context/UserContext";
import {postProducao} from "../Service";

export default function ModalProducao() {
  const { editalId } = useParams();
  const [edital, setEdital] = useState<IDetails | undefined>();

  const { user } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notaCategoria, setNotaCategoria] = React.useState("-1");
  const handleChange = (event: SelectChangeEvent) => {
    setNotaCategoria(event.target.value as string);
  };

  const [producaoData, setProducaoData] = React.useState<IProducao>({
    categorias_producao_id: 0,
    files: [],
  });

  const setProducaoFile = (producaoFile: IFile[]) => {
    setProducaoData({
      ...producaoData,
      files: producaoFile,
    });
  };

  useEffect(() => {
    // setLoadingEdital(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEdital(data);
        console.log(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoadingEdital(false);
      });
  }, [editalId]);

  const [countFiles, setCountFiles] = useState<number>(0);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const previousValue = producaoData.files;
    const isPreviousValueAnArray = previousValue instanceof Array;
    const previousFiles: IFile[] = isPreviousValueAnArray ? previousValue : [];

    let currentCount = countFiles;
    const eventFiles: File[] = event.target.files;
    if (eventFiles) {
      const newFiles = Array.from(eventFiles)?.map((file) => {
        return { id: ++currentCount, fileData: file };
      });

      setCountFiles(currentCount);
      setProducaoData({
        ...producaoData,
        categorias_producao_id: +notaCategoria,
        files: [...previousFiles, ...newFiles],
      });
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.type === "file") {
      handleFileInputChange(event);
    }
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(producaoData);
    postProducao(producaoData);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <Add fontSize="small" />
        Adicionar Produção Cientifica
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-producoes-cientificas"
        // aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ minWidth: 500, maxWidth: 600, mt: 5 }}>
              <CardHeader
                title="Adicionar Produção Científica"
                titleTypographyProps={{
                  align: "center",
                  variant: "h4",
                  p: 1,
                }}
                sx={{ px: 3 }}
                // subheader="O qualis das publicações será o mais atual aprovado pela CAPES."
                // subheaderTypographyProps={{ align: "center" }}
              />
              <Divider sx={{ mx: 3 }} />

              <form
                id="add-producao-form"
                onChange={handleFormChange}
                onSubmit={sendForm}
              >
                <CardContent sx={{ px: 5 }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={10}>
                        <FormControl fullWidth>
                          <InputLabel id="select-categoria">
                            Categoria
                          </InputLabel>
                          <Select
                            labelId="select-categoria"
                            label="Categoria"
                            id="demo-simple-select"
                            value={notaCategoria}
                            onChange={handleChange}
                          >
                            <MenuItem value="-1" disabled>
                              Selecione uma categoria
                            </MenuItem>
                            {edital?.categorias_producao.map((categoria) => (
                              <MenuItem
                                key={categoria.id}
                                // value={categoria.pontuacao}
                                value={categoria.id}
                              >
                                {categoria.nome}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1.7}>
                        <FormControl>
                          <InputLabel htmlFor="Nota">Nota</InputLabel>
                          <OutlinedInput
                            id="nota_categoria"
                            name="nota_categoria"
                            label="Nota"
                            type="text"
                            value={notaCategoria}
                            inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <FormControl required fullWidth margin="normal">
                      <AttachInput
                        inputName="producao_cientifica_file"
                        label="Anexo"
                        files={producaoData.files}
                        setFiles={setProducaoFile}
                      />
                    </FormControl>

                    <FormControl fullWidth margin="normal" sx={{ mt: 3 }}>
                      <InputLabel htmlFor="url_publicacao">
                        Link para a publicação
                      </InputLabel>
                      <OutlinedInput
                        id="url_publicacao"
                        name="url_publicacao"
                        label="Link para a publicação"
                        placeholder="Link para a publicação"
                        type="url"
                      />
                    </FormControl>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mt: 2 }}
                    >
                      <Button onClick={handleClose}> Fechar </Button>
                      <Button type="submit" form="add-producao-form">
                        {" "}
                        Enviar{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
