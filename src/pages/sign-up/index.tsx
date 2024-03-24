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
import face from "@/images/face.png"

const Cadastro = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Aqui você pode lidar com o arquivo como quiser, por exemplo, enviá-lo para o servidor.
    }
  };

  return (
    <div className={style.background3}>
      <div className={style.left3}>
                <Image className={style.back2} src={Background} alt="background100" />
                <h1>Seja bem-vindo!</h1>
                <Image className={style.post3} src={Post} alt="background100" />
            </div>
      <div className={style.right3}>
        <form>
          <div className={style.socialLogin}>
              <Image src={face} alt="Login com Facebook" className={style.facebook}/>
              <Image src={twitch} alt="Login com Twitch" className={style.twitch}/>
            </div>
          {signUpInput.map((input, index) => (
            <div key={index}>
              <label htmlFor={input}></label>
              {input === "Imagem de Perfil" ? (
                <div className={style.inputImageContainer}>
                  <label htmlFor={input} className={style.chooseImageLabel}>Escolher Imagem</label>
                  <input type={signUpInputType[index]} id={input} name={input} placeholder={input} className={style.inputImage} onChange={handleFileChange}/>
                  {fileName && <span className={style.fileName}>{fileName}</span>}
                </div>
              ) : (
                <input type={input === 'senha' ? 'password' : 'text'} id={input} name={input} placeholder={input}/>
              )}
            </div>
          ))}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
export default Cadastro