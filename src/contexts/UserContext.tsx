import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext({})

export const UserProvider = ({children} : {children: ReactNode}) =>{
    const [userInfo, setUserInfo] = useState({name:"", id:"", email:"", picture:"", token:"", isAdmin:false, phoneNumber: "", tradeLink:""})

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
    )
}