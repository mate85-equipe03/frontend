import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import GeneralRoutes from "./GeneralRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

/*
  Mais detalhes sobre cada tipo de rota encontram-se nos respectivos arquivos
*/

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralRoutes}
        {AuthRoutes}
        {ProtectedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
