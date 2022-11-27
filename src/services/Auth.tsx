import { IUserContext } from "../interfaces/Interfaces";

const auth = {
  isLoggedIn(): boolean {
    const storagedUserStr = localStorage.getItem("user");
    if (storagedUserStr) {
      const storagedUser = JSON.parse(storagedUserStr);
      if (storagedUser?.username && storagedUser?.token && storagedUser?.role) {
        return true;
      }
    }
    return false;
  },

  getStoragedUser(): IUserContext | null {
    if (this.isLoggedIn()) {
      const storagedUserStr = localStorage.getItem("user");
      if (storagedUserStr) {
        return JSON.parse(storagedUserStr);
      }
    }
    return null;
  },

  isTeacher(): boolean {
    const user = this.getStoragedUser();
    if (user && user.role === "PROFESSOR") {
      return true;
    }
    return false;
  },

  isStudent(): boolean {
    const user = this.getStoragedUser();
    if (user && user.role === "ALUNO") {
      return true;
    }
    return false;
  },

  isRoot(): boolean {
    const user = this.getStoragedUser();
    if (user && user.role === "ROOT") {
      return true;
    }
    return false;
  },
};

export default auth;
