import { RouteProps } from "react-router-dom";
import EnrolledsList from "../pages/Edital/EnrolledList/EnrolledsList";
import InscricaoStudentView from "../pages/Edital/Inscricao/InscricaoStudentView";
import InscricaoTeacherView from "../pages/Edital/Inscricao/InscricaoTeacherView";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";
import Cadastro from "../pages/Cadastro/Cadastro";

const studentRoutes: RouteProps[] = [
  { path: "/edital/:editalId/inscricao", element: <InscricaoStudentView /> },
  { path: "/editar-dados", element: <Cadastro /> },
];

const teacherRoutes: RouteProps[] = [
  {
    path: "/edital/:editalId/inscritos/:inscricaoId",
    element: <InscricaoTeacherView />,
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
