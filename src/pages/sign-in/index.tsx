import { loginInput } from "../../utils/constants";
import { useRouter } from "next/router";
import { Background, Left, Right } from "./styles/LoginStyle";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/ContextUser";
import UserContextType from "@/utils/types";

export default function SignIn(){
    const router = useRouter()
    const [user, setUser] = useState({email:"", password:""})
    const [disable, setDisable] = useState(false)
    const token = localStorage.getItem("token")
    const {userInfo, setUserInfo} = useContext(UserContext) as UserContextType
    const apiUrl = process.env.REACT_NEXT_API_URL;

    useEffect(()=>{
        
        if(token){
            axios.post(apiUrl+"/token", {},{headers:{
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
        <Background>
            <Left>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </Left>
            <Right>
                <form onSubmit={login}>
                    {loginInput.map((object: any) => <input disabled={disable} onChange={(e)=>{object === "e-mail"?setUser({...user, email:e.target.value}):setUser({...user, password:e.target.value})}
                    } type={object === "e-mail"?"email":"password"} data-test={object === "e-mail"?"email":"password"} placeholder={object}/>)}
                    <button disabled={disable} data-test="login-btn" type="submit">Log In</button>
                    <button disabled={disable} data-test="sign-up-link" type="button" onClick={()=>router.push("/sign-up")}>First time? Create an account!</button>
                </form>
            </Right>
        </Background>
    )

    function login(e: React.FormEvent){
        e.preventDefault()
        setDisable(true)
        if(user.email === ""|| user.password === "") {
            alert("Preencha todos os campos!")
            setDisable(false)
            return
        }
        
        axios.post(apiUrl+"/signin", user).then((res)=>{
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