import { RouteProps } from "react-router-dom";
import EnrolledsList from "../pages/EnrolledsList";
import InscricaoStudentView from "../pages/InscricaoStudentView";
import InscricaoTeacherView from "../pages/InscricaoTeacherView";
import auth from "../services/Auth";
import { routesWithRedirect } from "./RoutesHelper";
import Cadastro from "../pages/Cadastro";
import NovoEdital from "../pages/NovoEdital";
import CadastroTeacher from "../pages/CadastroTeacher";

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

const rootRoutes: RouteProps[] = [
  {
    path: "/edital/novo",
    element: <NovoEdital />,
  },
  { path: "/cadastro-professor", element: <CadastroTeacher /> },
];

const ProtectedRoutes = (): JSX.Element[] => {
  /* 
    Se NÃO estiver logado(a), redireciona para o login caso tente acessar alguma das ProtectedRoutes
  */
  if (!auth.isLoggedIn()) {
    return [
      ...routesWithRedirect(!auth.isLoggedIn(), "/login", studentRoutes),
      ...routesWithRedirect(!auth.isLoggedIn(), "/login", teacherRoutes),
      ...routesWithRedirect(!auth.isLoggedIn(), "/login", rootRoutes),
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
