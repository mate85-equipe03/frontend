import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ minHeight: "calc(100vh - 160px)", minWidth:"400px", px: 3, py: 5, }}
      >
        <Grid item>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
