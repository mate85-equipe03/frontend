import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  IPropsUserContext,
  IPropsContextProvider,
  IUserContext,
} from "../interfaces/Interfaces";
import api from "../services/Api";
import auth from "../services/Auth";

const DEFAULT_VALUE: IPropsUserContext = {
  user: null,
  setUser: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const UserContext = createContext<IPropsUserContext>(DEFAULT_VALUE);

function UserContextProvider({ children }: IPropsContextProvider) {
  const [user, setUser] = useState<IUserContext | null>(null);
  const memoUser = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  useEffect(() => {
    const storagedUser = auth.getStoragedUser();
    if (storagedUser) {
      setUser(storagedUser);
      api.defaults.headers.common.Authorization = `Bearer ${storagedUser.token}`;
    }
  }, []);

  return (
    <UserContext.Provider value={memoUser}>{children}</UserContext.Provider>
  );
}

export { UserContextProvider };
export default UserContext;
