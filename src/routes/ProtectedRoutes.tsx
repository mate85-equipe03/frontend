import { RouteProps } from "react-router-dom";
import EnrolledsList from "../pages/Edital/EnrolledList/EnrolledsList";
import Inscricao from "../pages/Edital/Inscricao/View";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";
import RevisarInscricaoProfessor from "../pages/Revisao/RevisarInscricaoProfessor/View";
import RevisarInscricaoAluno from "../pages/Revisao/RevisarInscricaoAluno/View";
import Cadastro from "../pages/Cadastro/Cadastro";

const studentRoutes: RouteProps[] = [
  { path: "/edital/:editalId/inscricao", element: <Inscricao /> },
  { path: "/edital/:editalId/inscricao/:inscricaoId", element: <Inscricao /> },
  {
    path: "/edital/:editalId/dados-inscricao",
    element: <RevisarInscricaoAluno />,
  },
  { path: "/editar-dados", element: <Cadastro /> },
];

const teacherRoutes: RouteProps[] = [
  {
    path: "/edital/:editalId/inscritos/:inscricaoId",
    element: <RevisarInscricaoProfessor />,
  },
  { path: "/edital/:editalId/inscritos", element: <EnrolledsList /> },
];

const rootRoutes: RouteProps[] = [];

const ProtectedRoutes = (): JSX.Element[] => {
  /* 
    Se NÃO estiver logado(a), redireciona para o login caso tente acessar alguma das ProtectedRoutes
  */
  if (!auth.isAuth()) {
    return [
      ...routesWithRedirect(!auth.isAuth(), "/login", studentRoutes),
      ...routesWithRedirect(!auth.isAuth(), "/login", teacherRoutes),
      ...routesWithRedirect(!auth.isAuth(), "/login", rootRoutes),
    ];
  }

  /* 
    Se estiver logado(a) mas não estiver com a role correta, redireciona para a home caso tente 
    acessar alguma das Rotas Protegidas por Role
  */
  return [
    ...routesWithRedirect(!auth.isStudent(), "/", studentRoutes),
    ...routesWithRedirect(!auth.isTeacher(), "/", teacherRoutes),
    ...routesWithRedirect(!auth.isRoot(), "/", rootRoutes),
  ];
};

export default ProtectedRoutes;
