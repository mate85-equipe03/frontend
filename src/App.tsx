import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Grid item>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
