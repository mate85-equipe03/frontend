import React from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import { routeWithKey } from "./RoutesHelper";
import EditalDetails from "../pages/DetalhesEdital";
import ResultadoEdital from "../pages/ResultadoEdital";

const publicRoutes: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "*", element: <PageNotFound /> },
  { path: "/edital/:editalId/detalhes", element: <EditalDetails /> },
  { path: "/edital/:editalId/resultado", element: <ResultadoEdital /> },
];

const PublicRoutes = (): JSX.Element[] =>
  publicRoutes.map((route) => {
    return routeWithKey(route);
  });

export default PublicRoutes;
