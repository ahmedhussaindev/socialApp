import { createContext, useState, type ReactNode } from "react";

type authTypeContext = {
  userToken: string | null;
  setToken: React.Dispatch<React.SetStateAction<null | string>>;
};

export const AuthContext = createContext<authTypeContext>({
  userToken : '',
  setToken : ()=> undefined
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setToken] = useState<string | null>(()=>{
    return localStorage.getItem('token')
  });

  return (
    <AuthContext.Provider value={{ userToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
