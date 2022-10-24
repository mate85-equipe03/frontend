import React from "react";
import { Typography, Button, Grid, List } from "@mui/material";
import { Add } from "@mui/icons-material";
import AttachedFile from "./AttachedFile";
import { IFile } from "../Interfaces";

interface IProps {
  inputName: string;
  label: string;
  multipleFiles: boolean;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

export default function AttachInput({
  inputName,
  label,
  files,
  setFiles,
  multipleFiles,
}: IProps) {
  const hasFiles = files && files.length !== 0;

  const deleteFile = (idToDelete: number) => {
    const filteredArray = files.filter((file) => file.id !== idToDelete);
    setFiles(filteredArray);
  };

  const editFile = (newFile: IFile) => {
    const idToEdit = newFile.id;

    const editedArray = files.map((file) => {
      return file.id === idToEdit ? newFile : file;
    });

    setFiles(editedArray);
  };

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
          Anexar arquivo{multipleFiles && "(s)"}
          <input
            id={inputName}
            name={inputName}
            type="file"
            accept=".pdf"
            multiple={multipleFiles}
            hidden
            // required
          />
        </Button>
      ) : (
        <>
          <List aria-labelledby={label} sx={{ pb: 0 }}>
            {Array.from(files)?.map((file) => (
              <AttachedFile
                key={file?.id}
                fileKey={file?.id}
                fileData={file?.fileData}
                deleteFile={deleteFile}
                editFile={editFile}
              />
            ))}
          </List>
          {multipleFiles && (
            <Grid container direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: "initial", py: 1 }}
              >
                <Add fontSize="small" />
                Adicionar arquivo(s)
                <input
                  id={inputName}
                  name={inputName}
                  type="file"
                  accept=".pdf"
                  multiple={multipleFiles}
                  hidden
                  // required
                />
              </Button>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
