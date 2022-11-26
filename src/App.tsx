import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import theme from "./themes/Theme";
import { UserContextProvider } from "./context/UserContext";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
              <AppRoutes />
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
        </BrowserRouter>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
