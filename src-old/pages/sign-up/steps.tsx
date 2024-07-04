import { useState, useEffect, use } from "react";
import Image from "next/image";
import style from "./styles/SignUp.module.css";
import DefaultProfilePi from "@/images/defaultProfilePic.png";
import Lapis from "@/images/lapis.png"
import { MAX_FILE_SIZE, signUpInput, signUpInputPlaceholder, signUpInputType } from "../../utils/inputs";
import twitch from "@/images/twitch.png";
import twitch2 from "@/images/twitch2.png"
import face from "@/images/face.png";
import faceb from "@/images/face.png";
import axios from "axios";
import { useRouter } from "next/router";
import PoliticaDePrivacidade from "./politicaDePrivacidade";
import MaskedInput from "react-text-mask";
const Steps = () => {
    const [step, setStep] = useState(1);
    const router = useRouter()
    const [fileName, setFileName]: any = useState(DefaultProfilePi);
    const [disable, setDisable] = useState(false)
    const [token, setToken] = useState<string | null>(null); // Tipando token como string | null
    const [error, setError] = useState("");
    const [signUp, setSignUp] = useState<any>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tradeLink: "",
        picture: DefaultProfilePi
    })
    
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };


    const handleCadastroClick = () => {
        if (!isChecked) {
            alert("Por favor, aceite os termos antes de cadastrar.");
        }
    };

    // fazer verificacoa de cada campo usar um usestate som igual o que esta acima 

    useEffect(() => {
        return () => {
            if (fileName) {
                URL.revokeObjectURL(fileName);
            }
        };
    }, [fileName, error]);

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

    }, [error])

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
    const handleChange = (e: any) => {
        if (e.target.name === "picture") {
            const file = e.target.files[0];
            if (file) {
                if (file.size > MAX_FILE_SIZE) {
                    setError("O tamanho da imagem excede o limite permitido.");
                    setDisable(true);
                    return;
                }
                setFileName(URL.createObjectURL(file));
                setError("");
                setDisable(false);
            }
        }
        const { name, value } = e.target;
        setSignUp((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, email, password, confirmPassword, tradeLink,phoneNumber, picture } = signUp;
        if (!name || !email || !password || !confirmPassword || !tradeLink || !phoneNumber) {
            return setError("Todos os campos são obrigatórios!");
        }

        else if (name.length < 3) {
            return setError("O nome de usuário deve ter pelo menos 3 carateries!");
        }

        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return setError("Por favor, insira um endereço de e-mail válido.");
        }

        else if (password !== confirmPassword) {
            return setError("As senhas não coincidem!");
        }
        else if (password.length < 6) {
            return setError("A senha tem que ter no minimo 6 caracteres");
        }
        else if (!/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=\w+$/.test(tradeLink)) {
            return setError("Por favor, insira um trade link da Steam válido.");
        }
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/verify", { name: signUp.name, email: signUp.email }).then((res) => {
            setStep(2)
        }).catch((error) => {
            setError(error.response.data.message)
        })
    };

    async function requestSignUp(e: any) {
        try {
            e.preventDefault();
    
            const formData = new FormData();
            const pictureFile = e.target.elements['picture'].files[0]

            const { confirmPassword, ...signUpData } = signUp;
            if(!pictureFile){
                formData.append('picture', "default");
                signUpData.picture = "default"
            } else{
                formData.append('picture', pictureFile);
            }
            formData.append('signUpData', JSON.stringify(signUpData)); // Envie os outros dados do formulário como JSON

            
            const response = await axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data); // Log da resposta do servidor
    
            router.push("/sign-in");
        } catch (error) {
            console.error(error);
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
                        {signUpInput.slice(0, 6).map((input, index) => (
                            <div key={index} className={style.container}>
                                <div className={style.container2}>
                                    <label htmlFor={input} className={style.label}>{signUpInputPlaceholder[index]}</label>

                                  {input === "phoneNumber" ? <MaskedInput defaultValue={""}
                                    onChange={handleChange}
                                    type={signUpInputType[index]}
                                    id={input}
                                    name={input}
                                    className={style.input}
                                    value={signUp[input]} 
                                    mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    /> :
                                    <input
                                        onChange={handleChange}
                                        type={signUpInputType[index]}
                                        id={input}
                                        name={input}
                                        className={style.input}
                                        value={signUp[input]}
                                    />
                                  }
                                </div>
                            </div>
                        ))}
                        {error ? <p className={style.error}>{error}</p> : <></>}
                        <button type="button" className={style.enviar} onClick={() => (validateForm())}>
                            Próximo
                        </button>
                        <hr className={style.linha} />
                        <p className={style.p}>
                            Acesse sua conta com
                        </p>
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
                {step === 3 && (
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
                        <button className={style.enviar} onClick={handleCadastroClick}>
                            Cadastrar
                        </button>
                        <button type="button" className={style.buttonback2} onClick={() => setStep(2)}>
                            Voltar
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div >
                        <div className={style.Policygroup}>
                <h1 className={style.privacyPolicy}>Política de privacidade</h1>
                <p className={style.policy}>Última atualização: [data]
                    A [Nome da Empresa] (nós, nosso ou nos) opera o website [www.exemplo.com] (doravante referido como o Serviço).
                    Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de informações pessoais quando você usa nosso Serviço.
                    Coleta e Uso de Informações
                    Não coletamos informações pessoais identificáveis, como seu nome, endereço, número de telefone ou endereço de e-mail, a menos que você as forneça voluntariamente.
                    Dados de Log
                    Nós seguimos uma política de log padrão. Isso significa que seus dados de log podem incluir informações como seu endereço IP, tipo de navegador, provedor de serviços de Internet, páginas que você visitou em nosso site, a hora e a data de sua visita, o tempo gasto nessas páginas e outras estatísticas.
                    Cookies
                    Nós não usamos cookies para rastrear a atividade do usuário. No entanto, podemos usar cookies de terceiros para melhorar a funcionalidade do nosso site.
                    Compartilhamento de Informações
                    Nós não compartilhamos informações pessoais identificáveis publicamente ou com terceiros, exceto quando exigido por lei.
                    Links para Outros Sites
                    Nosso Serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, você será direcionado para o site desse terceiro. Recomendamos vivamente que reveja a Política de Privacidade de todos os sites que visita.
                    Alterações a esta Política de Privacidade
                    Podemos atualizar nossa Política de Privacidade de tempos em tempos. Recomendamos que você revise esta página periodicamente para quaisquer alterações. Notificaremos você de quaisquer alterações, publicando a nova Política de Privacidade nesta página.
                    Contate-Nos
                    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email: [email@example.com].</p>
                <div className={style.checkboxcontainer}>
                    <input type="checkbox" className={style.checkbox} onChange={handleCheckboxChange} />
                    <label className={style.termo}>Aceite os termos</label>
                </div>
                <div className={style.containersubimit}>
                    <button type="button" className={style.enviar} onClick={() => setStep(3)}>
                        Próximo
                    </button>
                </div>
            </div>
                        <div className={style.containersubimit}>
                            <button type="button" className={style.buttonback} onClick={() => setStep(1)}>
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