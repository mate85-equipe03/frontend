import React from "react";
import { Button, Dialog, DialogActions, DialogTitle, Grid } from "@mui/material";
import { deleteInscricao } from "./Service";

interface PropsModal {
  idInscricao: number;
  onSuccess: () => void;
}

export default function DeleteInscricao({
  idInscricao,
  onSuccess,
}: PropsModal) {
  const excluirInscricao = () => {
    deleteInscricao(idInscricao)
      .then(({ data }) => {
        console.log(data);
        // setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        handleClose();
        onSuccess();
        // setLoading(false);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" type="button" size="large" onClick={handleClickOpen}>
        Cancelar Inscrição
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja excluir a inscrição?"}
        </DialogTitle>
        {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Descrição
            </DialogContentText>
          </DialogContent> */}
        <DialogActions>
          <Grid sx={{mb:2}} container justifyContent="space-evenly">
            <Button color="inherit" onClick={handleClose}>
              Voltar
            </Button>
            <Button onClick={excluirInscricao} autoFocus>
              Confirmar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
