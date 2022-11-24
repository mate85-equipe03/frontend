import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
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
      <Button
        sx={{ width: "192px" }}
        color="error"
        type="button"
        size="large"
        onClick={handleClickOpen}
      >
        Excluir Inscrição
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid sx={{p:3, width: "470px" }}>
          <DialogTitle id="alert-dialog-title" sx={{ fontSize:"30px", textAlign: "center" }}>
            {
              "Confirmar exclusão"
              // "Esta ação é irreversível. Tem certeza de que deseja excluir permanentemente a sua inscrição no edital?"
            }
          </DialogTitle>
          <DialogContent sx={{mt:1, mb:2}}>
            <DialogContentText  sx={{fontSize:"18px", textAlign: "center" }} id="alert-dialog-description">
              Esta ação é irreversível. Tem certeza de que deseja excluir permanentemente a sua inscrição no edital?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid sx={{ mb: 1 }} container justifyContent="space-evenly">
              <Button color="inherit" onClick={handleClose}>
                Voltar
              </Button>
              <Button color="error" onClick={excluirInscricao} autoFocus>
                Excluir
              </Button>
            </Grid>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}
