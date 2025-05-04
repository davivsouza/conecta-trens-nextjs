import { createContext, useEffect, useState } from "react";

interface UserData {
  email: string;
  senha: string;
  nome: string;
  telefone: string;
  usuario_id: number;
}

interface AuthContextProps {
  user: UserData;
}
export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData>({} as UserData);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const userData = JSON.parse(localUser) as UserData;
      setUser(userData);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
