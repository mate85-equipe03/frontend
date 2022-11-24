import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteInscricao } from "./Service";

interface PropsModal {
  idInscricao: number;
  onSuccess: () => void;
}

export default function DeleteInscricao({
  idInscricao,
  onSuccess,
}: PropsModal) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const excluirInscricao = () => {
    deleteInscricao(idInscricao)
      .then(() => {
        handleClose();
        onSuccess();
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      });
  };

  return (
    <>
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
        <Grid sx={{ p: 3, width: "470px" }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontSize: "30px", textAlign: "center" }}
          >
            Confirmar Exclusão
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: 1, mb: 2 }}>
            <DialogContentText
              sx={{ fontSize: "18px", textAlign: "center" }}
              id="alert-dialog-description"
            >
              Esta ação é irreversível. Tem certeza de que deseja excluir
              permanentemente a sua inscrição no edital?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid
              sx={{ mb: 1, mx: 3 }}
              container
              justifyContent="space-between"
            >
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
