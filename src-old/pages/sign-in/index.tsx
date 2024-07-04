import { loginInput } from "../../utils/inputs";
import { useRouter } from "next/router";
import style from "./styles/SignIn.module.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/contextUser";
import UserContextType from "../../utils/interfaces";
import Image from "next/image";
import Background from "@/images/background.png";
import Post from "@/images/Post.png";
import twitch from "@/images/twitch.png"
import twitch2 from "@/images/twitch2.png"
import face from "@/images/face.png"
import faceb from "@/images/face-branco.jpeg"
import logo from "@/images/logo.jpg"



export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({ email: "", password: "" })
    const [disable, setDisable] = useState(false)
    const [token, setToken] = useState<string | null>(null); // Tipando token como string | null
    const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
    const [error, setError] = useState("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken)
            if (storedToken) {
                axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth", {}, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }).then((res: any) => {
                    router.push("/")
                }).catch((err: any) => {
                    localStorage.setItem("token", "")
                })
            }
        }

    }, [])

    function twitchAuth(): void {
        const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize"
        const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

        if (CLIENT_ID !== undefined && REDIRECT_URI !== undefined) {
            const params = new URLSearchParams({
                response_type: 'code',
                scope: 'user:read:email',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI
            })
            const authURL = `${TWITCH_URL}?${params.toString()}`
            window.location.href = authURL
        }

    }
    function faceAuth(): void {
        const face_URL = ""
        const CLIENT_ID = ""
        const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
        if (CLIENT_ID !== undefined && REDIRECT_URI !== undefined) {
        const params = new URLSearchParams({
            response_type: 'code',
            scope: 'user:read:email',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI
        })

        const authURL = `${face_URL}?${params.toString()}`
        window.location.href = authURL
    }
    }
    return (
        <div className={style.wallpaper}>
            <div className={style.left2}>
                <Image className={style.back2} src={Background} alt="background100" />
                <h1 className={style.welcome}>Seja bem-vindo!</h1>
                <Image className={style.post3} src={Post} alt="background100" />
            </div>
            <div className={style.right2}>
                <form onSubmit={login}>
                    <Image src={logo} alt="Logo do site" className={style.logo} />
                    <div className={style.socialLogin}>
                    </div>
                    {loginInput.map((object, index) => (
                        <div key={index}>
                            <label htmlFor={object === "e-mail" ? "emailInput" : "passwordInput"} className={style.label}>
                                {object === "e-mail" ? "E-mail:" : "Senha:"}
                            </label>
                            <input
                                id={object === "e-mail" ? "emailInput" : "passwordInput"}
                                disabled={disable}
                                onChange={(e) => {
                                    object === "e-mail" ? setUser({ ...user, email: e.target.value }) : setUser({ ...user, password: e.target.value });
                                }}
                                type={object === "e-mail" ? "email" : "password"}
                            />
                            
                        </div>
                    ))}
                    {error ? <p className={style.error}>{error}</p> : <></>}
                    <button disabled={disable} type="submit" className={style.entrar}>
                        Entrar
                    </button>
                    <hr className={style.linha} />
                    <p className={style.p}>
                        Acesse sua conta com
                    </p>
                    <div className={style.imagens}>
                        <Image src={twitch} alt="Login com Twitch" className={style.imagemTwitch} />
                    </div>
                    <button type='button' className={style.loginTwitch} onClick={() => twitchAuth()}>
                        <Image src={twitch} alt="Login com Twitch" className={style.twitch} />
                        <Image src={twitch2} alt="Login com Twitch" className={style.twitch2} />
                        Entrar com Twitch
                    </button>
                    <button className={style.rout} disabled={disable} type="button" onClick={() => router.push("/sign-up")}>
                        Primeira vez? Crie uma conta!
                    </button>
                </form>
            </div>
        </div>
    )

    function login(e: FormEvent) {
        e.preventDefault()
        setDisable(true)
        if (user.email === "" || user.password === "") {
            setError("Preencha todos os campos!")
            setDisable(false)
            return
        }

        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth/sign-in", user).then((res: any) => {
            setUserInfo({ ...userInfo, id: res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.token, isAdmin: res.data.isAdmin })
            localStorage.setItem("token", res.data.token)
            setDisable(false)
            router.push("/")
        }).catch((err: any) => {
            setError("Usuário ou senha incorretos")
            setDisable(false)
        })
    }
}