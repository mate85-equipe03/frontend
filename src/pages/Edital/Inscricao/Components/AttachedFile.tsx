import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, ListItemButton, ListItemText } from "@mui/material";
import { IFile } from "../../../../interfaces/Interfaces";

interface IProps {
  fileKey: number;
  fileData: File;
  deleteFile: (id: number) => void;
  editFile: (file: IFile) => void;
  disabled?: boolean;
}

export default function AttachedFile({
  fileKey,
  fileData,
  deleteFile,
  editFile,
  disabled,
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
    <ListItemButton
      sx={{
        py: 1,
        border: 1,
        borderRadius: 1,
        borderColor: "#00000044",
        height: "56px",
      }}
      onClick={openInNewTab}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Grid
          item
          sx={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <ListItemText
            sx={{
              color: "#00000099",
            }}
          >
            {fileData?.name}
          </ListItemText>
        </Grid>
        {!disabled && (
          <Grid item>
            <Grid
              container
              spacing={0.5}
              direction="row"
              justifyContent="flex-end"
              wrap="nowrap"
            >
              <Grid item>
                <IconButton
                  component="label"
                  aria-label="Editar arquivo."
                  onClick={handleEditClick}
                >
                  <Edit />
                  <input
                    onChange={handleEditFile}
                    type="file"
                    accept=".pdf"
                    hidden
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Excluir arquivo."
                  onClick={handleDeleteClick}
                >
                  <Delete color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ListItemButton>
  );
}

AttachedFile.defaultProps = { disabled: false };
