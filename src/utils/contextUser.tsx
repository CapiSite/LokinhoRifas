import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext({})

export const UserProvider = ({children} : {children: ReactNode}) =>{
    const [userInfo, setUserInfo] = useState({name:"", id:"", email:"", picture:"", token:""})

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
    )
}