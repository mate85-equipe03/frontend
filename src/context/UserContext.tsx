import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IUserContext {
  username: string;
  token: string;
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
    const storagedUserStr = localStorage.getItem("user");
    if (storagedUserStr) {
      const storagedUser = JSON.parse(storagedUserStr);
      if (storagedUser?.username && storagedUser?.token) {
        setUser(storagedUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={memoUser}>{children}</UserContext.Provider>
  );
}

export { UserContextProvider };
export default UserContext;
