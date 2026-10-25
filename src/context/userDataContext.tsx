import { createContext, useContext, type ReactNode } from "react";
import { getUserData } from "../services/userProfile.services";
import { AuthContext } from "./AuthContext";
import type { IuserData } from "../types/userType";
import { useQuery } from "@tanstack/react-query";

type userTypeContext = {
    userData: IuserData | null;
};

export const userContext = createContext<userTypeContext>({
    userData: null,
})

export function UserContextProvider({ children }: { children: ReactNode }) {
    const { userToken } = useContext(AuthContext)

    async function getData() {
        if (userToken) {
            const response = await getUserData(userToken)
            return response.data.user
        }
    }

    const {data:userData} =  useQuery({
        queryFn: getData,
        enabled:!!userToken,
        queryKey: ['userData']
    })

    return <userContext.Provider value={{ userData }}>{children}</userContext.Provider>

}