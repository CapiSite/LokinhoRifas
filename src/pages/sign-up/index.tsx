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
                  <Image src={fileName} width={300} height={300} className={style.imagePreview} alt="" />
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
              <button type="submit" className={style.enviar}>
                Cadastrar
              </button>
            </div>
          )}
          <hr className={style.linha} />
          <p className={style.p}>
            Cadastre-se com
          </p>
          <div className={style.socialLink}>
            <button className={style.loginFacebook} onClick={() => faceAuth()}>
              <Image src={face} alt="Login com Facebook" className={style.facebook} />
            </button>

            <button className={style.loginTwitch} onClick={() => twitchAuth()}>
              <Image src={twitch} alt="Login com Twitch" className={style.twitch} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
