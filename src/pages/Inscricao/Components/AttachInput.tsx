import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  List,
  Link,
  IconButton,
} from "@mui/material";
import AttachedFile from "./AttachedFile";
import { IInscricaoData } from "../Interfaces";
import { Add, Delete, NoLuggageOutlined } from "@mui/icons-material";

interface IProps {
  inputName: string;
  label: string;
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
}

export default function AttachInput({
  inputName,
  label,
  files,
  setFiles,
}: IProps) {
  const deleteFile = (indexToDelete: number) => {
    // const filteredArray = files ? Array.from(files)?.filter((_, index) => index !== indexToDelete) : null;
    // setFiles(filteredArray);
  };

  const deleteAllFiles = () => {
    setFiles(null);
  };

  const hasFiles = files && files.length !== 0;

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

        {hasFiles && (
          <IconButton
            aria-label="Excluir todos os arquivo."
            onClick={deleteAllFiles}
          >
            <Delete color="error" />
          </IconButton>
        )}
      </Grid>

      {!hasFiles ? (
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ textTransform: "initial", py: 2 }}
        >
          Anexar arquivo(s)
          <input
            id={inputName}
            name={inputName}
            type="file"
            accept=".pdf"
            multiple
            hidden
            //required
          />
        </Button>
      ) : (
        <>
          <List aria-labelledby={label} sx={{ pb: 0 }}>
            {Array.from(files)?.map((file, index) => (
              <AttachedFile
                key={index}
                fileKey={index}
                fileName={file?.name}
                deleteFile={deleteFile}
              />
            ))}
          </List>
          <Grid container direction="row" justifyContent="flex-end">
            <Link fontSize="14px" component="label" sx={{ cursor: "pointer" }}>
              <Grid container alignItems="center">
                <Add fontSize="small" />
                <Typography
                  sx={{ fontWeight: "bold", pl: 0.3 }}
                  variant="body2"
                >
                  Adicionar arquivo(s)
                </Typography>
              </Grid>
              <input
                id={inputName}
                name={inputName}
                type="file"
                accept=".pdf"
                multiple
                hidden
                //required
              />
            </Link>
          </Grid>
        </>
      )}
    </>
  );
}
