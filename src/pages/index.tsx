import { UserContext } from "@/utils/contextUser";
import UserContextType from "@/utils/interfaces";
import axios from "axios";
import { useContext, useEffect } from "react";
import style from "./home.module.css";
import Image from "next/image";
import BG from '@/images/BG.jpg';


export default function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/auth/twitch`, { code });
          localStorage.setItem('token', res.data.sessionToken);
          setUserInfo({ ...userInfo, id: res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.sessionToken })
        } catch (error) {
          console.error('Error:', error);
        }
      }

    })();
  }, []);
  return (
    <>
      <div className={style.teste}>
        <Image src={BG} alt="" className={style.Background} />
        <div className={style.conteinerTexte}>
          <h1 className={style.Title}>Trasforme <p className={style.white}>seu Inventário com o</p>Lokinho</h1>
          <h3 className={style.Subtitle}>Fazemos upgrade, copra e venda. Precisa de uma<br /> skin especifica? Também fazemos encomendas</h3>
          <button className={style.ButtonBudget}><p className={style.textbutton}>faça seu Orçamento</p></button>
        </div>
      </div >
      {/* <div className={style.titleContainer}>
        <h1 className={style.white}>Nossas Vantagens:</h1>
      </div> */}
      <div className={style.teste2}>
        <div className={style.ContainerVantagens}>
          {/* <div className={style.circulo}></div> */}
          <h1 className={style.Titledescription}>SORTEIOS DIARIOS</h1>
          <p className={style.description}>Realizamos rifas de skins - Facas, luvas, armas, agentes e adesivos. Sempre após ao terminar uma começamos outra, com facilidades para participar e com valores diversos que cabem no seu bolso.</p>
        </div>
        <div className={style.ContainerVantagens}>
          {/* <div className={style.circulo}></div> */}
          <h1 className={style.Titledescription}>NOSSOS GRUPOS</h1>
          <p className={style.description}>Nossos grupos de rifas - Compra e venda possuem administradores e moderadores de alta confiança no mercado de skins. Negociações 100% seguras. Temos sorteios gratuitos de skins e muitas promoções.</p>
        </div>
        <div className={style.ContainerVantagens}>
          {/* <div className={style.circulo}></div> */}
          <h1 className={style.Titledescription}>LIVES NA TWITCH</h1>
          <p className={style.description}>Transmitimos nossos sorteios sempre ao vivo na twitch ou instagram. Utilizando a plataforma WheelOfNames.</p>
        </div>
      </div>
    </>
  );
}