import React, { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import GeneralRoutes from "./GeneralRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

/*
  Mais detalhes sobre cada tipo de rota encontram-se nos respectivos arquivos
*/

function AppRoutes() {
  const location = useLocation();
  const initalRoutes = [...GeneralRoutes, ...AuthRoutes, ...ProtectedRoutes];

  const [AllRoutes, setAllRoutes] = useState<JSX.Element[]>(initalRoutes);

  useEffect(() => {
    setAllRoutes([...GeneralRoutes, ...AuthRoutes, ...ProtectedRoutes]);
  }, [location]);

  return <Routes>{AllRoutes}</Routes>;
}

export default AppRoutes;
