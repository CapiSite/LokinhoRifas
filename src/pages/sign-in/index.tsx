import { loginInput } from "../../utils/inputs";
import { useRouter } from "next/router";
import style from "./styles/SignIn.module.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/contextUser";
import UserContextType from "@/utils/interfaces";

export default function Login(){
    const router = useRouter()
    const [user, setUser] = useState({email:"", password:""})
    const [disable, setDisable] = useState(false)
    const [token, setToken] = useState<string | null>(null); // Tipando token como string | null
    const {userInfo, setUserInfo} = useContext(UserContext) as UserContextType
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken)
        }
        if(token){
            axios.post(process.env.REACT_APP_API_URL+"/token", {},{headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                router.push("/timeline")
                
            }).catch(err=>{
                alert(err.response.data)
            })
        }
    }, [])




    return (
        <div className={style.background}>
            <div className={style.left}>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </div>
            <div className={style.right}>
                <form onSubmit={login}>
                    {loginInput.map((object) => <input disabled={disable} onChange={(e)=>{object === "e-mail"?setUser({...user, email:e.target.value}):setUser({...user, password:e.target.value})}
                    } type={object === "e-mail"?"email":"password"} data-test={object === "e-mail"?"email":"password"} placeholder={object}/>)}
                    <button disabled={disable} data-test="login-btn" type="submit">Log In</button>
                    <button disabled={disable} data-test="sign-up-link" type="button" onClick={()=>router.push("/sign-up")}>First time? Create an account!</button>
                </form>
            </div>
        </div>
    )

    function login(e:FormEvent){
        e.preventDefault()
        setDisable(true)
        if(user.email === ""|| user.password === "") {
            alert("Preencha todos os campos!")
            setDisable(false)
            return
        }
        
        axios.post(process.env.REACT_APP_API_URL+"/signin", user).then((res)=>{
            setUserInfo({...userInfo,id:res.data.id, name:res.data.name, email:res.data.email, picture:res.data.picture, token:res.data.token})
            localStorage.setItem("token", res.data.token)
            setDisable(false)
            router.push("/timeline")
        }).catch((err)=>{
            alert(err.response.data)
            setDisable(false)
        })
        
    }
}