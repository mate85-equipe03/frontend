import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "curso", headerName: "Curso", width: 130 },
  { field: "semestre", headerName: "Semestre de Ingresso", width: 200 },
];

const rows = [
  { id: 1, nome: "Rodrigo Meliande", curso: "Mestrado", semestre: 2022.1 },
  { id: 2, nome: "Beatriz Cerqueira", curso: "Mestrado", semestre: 2022.1 },
  { id: 3, nome: "Frederico Durão", curso: "Doutorado", semestre: 2022.2 },
  { id: 4, nome: "Stark", curso: "Doutorado", semestre: 2022.1 },
  { id: 5, nome: "Targaryen", curso: "Mestrado", semestre: 2022.1 },
  { id: 6, nome: "Melisandre", curso: "Mestrado", semestre: 2022.2 },
  { id: 7, nome: "Clifford", curso: "Mestrado", semestre: 2021.1 },
  { id: 8, nome: "Frances", curso: "Doutorado", semestre: 2018.1 },
  { id: 9, nome: "Roxie", curso: "Mestrado", semestre: 2019.1 },
  { id: 11, nome: "Rodrigo Meliande", curso: "Mestrado", semestre: 2022.1 },
  { id: 12, nome: "Beatriz Cerqueira", curso: "Mestrado", semestre: 2022.1 },
  { id: 13, nome: "Frederico Durão", curso: "Doutorado", semestre: 2022.2 },
  { id: 14, nome: "Stark", curso: "Doutorado", semestre: 2022.1 },
  { id: 15, nome: "Targaryen", curso: "Mestrado", semestre: 2022.1 },
  { id: 16, nome: "Melisandre", curso: "Mestrado", semestre: 2022.2 },
  { id: 17, nome: "Clifford", curso: "Mestrado", semestre: 2021.1 },
  { id: 18, nome: "Frances", curso: "Doutorado", semestre: 2018.1 },
  { id: 19, nome: "Roxie", curso: "Mestrado", semestre: 2019.1 },
];

export default function EnrolledTable() {
  return (
    <div style={{ height: 500, width: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
