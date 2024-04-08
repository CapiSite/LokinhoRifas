import { signUpInput, signUpInputType } from "../../utils/inputs";
import { useRouter } from "next/router";
import style from "./styles/SignUp.module.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/contextUser";
import UserContextType from "@/utils/interfaces";
import Image from "next/image";
import Background from "@/images/background.png"
import Post from "@/images/Post.png"
import Login from "../sign-in";
import twitch from "@/images/twitch.png"
import twitch2 from "@/images/twitch2.png"
import face from "@/images/face.png"
import face2 from "@/images/face-branco.jpeg"
import logo from "@/images/logo.jpg"

const Cadastro = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Aqui você pode lidar com o arquivo como quiser, por exemplo, enviá-lo para o servidor.
    }
  };

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

  return (
    <div className={style.background3}>
      <div className={style.left3}>
        <Image className={style.back2} src={Background} alt="background100" />
        <h1 className={style.welcome}>Seja bem-vindo!</h1>
        <Image className={style.post3} src={Post} alt="background100"/>
      </div>
      <div className={style.right3}>
        <form>
          <div className={style.socialLogin}>
          </div>
          {signUpInput.map((input, index) => (
            <div key={index} className={style.container}>
              <label htmlFor={input} className={style.label}>{input}</label>
              {input === "Imagem de Perfil" ? (
                <div>
                  <label htmlFor={input} className={style.Label}>ㅤ</label>
                  <input type={signUpInputType[index]} id={input} name={input} placeholder={input} className={style.inputImage} onChange={handleFileChange}/>
                  {fileName && <span className={style.fileName}>{fileName}</span>}
                </div>
              ) : (
                <input type={input === 'senha' ? 'password' : 'text'} id={input} name={input}/>
              )}
            </div>
          ))}
          <button type="submit" className={style.enviar}>Enviar</button>
          <hr className={style.linha}/>
          <p className={style.p}>
                        Cadastre-se com
                    </p>
          <button className={style.loginFacebook}>
            <Image src={face} alt="Login com Facebook" className={style.facebook}/>
            <Image src={face2} alt="Login com Facebook" className={style.facebook2}/>
            Entrar com Facebook
          </button>
          <button className={style.loginTwitch} onClick={()=>twitchAuth()}>
              <Image src={twitch} alt="Login com Twitch" className={style.twitch}/>
              <Image src={twitch2} alt="Login com Twitch" className={style.twitch2}/>
                Entrar com Twitch
            </button>
        </form>
      </div>
    </div>
  );
};
export default Cadastro