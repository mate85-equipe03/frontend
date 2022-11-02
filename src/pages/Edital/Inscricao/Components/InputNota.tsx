import React, { ReactComponentElement } from "react";
import { Grid, FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function inputNota() {
  return (
    <Grid container direction="row" justifyContent="space-between">
    <Grid item xs={10}>
      <FormControl fullWidth>
        <InputLabel id="select-categoria">Categoria</InputLabel>
      </FormControl>
    </Grid>
    <Grid item xs={1.7}>
      <FormControl>
        <InputLabel htmlFor="Nota">Nota</InputLabel>
        <OutlinedInput
          id="nota_categoria"
          name="nota_categoria"
          label="Nota"
          type="text"
          // value={notaCategoria}
          // inputProps={{ readOnly: true }}
          disabled
        />
      </FormControl>
    </Grid>
  </Grid>
  
//   <Grid container direction="row" justifyContent="space-between">
//       <Grid item xs={10}>
//         <FormControl fullWidth>
//           <InputLabel id="select-categoria">Categoria</InputLabel>
//         </FormControl>
//       </Grid>
//       <Grid item xs={1.7}>
//         <FormControl>
//           <InputLabel htmlFor="Nota">Nota</InputLabel>
//           <OutlinedInput
//             id="nota_categoria"
//             name="nota_categoria"
//             label="Nota"
//             type="text"
//             // value={notaCategoria}
//             // inputProps={{ readOnly: true }}
//             disabled
//           />
//         </FormControl>
//       </Grid>
//     </Grid>
  );
}
