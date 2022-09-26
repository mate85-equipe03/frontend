import React from "react";
import {
  Typography,
  Button,
  Grid,
  List,
  Link,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import AttachedFile from "./AttachedFile";

interface IFile {
  id: number;
  fileData: File;
}

interface IProps {
  inputName: string;
  label: string;
  countFiles: number;
  setCountFiles: React.Dispatch<React.SetStateAction<number>>;
  // files: IFile | null;
  // setFiles: (files: IFile | null) => void;
}

export default function Attach({
  inputName,
  label,
  countFiles,
  setCountFiles,
}: IProps) {
  const [files, setFiles] = React.useState<IFile[]>([]);
  const [hasFiles, setHasFiles] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventFiles = event.target.files;
    let currentCount = countFiles;
    if (eventFiles) {
      const newFiles = Array.from(eventFiles)?.map((file) => {
        return { id: ++currentCount, fileData: file };
      });
      setCountFiles(currentCount);
      setHasFiles(true);
      setFiles([...files, ...newFiles]);
    }
  };

  const deleteFile = (indexToDelete: number) => {
    console.log(files);
    const filteredArray = files.filter((file) => file.id !== indexToDelete);
    console.log(filteredArray);
    setFiles(filteredArray);
  };

  const deleteAllFiles = () => {
    setFiles([]);
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

        {hasFiles && (
          <IconButton
            aria-label="Excluir todos os arquivos."
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
            onChange={handleChange}
            // required
          />
        </Button>
      ) : (
        <>
          <List aria-labelledby={label} sx={{ pb: 0 }}>
            {files?.map((file) => {
              return (
                <AttachedFile
                  key={file.id}
                  fileKey={file.id}
                  fileName={file.fileData.name}
                  deleteFile={deleteFile}
                />
              );
            })}
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
                onChange={handleChange}
                // required
              />
            </Link>
          </Grid>
        </>
      )}
    </>
  );
}
