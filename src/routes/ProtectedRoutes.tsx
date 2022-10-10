import { RouteProps } from "react-router-dom";
import Inscricao from "../pages/Edital/Inscricao/View";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";
import RevisarInscricao from "../pages/RevisarInscricao/View";
import RevisarInscricaoAluno from "../pages/RevisarInscricaoAluno/View";

/*
TODO: Futuramente, desmembrar entre:
        * rotas protegidas "gerais";
        * rotas protegidas de "root";
        * rotas protegidas de "professor";
        * rotas protegidas de "estudante".
*/

const protectedRoutes: RouteProps[] = [
  { path: "edital/:editalId/inscricao", element: <Inscricao /> },
  {
    path: "edital/:editalId/inscritos/:inscricaoId",
    element: <RevisarInscricao />,
  },
  {
    path: "edital/:editalId/dados-inscricao",
    element: <RevisarInscricaoAluno />,
  },

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
