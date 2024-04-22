import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./styles/SignUp.module.css";
import Background from "@/images/background.png"
import DefaultProfilePi from "@/images/defaultProfilePic.png";
import Lapis from "@/images/lapis.png"
import Post from "@/images/Post.png"
import { signUpInput, signUpInputPlaceholder, signUpInputType } from "../../utils/inputs";
import twitch from "@/images/twitch.png";
import twitch2 from "@/images/twitch.png";
import face from "@/images/face.png";
import faceb from "@/images/face.png";
import axios from "axios";
import { useRouter } from "next/router";

const Cadastro = () => {
  const [step, setStep] = useState(1);
  const router = useRouter()
  const [fileName, setFileName]: any = useState(DefaultProfilePi);
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
            }).then((res:any) => {
                router.push("/")
            }).catch((err:any) => {
                localStorage.setItem("token", "")
            })
        }
    }
    
}, [])

  function twitchAuth(): void {
    const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize"
    const CLIENT_ID = "xe9yjeq3fvqrg0dxpgd2wtpgvgez6i"
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user:read:email',
      client_id: CLIENT_ID,
      redirect_uri: "http://localhost:3000"
    })

    const authURL = `${TWITCH_URL}?${params.toString()}`
    window.location.href = authURL
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

  function verifyEmail(){
      axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/verify", {name: signUp.name, email: signUp.email}).then((res)=>{
        console.log(res)
        setStep(2)
      }).catch((error)=>{
        console.log(error.response.data)
        //criar estado de erro e mostrar no fronte o erro
        console.log("Dados iguais")
      })
      
      
  }


  async function requestSignUp(e:any) {
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
    <div className={style.background3}>
      <div className={style.left3}>
        <Image className={style.back2} src={Background} alt="background" />
        <h1 className={style.welcome}>Seja bem-vindo!</h1>
        <Image className={style.post3} src={Post} alt="post" />
      </div>
      <div className={style.right3}>
        <form onSubmit={requestSignUp}>
          {step === 1 && (
            <>
              <div className={style.socialLogin}>
                <h1 className={style.title}>Crie sua conta!</h1>
              </div>
              {signUpInput.slice(0, 5).map((input, index) => (
                <div key={index} className={style.container}>
                  <label htmlFor={input} className={style.label}>{signUpInputPlaceholder[index]}</label>
                  <input
                    onChange={handleChange}
                    type={signUpInputType[index]}
                    id={input}
                    name={input}
                    className={style.input}
                  />
                </div>
              ))}
              <button type="button" className={style.enviar} onClick={() => verifyEmail()}>
                Próximo
              </button>
              <button type="button" className={style.loginFacebook} onClick={() => faceAuth()}>
                <Image src={face} alt="Login com Facebook" className={style.facebook} />
                <Image src={faceb} alt="Login com Facebook" className={style.facebook2} />
                Entrar com Facebook
<<<<<<< HEAD
              </button>              
              <button className={style.loginTwitch} onClick={() => twitchAuth()}>
                <Image src={twitch} alt="Login com Twitch" className={style.twitch}/>
                <Image src={twitch2} alt="Login com Twitch" className={style.twitch2}/>
=======
              </button>
              <button type="button" className={style.loginTwitch} onClick={() => twitchAuth()}>
                <Image src={twitch} alt="Login com Twitch" className={style.twitch} />
                <Image src={twitch2} alt="Login com Twitch" className={style.twitch2} />
>>>>>>> 642ef88bb725366d6351b1274d1b1afe3962ad5a
                Entrar com Twitch
              </button>
              <div className={style.containerLogos}>
                <Image src={face} alt="Login com Facebook" className={style.facebook3}/>
                <Image src={twitch} alt="Login com Twitch" className={style.twitch3}/>
              </div>
            </>
          )}
          {step === 2 && (
            <div >
              <h1 className={style.title}>Crie sua conta!</h1>
              {fileName && (
                <div className={style.imagePreviewContainer}>
                  <Image src={fileName} width={100} height={100} className={style.imagePreview} alt=""/>
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
              <button type="button" className={style.buttonback} onClick={() => setStep(1)}>
                Voltar
              </button>
            </div>
          )}
          {step === 3 && (
            <div >
              <div className="Policy-group">
                <h1 className={style.privacyPolicy}>Política de privacidade</h1>
                <p className={style.policy}>Última atualização: [data]
                  A [Nome da Empresa] ("nós", "nosso" ou "nos") opera o website [www.exemplo.com] (doravante referido como o "Serviço").
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
                <input type="checkbox" className={style.checkbox} />
                <p className={style.policy}>Aceite os termos</p>
              </div>
              <button type="submit" className={style.enviar}>
                Cadastrar
              </button>
              <button type="button" className={style.buttonback} onClick={() => setStep(2)}>
                Voltar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
