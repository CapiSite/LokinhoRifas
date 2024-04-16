import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./styles/SignUp.module.css";
import Background from "@/images/background.png"
import DefaultProfilePi from "@/images/defaultProfilePic.png";
import Lapis from "@/images/lapis.png"
import Post from "@/images/Post.png"
import twitch from "@/images/twitch.png"
import face from "@/images/face.png";
import { signUpInput } from "../../utils/inputs";

const Cadastro = () => {
  const [step, setStep] = useState(1);
  const [fileName, setFileName]: any = useState(DefaultProfilePi);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    return () => {
      if (fileName) {
        URL.revokeObjectURL(fileName);
      }
    };
  }, [fileName]);

  function twitchAuth(): void {
    const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize"
    const CLIENT_ID = "dcfc5qn6wwy7zdbe3dcvd0psbzmgn4"
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user:read:email',
      client_id: CLIENT_ID,
      redirect_uri: "http://localhost:3000/about"
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
      redirect_uri: "http://localhost:3000/about"
    })

    const authURL = `${face_URL}?${params.toString()}`
    window.location.href = authURL
  }

  return (
    <div className={style.background3}>
      <div className={style.left3}>
        <Image className={style.back2} src={Background} alt="background" />
        <h1 className={style.welcome}>Seja bem-vindo!</h1>
        <Image className={style.post3} src={Post} alt="post" />
      </div>
      <div className={style.right3}>
        <form>
          {step === 1 && (
            <>
              <div className={style.socialLogin}>
                <h1 className={style.title}>Crie sua conta!</h1>
              </div>
              {signUpInput.slice(0, 4).map((input, index) => (
                <div key={index} className={style.container}>
                  <label htmlFor={input} className={style.label}>{input}</label>
                  <input
                    type={input === 'senha' ? 'password' : 'text'}
                    id={input}
                    name={input}
                    placeholder={input}
                    className={style.input}
                  />
                </div>
              ))}
              <button type="button" className={style.enviar} onClick={() => setStep(2)}>
                Próximo
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
                  name="imagemPerfil"
                  className={style.inputImage}
                  onChange={handleFileChange}
                />
              </div>
              <button type="button" className={style.buttonback} onClick={() => setStep(1)}>
                Voltar
              </button>
              <button type="button" className={style.enviar} onClick={() => setStep(3)}>
                Próximo
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
                <input type="checkbox" className={style.checkbox}/>
                <p className={style.policy}>Aceite os termos</p>
              </div>
              <button type="button" className={style.buttonback} onClick={() => setStep(2)}>
                Voltar
              </button>
              <button type="submit" className={style.enviar}>
                Cadastrar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
