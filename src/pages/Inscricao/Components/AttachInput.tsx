import { useState } from "react";

import { Typography, Button, Grid, List } from "@mui/material";
import AttachedFile from "./AttachedFile";

interface IProps {
  name: string;
}

export default function AttachInput({ name }: IProps) {
  const [filesNames, setFilesNames] = useState<string[]>([]);
  const [isFileAttached, setIsFileAttached] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).map((f) => {
        setFilesNames( prev => [...prev, f.name] );
        setIsFileAttached(true);
      });      
    }
  };
  console.log(filesNames);

  return (
    <>
      <Typography variant="body1">{name}</Typography>

      {isFileAttached && (
        <List component="nav" aria-labelledby={name} sx={{pb:0}}>
          {filesNames?.map((file, index) => (
          <AttachedFile key={index} fileName={file} />))}
        </List>
      )}

      {isFileAttached ? (
        <Grid container direction="row" justifyContent="flex-end">
          <Button
            variant="outlined"
            component="label"
            sx={{ textTransform: "initial", py:1}}
          >
            Alterar arquivo(s)
            <input type="file" multiple hidden onChange={handleChange} />
          </Button>
        </Grid>
      ) : (
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ textTransform: "initial", py:2 }}
        >
          Anexar arquivo(s)
          <input type="file" multiple hidden onChange={handleChange} />
        </Button>
      )}
    </>
  );
}
