import React from "react";
import { Typography, Button, Grid, List } from "@mui/material";
import { Add } from "@mui/icons-material";
import AttachedFile from "./AttachedFile";
import { IPropsAttachInput } from "../Interfaces";

export default function AttachInput({
  inputName,
  label,
  files,
  setFiles,
}: IPropsAttachInput) {
  const hasFiles = files && files.length !== 0;

  const deleteFile = (indexToDelete: number) => {
    const filteredArray = files.filter((file) => file.id !== indexToDelete);
    setFiles(filteredArray);
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
          Anexar arquivo(s)
          <input
            id={inputName}
            name={inputName}
            type="file"
            accept=".pdf"
            multiple
            hidden
            // required
          />
        </Button>
      ) : (
        <>
          <List aria-labelledby={label} sx={{ pb: 0 }}>
            {Array.from(files)?.map((file) => (
              <AttachedFile
                key={file.id}
                fileKey={file.id}
                fileName={file.fileData.name}
                deleteFile={deleteFile}
              />
            ))}
          </List>
          <Grid container direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "initial", py: 1 }}
            >
              <Add fontSize="small" />
              Anexar arquivo(s)
              <input
                id={inputName}
                name={inputName}
                type="file"
                accept=".pdf"
                multiple
                hidden
                // required
              />
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
