import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
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
import { postProducao } from "../Service";

export default function ModalProducao() {
  const { editalId } = useParams();
  const [edital, setEdital] = useState<IDetails | undefined>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [idCategoria, setIdCategoria] = React.useState(-1);
  const [notaCategoria, setNotaCategoria] = React.useState("0");

  const handleChange = (event: SelectChangeEvent) => {
    const value = +event.target.value;
    setIdCategoria(value);

    const selectedCategoria = edital?.categorias_producao.find(
      (categoria) => categoria.id === value
    );
    if (selectedCategoria) {
      setNotaCategoria(selectedCategoria.pontuacao);
    }
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
        categorias_producao_id: +idCategoria,
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
    postProducao(producaoData);
    // console.log(producaoData);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <Add fontSize="small" />
        Adicionar Produção Cientifica
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-producoes-cientificas"
        scroll="paper"
        PaperProps={{
          sx: { borderRadius: 5 },
        }}
      >
        <Card sx={{ maxWidth: 600, p: 4, borderRadius: 5 }}>
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
          <CardContent sx={{ py: 5 }}>
            <form
              id="add-producao-form"
              onChange={handleFormChange}
              onSubmit={sendForm}
            >
              <DialogContent sx={{ p: 2, maxHeight: "300px" }}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <InputLabel id="select-categoria">Categoria</InputLabel>
                      <Select
                        labelId="select-categoria"
                        label="Categoria"
                        id="demo-simple-select"
                        value={idCategoria.toString()}
                        onChange={handleChange}
                      >
                        <MenuItem value="-1" disabled>
                          Selecione uma categoria
                        </MenuItem>
                        {edital?.categorias_producao.map((categoria) => (
                          <MenuItem key={categoria.id} value={categoria.id}>
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

                {/* <FormControl fullWidth margin="normal" sx={{ mt: 3 }}>
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
                    </FormControl> */}
              </DialogContent>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Button onClick={handleClose}> Fechar </Button>
                <Button type="submit" form="add-producao-form">
                  Enviar
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
