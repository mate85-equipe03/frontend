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
      <Routes>
        {GeneralRoutes}
        {AuthRoutes}
        {ProtectedRoutes}
      </Routes>
  );
}

export default AppRoutes;
