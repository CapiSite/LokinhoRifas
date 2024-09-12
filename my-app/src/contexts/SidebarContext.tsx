import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const SidebarStateContext = createContext({})

export const useSidebarState = () => {
  return useContext(SidebarStateContext)
}

export const SidebarStateProvider = ({children}:{children: ReactNode} ) => {
  const [ sidebarView, setSidebarView ] = useState(false)


  const toggleSidebar = () => {
    setSidebarView(oldState => !oldState)
  }

  const value = {
    sidebarView,
    toggleSidebar
  }

  // ! PARA DEBUGGING
  // useEffect(() => {
  //   console.log('Debugging SidebarState: ', sidebarView)
  // })
  // ! PARA DEBUGGING

  return (
    <SidebarStateContext.Provider value={value} >
      {children}
    </SidebarStateContext.Provider>
  )
}