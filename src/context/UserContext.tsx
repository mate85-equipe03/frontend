import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../services/Api";
import auth from "../services/Auth";

interface IUserContext {
  username: string;
  token: string;
  role: string;
}

interface IPropsUserContext {
  user: IUserContext | null;
  setUser: React.Dispatch<React.SetStateAction<IUserContext | null>>;
}

interface IPropsContextProvider {
  children: ReactNode;
}

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
export type { IUserContext };
export default UserContext;
