import { loginInput } from "../../utils/inputs";
import { useRouter } from "next/router";
import style from "./styles/SignIn.module.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/contextUser";
import UserContextType from "@/utils/interfaces";
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
    const [user, setUser] = useState({ email: "", senha: "" })
    const [disable, setDisable] = useState(false)
    const [token, setToken] = useState<string | null>(null); // Tipando token como string | null
    const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken)
        }
        if (token) {
            axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                router.push("/timeline")

            }).catch(err => {
                alert(err.response.data)
            })
        }
    }, [])


    function twitchAuth(): void {
        const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        console.log(process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)
        if (CLIENT_ID === undefined) {
            console.error("TWITCH_CLIENT_ID não está definido.");
            return;
        }
        const params = new URLSearchParams({
            response_type: 'code',
            scope: 'user:read:email',
            client_id: CLIENT_ID,
            redirect_uri: "http://localhost:3000/about"
        })

        const authURL = `${process.env.NEXT_PUBLIC_TWITCH_URL}?${params.toString()}`
        window.location.href = authURL
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
                                    object === "e-mail" ? setUser({ ...user, email: e.target.value }) : setUser({ ...user, senha: e.target.value });
                                }}
                                type={object === "e-mail" ? "email" : "password"}
                            />
                        </div>
                    ))}
                    <button disabled={disable} data-test="login-btn" type="submit">
                        Entrar
                    </button>
                    <hr className={style.linha} />
                    <p className={style.p}>
                        Acesse sua conta com
                    </p>
                    <button className={style.loginFacebook}>
                        <Image src={face} alt="Login com Facebook" className={style.facebook} />
                        <Image src={faceb} alt="Login" className={style.facebook2} />
                        Entrar com Facebook
                    </button>
                    <button className={style.loginTwitch} onClick={() => twitchAuth()}>
                        <Image src={twitch} alt="Login com Twitch" className={style.twitch} />
                        <Image src={twitch2} alt="Login com Twitch" className={style.twitch2} />
                        Entrar com Twitch
                    </button>
                    <button className={style.rout} disabled={disable} data-test="sign-up-link" type="button" onClick={() => router.push("/sign-up")}>
                        Primeira vez? Crie uma conta!
                    </button>
                </form>
            </div>
        </div>
    )

    function login(e: FormEvent) {
        e.preventDefault()
        setDisable(true)
        if (user.email === "" || user.senha === "") {
            alert("Preencha todos os campos!")
            setDisable(false)
            return
        }

        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/signin", user).then((res) => {
            setUserInfo({ ...userInfo, id: res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.token })
            localStorage.setItem("token", res.data.token)
            setDisable(false)
            router.push("/timeline")
        }).catch((err) => {
            alert(err.response.data)
            setDisable(false)
        })

    }
}