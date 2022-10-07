import { RouteProps } from "react-router-dom";
import Inscricao from "../pages/Edital/Inscricao/View";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";

/*
TODO: Futuramente, desmembrar entre:
        * rotas protegidas "gerais";
        * rotas protegidas de "root";
        * rotas protegidas de "professor";
        * rotas protegidas de "estudante".
*/

const protectedRoutes: RouteProps[] = [
  { path: "edital/:editalId/inscricao", element: <Inscricao /> },

  // Exemplos:
  // { path: "/estudante", element: <Home /> },
  // { path: "/estudante-teste", element: <Home /> },
];

/*
    Se o(a) usuário(a) NÃO estiver logado(a), redireciona-o(a) para o login caso tente acessar alguma das ProtectedRoutes
*/
const ProtectedRoutes = () =>
  routesWithRedirect(!auth.isAuth(), "/login", protectedRoutes);

export default ProtectedRoutes;
