import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, IconButton } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteProducaoCientifica,
  getDetalhesInscricaoAluno,
  getDetalhesInscricaoProfessor,
} from "../../services/Api";
import { IProducoes } from "../../interfaces/Interfaces";
import UserContext from "../../context/UserContext";
import Loading from "../Loading";
import ModalProducao from "./ModalProducao";
import auth from "../../services/Auth";
import PDFFile from "../PDFFile";

interface IProps {
  editalId: number;
  inscricaoId: number;
}

export default function ProducoesCientificas({
  inscricaoId,
  editalId,
}: IProps) {
  const { user } = useContext(UserContext);
  const [loadingDetalhes, setIsloadingDetalhes] = useState<boolean>(false);
  const [producoes, setProducoes] = useState<IProducoes[]>([]);
  const carregaProducoes = useCallback(() => {
    if (user && editalId) {
      if (auth.isStudent()) {
        setIsloadingDetalhes(true);
        getDetalhesInscricaoAluno(Number(editalId))
          .then(({ data }) => {
            setProducoes(data.producoes);
          })
          .catch()
          .finally(() => {
            setIsloadingDetalhes(false);
          });
      } else if (auth.isTeacher()) {
        setIsloadingDetalhes(true);
        getDetalhesInscricaoProfessor(inscricaoId, Number(editalId))
          .then(({ data }) => {
            setProducoes(data.producoes);
          })
          .catch()
          .finally(() => {
            setIsloadingDetalhes(false);
          });
      }
    }
  }, [editalId, user, inscricaoId]);

  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleDelete = (producaoId: number) => {
    if (user && editalId && inscricaoId) {
      setIsloadingDetalhes(true);
      deleteProducaoCientifica(inscricaoId, producaoId)
        .then(() => carregaProducoes())
        .catch()
        .finally(() => setIsloadingDetalhes(false));
    }
  };

  useEffect(() => {
    carregaProducoes();
  }, [carregaProducoes]);

  const colunas: GridColDef[] = [
    {
      field: "filename",
      headerName: "Arquivo",
      width: auth.isStudent() ? 320 : 420,
      renderCell: (cellValues) => {
        return (
          <PDFFile
            pdfUrl={cellValues.row.url}
            pdfTitle={cellValues.row.filename}
            onClick={handleLinkClick}
          />
        );
      },
    },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 155,
      valueGetter: (params) => params.row.categorias_producao.nome,
    },
    {
      field: "nota",
      headerName: "Nota",
      width: 70,
      valueGetter: (params) => params.row.categorias_producao.pontuacao,
    },
    {
      field: "",
      headerName: "Remover",
      width: 100,
      hide: !auth.isStudent(),
      renderCell: (cellValues) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(cellValues.row.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width, hide }) => {
    return width && !hide ? acc + width : acc;
  }, 0);

  return loadingDetalhes ? (
    <Loading />
  ) : (
    <Grid
      sx={{
        mt: 2,
      }}
    >
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "categoria", sort: "asc" }],
          },
        }}
        disableSelectionOnClick
        rows={producoes}
        columns={colunas}
        sx={{
          width: allColumnsWidth + 2,
          mb: 5,
        }}
      />
      {auth.isStudent() && <ModalProducao onSuccess={carregaProducoes} />}
    </Grid>
  );
}
