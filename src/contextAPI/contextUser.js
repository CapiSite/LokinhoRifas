import { createContext, useState } from "next";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({name:"", id:"", email:"", picture:"", token:""})

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
    )
}