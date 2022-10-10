import React, { useEffect } from "react";
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
import getDetailsProcessoSeletivo from "../../Detalhes/Service";
import { useParams } from "react-router-dom";
import AttachInput from "./AttachInput";

export default function ModalProducao() {
  const { editalId } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notaCategoria, setNotaCategoria] = React.useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setNotaCategoria(event.target.value as string);
    console.log(notaCategoria);
  };

  useEffect(() => {
    // setLoadingEdital(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoadingEdital(false);
      });
  }, []);
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
            position: "absolute" as "absolute",
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
                        <InputLabel id="select-categoria">Categoria</InputLabel>
                        <Select
                          labelId="select-categoria"
                          label="Categoria"
                          id="demo-simple-select"
                          value={notaCategoria}
                          onChange={handleChange}
                        >
                          <MenuItem value="0" disabled>
                            Selecione uma categoria
                          </MenuItem>
                          <MenuItem value="10">A1</MenuItem>
                          <MenuItem value="20">A2</MenuItem>
                          <MenuItem value="30">A3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1.5}>
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
                      // files={inscricaoData.historico_posgraduacao_file}
                      // setFiles={setHistoricosPosGraduacao}
                    />
                  </FormControl>

                  <FormControl
                    required
                    fullWidth
                    margin="normal"
                    sx={{ mt: 3 }}
                  >
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
                    <Button> Enviar </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
