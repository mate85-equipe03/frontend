import { ListItem, Typography  } from "@mui/material";

interface IProps {
  fileName: string;
}

export default function AttachedFile({ fileName }: IProps) {
  return (
    <ListItem sx={{border:1, my:1, borderRadius:1 }}>
        <Typography variant="body2"> {fileName} </Typography>
    </ListItem>

  );
}
