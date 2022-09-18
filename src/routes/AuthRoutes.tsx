import React from "react";
import { RouteProps } from "react-router-dom";
import Login from "../Components/Login";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";

const authRoutes: RouteProps[] = [
  { path: "/login", element: <Login /> },
  // { path: "/login-teste", element: <Login /> },
];

/*
  Se o(a) usuário(a) JÁ estiver logado(a), redireciona-o(a) para a home caso tente acessar alguma das AuthRoutes
*/
const AuthRoutes = routesWithRedirect(auth.isAuth(), "/", authRoutes);

export default AuthRoutes;
