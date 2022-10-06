import React from "react";
import { RouteProps } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Recuperar from "../pages/Recuperar";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";

const authRoutes: RouteProps[] = [
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/recuperar-senha", element: <Recuperar /> },
  // exemplo: { path: "/login-teste", element: <Login /> },
];

/*
  Se o(a) usuário(a) JÁ estiver logado(a), redireciona-o(a) para a home caso tente acessar alguma das AuthRoutes
*/
const AuthRoutes = () => routesWithRedirect(auth.isAuth(), "/", authRoutes);

export default AuthRoutes;
