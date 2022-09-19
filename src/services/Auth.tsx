import { IUserContext } from "../context/UserContext";

const auth = {
  isAuth(): boolean {
    const storagedUserStr = localStorage.getItem("user");
    if (storagedUserStr) {
      const storagedUser = JSON.parse(storagedUserStr);
      if (storagedUser?.username && storagedUser?.token) {
        return true;
      }
    }
    return false;
  },

  getStoragedUser(): IUserContext | null {
    if (this.isAuth()) {
      const storagedUserStr = localStorage.getItem("user");
      if (storagedUserStr) {
        return JSON.parse(storagedUserStr);
      }
    }
    return null;
  },
};

export default auth;
