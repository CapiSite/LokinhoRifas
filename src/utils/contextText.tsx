import { ReactNode, createContext, useState } from "react";

export const TextContext = createContext({})

export const TextProvider = ({children} : {children: ReactNode}) =>{
    const [textInfo, setTextInfo] = useState("RIFA IRÁ COMEÇAR AS XX:XX")

    return (
        <TextContext.Provider value={{textInfo, setTextInfo}}>{children}</TextContext.Provider>
    )
}