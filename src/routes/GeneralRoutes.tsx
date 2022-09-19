import React from "react";
import { RouteProps } from "react-router-dom";
import Home from "../Components/Home";
import PageNotFound from "../pages/PageNotFound";
import { routeWithKey } from "./RoutesHelper";

const generalRoutes: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "*", element: <PageNotFound /> },
];

const GeneralRoutes = generalRoutes.map((route) => {
  return routeWithKey(route);
});

export default GeneralRoutes;
