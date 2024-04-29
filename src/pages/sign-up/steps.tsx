import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./styles/SignUp.module.css";
import DefaultProfilePi from "@/images/defaultProfilePic.png";
import Lapis from "@/images/lapis.png"
import { signUpInput, signUpInputPlaceholder, signUpInputType } from "../../utils/inputs";
import twitch from "@/images/twitch.png";
import twitch2 from "@/images/twitch.png";
import face from "@/images/face.png";
import faceb from "@/images/face.png";
import axios from "axios";
import { useRouter } from "next/router";
import PoliticaDePrivacidade from "./politicaDePrivacidade"
const Steps = () => {
    const [step, setStep] = useState(1);
    const router = useRouter()
    const [fileName, setFileName]: any = useState(DefaultProfilePi);
    const [disable, setDisable] = useState(false)
    const [token, setToken] = useState<string | null>(null); // Tipando token como string | null
    const [signUp, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tradeLink: "",
        picture: DefaultProfilePi
    })
    // fazer verificacoa de cada campo usar um usestate som igual o que esta acima 

    useEffect(() => {
        return () => {
            if (fileName) {
                URL.revokeObjectURL(fileName);
            }
        };
    }, [fileName]);

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
        if (CLIENT_ID !== undefined) {
            const params = new URLSearchParams({
                response_type: 'code',
                scope: 'user:read:email',
                client_id: CLIENT_ID,
                redirect_uri: "http://localhost:3000"
            })
            const authURL = `${TWITCH_URL}?${params.toString()}`
            window.location.href = authURL
        }

    }
    function faceAuth(): void {
        const face_URL = ""
        const CLIENT_ID = ""
        const params = new URLSearchParams({
            response_type: 'code',
            scope: 'user:read:email',
            client_id: CLIENT_ID,
            redirect_uri: "http://localhost:3000"
        })

        const authURL = `${face_URL}?${params.toString()}`
        window.location.href = authURL
    }
    const handleChange = (e: any) => {
        if (e.target.name === "picture") {
            setFileName(URL.createObjectURL(e.target.files[0]));
        }
        const { name, value } = e.target;
        setSignUp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function verifyEmail() {
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/verify", { name: signUp.name, email: signUp.email }).then((res) => {
            console.log(res)
            setStep(2)
        }).catch((error) => {
            console.log(error.response.data)
            //criar estado de erro e mostrar no fronte o erro
            console.log("Dados iguais")
        })


    }
    async function requestSignUp(e: any) {
        try {
            e.preventDefault()
            const { confirmPassword, ...signUpData } = signUp
            await axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users", signUpData)
            router.push("/sign-in")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={requestSignUp}>
                {step === 1 && (
                    <>
                        <div className={style.socialLogin}>
                            <h1 className={style.title}>Crie sua conta!</h1>
                        </div>
                        {signUpInput.slice(0, 5).map((input, index) => (
                            <div key={index} className={style.container}>
                                <div className={style.container2}>
                                    <label htmlFor={input} className={style.label}>{signUpInputPlaceholder[index]}</label>
                                    <input
                                        onChange={handleChange}
                                        type={signUpInputType[index]}
                                        id={input}
                                        name={input}
                                        className={style.input}
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" className={style.enviar} onClick={() => setStep(2)}>
                            Próximo
                        </button>
                        <hr className={style.linha} />
                        <p className={style.p}>
                            Acesse sua conta com
                        </p>
                        <button type='button' className={style.loginFacebook} onClick={() => faceAuth()}>
                            <Image src={face} alt="Login com Facebook" className={style.facebook} />
                            <Image src={faceb} alt="Login com Facebook" className={style.facebook2} />
                            Entrar com Facebook
                        </button>
                        <button type='button' className={style.loginTwitch} onClick={() => twitchAuth()}>
                            <Image src={twitch} alt="Login com Twitch" className={style.twitch} />
                            <Image src={twitch2} alt="Login com Twitch" className={style.twitch2} />
                            Entrar com Twitch
                        </button>
                        <button className={style.rout} disabled={disable} type="button" onClick={() => router.push("/sign-in")}>
                            Já tem conta? Login!
                        </button>
                    </>
                )}
                {step === 2 && (
                    <div >
                        <h1 className={style.title}>Crie sua conta!</h1>
                        {fileName && (
                            <div className={style.imagePreviewContainer}>
                                <Image src={fileName} width={100} height={100} className={style.imagePreview} alt="" />
                            </div>
                        )}
                        <div className={style.container}>
                            <label htmlFor="imagemPerfil" className={style.label} ><div className={style.pencilContainer}>
                                <Image src={Lapis} alt="icon pencil" className={style.pencilIcon2} />
                            </div>Editar imagem de Perfil</label>
                            <input
                                type="file"
                                id="imagemPerfil"
                                name="picture"
                                className={style.inputImage}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="button" className={style.enviar} onClick={() => setStep(3)}>
                            Próximo
                        </button>
                        <button type="button" className={style.buttonback2} onClick={() => setStep(1)}>
                            Voltar
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div >
                        <PoliticaDePrivacidade/>
                        <div className={style.containersubimit}>
                            <button type="button" className={style.buttonback} onClick={() => setStep(2)}>
                                Voltar
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
}
export default Steps;