import React from "react";
import { Link, SxProps, Theme } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface IProps {
  pdfUrl: string;
  pdfTitle: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: SxProps<Theme>;
}

export default function PDFFile({ pdfUrl, pdfTitle, onClick, sx }: IProps) {
  return (
    <Link
      href={pdfUrl}
      target="_blank"
      underline="none"
      onClick={onClick}
      sx={sx}
    >
      <PictureAsPdfIcon fontSize="small" sx={{ mr: 0.5 }} />
      {pdfTitle}
    </Link>
  );
}

PDFFile.defaultProps = {
  onClick: undefined,
  sx: {},
};
