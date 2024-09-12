import axios from "axios"
import { useRouter } from "next/router"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { LastPayment, LastPaymentBack } from "utils/interfaces"

export const UserContext = createContext({})

export const useUserStateContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    email: "",
    picture: "",
    token: "",
    isAdmin: false,
    phoneNumber: "",
    tradeLink: "",
    saldo: 0,
  })

  const [ showBudget, setShowBudget ] = useState<boolean>(false)
  const [ showPayment, setShowPayment ] = useState<boolean>(false)
  const [ lastestTransactions, setLatestTransactions ] = useState<LastPayment[]>([])
  const [ qrcode64, setQrcode64 ] = useState<string>('')
  const [ valueDiff, setValueDiff ] = useState(0)

  const cleanTransactions = (data: LastPaymentBack[]) => {
    const tempArray: LastPayment[] = []

    data.map(transaction => {
      const { id, dateLastUpdated, status, transactionAmount, type, paymentMethod, qrCodeBase64 } = transaction

      const tempObj: LastPayment = {
        id,
        date: dateLastUpdated,
        status: status,
        type,
        qrCodeBase64,
        exchanged: transactionAmount > 0 ? transactionAmount : transactionAmount * -1,
        method: paymentMethod,
      }

      tempArray.push(tempObj)
    })

    setLatestTransactions(tempArray)
  }

  const getLatestTransactions = () => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/transaction`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => cleanTransactions(res.data))
    .catch(err => console.log(err))
  }

  const logOut = () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      if (storedToken) localStorage.setItem("token", "")
    }
    setUserInfo({
      id: "",
      name: "",
      email: "",
      picture: "",
      token: "",
      isAdmin: false,
      phoneNumber: "",
      tradeLink: "",
      saldo: 0,
    })

    router.push("/login")
  }

  useEffect(() => {
    getLatestTransactions()
  }, [])

  // useEffect(() => {
  //   console.log(lastestTransactions)
  // }, [lastestTransactions])

  const value = {
    userInfo,
    logOut,
    setUserInfo,
    showBudget,
    setShowBudget,
    showPayment, 
    setShowPayment,
    lastestTransactions,
    getLatestTransactions,
    qrcode64, 
    setQrcode64,
    valueDiff,
    setValueDiff,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
