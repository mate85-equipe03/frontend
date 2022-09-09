import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Components/Auth"
import Header from "./Components/Header";
import Login from "./Components/Login";
import Footer from "./Components/Footer";


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
