import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import theme from "./Theme";
import Home from "./Components/Home";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            bgcolor: "primary.main",
            height: 80,
            minWidth: 300,
            px: 4,
            py: 0.5,
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Header />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            minHeight: "calc(100vh - 160px)",
            minWidth: 300,
            px: 4,
            py: 5,
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            bgcolor: "primary.main",
            minHeight: 80,
            minWidth: 300,
            px: 4,
            py: 2,
            alignContent: "center",
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
