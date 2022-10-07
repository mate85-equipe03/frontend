import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import { IFile } from "../Interfaces";

interface IProps {
  fileKey: number;
  fileData: File;
  deleteFile: (id: number) => void;
  editFile: (file: IFile) => void;
}

export default function AttachedFile({
  fileKey,
  fileData,
  deleteFile,
  editFile,
}: IProps) {
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteFile(fileKey);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleEditFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const eventFiles = event.target.files;
    if (eventFiles) {
      const newFile: IFile = {
        id: fileKey,
        fileData: eventFiles[0],
      };
      editFile(newFile);
    }
  };

  const openInNewTab = () => {
    const fileURL = URL.createObjectURL(fileData);
    window.open(fileURL, "_blank");
  };

  return (
    <ListItem
      sx={{ my: 1, py: 1, cursor: "pointer", border: 1, borderRadius: 1 }}
      onClick={openInNewTab}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Typography
          sx={{
            color: "#00000099",
          }}
        >
          {fileData?.name}
        </Typography>
        <Grid>
          <IconButton
            component="label"
            aria-label="Editar arquivo."
            onClick={handleEditClick}
          >
            <Edit color="warning" />
            <input onChange={handleEditFile} type="file" accept=".pdf" hidden />
          </IconButton>
          <IconButton aria-label="Excluir arquivo." onClick={handleDeleteClick}>
            <Delete color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
}
