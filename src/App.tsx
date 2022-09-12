import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import theme from "./Theme";
import Home from "./Components/Home";
import React from "react";

function App() {
  // TODO: Usar React Context futuramente
  const [user, setUser] = React.useState<string>("");

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{
          minHeight: "calc(100vh - 160px)",
          minWidth: "400px",
          px: 3,
          py: 5,
        }}
      >
        <Grid item>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home user={user} setUser={setUser}/>} />
              <Route path="/login" element={<Login setUser={setUser} />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
