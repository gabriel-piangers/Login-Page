import { Children, createContext, useContext, useState } from "react";

const userContext = createContext()

export function UserProvider({children}) {
    const [userData, setUserData] = useState(null)

    const login = (user) => {
        setUserData(user)
    }

    const logout = () => {
        setUserData(null)
    }

    return (
        <userContext.Provider value={{userData, login, logout}}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext)