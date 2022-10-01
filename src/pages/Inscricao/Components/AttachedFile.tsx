import React from "react";
import { Delete } from "@mui/icons-material";
import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import {IPropsAttachFile} from "../Interfaces";

export default function AttachedFile({
  fileKey,
  fileName,
  deleteFile,
}: IPropsAttachFile) {
  const handleDeleteFile = () => {
    deleteFile(fileKey);
  };
  
  return (
    <ListItem sx={{ border: 1, my: 1, py: 1, borderRadius: 1 }}>
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
          {fileName}
        </Typography>
        <IconButton aria-label="Excluir arquivo." onClick={handleDeleteFile}>
          <Delete color="error" />
        </IconButton>
      </Grid>
    </ListItem>
  );
}
