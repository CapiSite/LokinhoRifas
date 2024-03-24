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
          {signUpInput.map((input, index) => (
            <div key={index}>
              <label htmlFor={input}></label>
              {input === "Imagem de Perfil" ? (
                <div className={style.inputImageContainer}>
                  <input type={signUpInputType[index]} id={input} name={input} placeholder={input} className={style.inputImage} onChange={handleFileChange} />
                  <label htmlFor={input} className={style.chooseImageLabel}>Escolher Imagem</label>
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