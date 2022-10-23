import React from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/Home/View";
import PageNotFound from "../pages/PageNotFound/View";
import { routeWithKey } from "./RoutesHelper";
import EditalDetails from "../pages/Edital/Detalhes/View";

const publicRoutes: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "*", element: <PageNotFound /> },
  { path: "/edital/:editalId/detalhes", element: <EditalDetails /> },
];

const PublicRoutes = (): JSX.Element[] =>
  publicRoutes.map((route) => {
    return routeWithKey(route);
  });

export default PublicRoutes;
