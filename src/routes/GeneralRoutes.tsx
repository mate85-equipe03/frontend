import React from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/Home/View";
import PageNotFound from "../pages/PageNotFound/View";
import { routeWithKey } from "./RoutesHelper";
import EditalDetails from "../pages/EditalDetails/View";

const generalRoutes: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "*", element: <PageNotFound /> },
  { path: "/detalhes-edital/:editalId", element: <EditalDetails /> },
];

const GeneralRoutes = () => generalRoutes.map((route) => {
  return routeWithKey(route);
});

export default GeneralRoutes;
