import React, { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

/*
  Mais detalhes sobre cada tipo de rota encontram-se nos respectivos arquivos
*/

function AppRoutes() {
  const location = useLocation();
  const InitalRoutes: JSX.Element[] = [
    ...PublicRoutes(),
    ...AuthRoutes(),
    ...ProtectedRoutes(),
  ];

  const [AllRoutes, setAllRoutes] = useState<JSX.Element[]>(InitalRoutes);

  useEffect(() => {
    setAllRoutes([...PublicRoutes(), ...AuthRoutes(), ...ProtectedRoutes()]);
  }, [location]);

  return <Routes>{AllRoutes}</Routes>;
}

export default AppRoutes;
