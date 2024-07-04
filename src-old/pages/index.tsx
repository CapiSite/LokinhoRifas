import { UserContext } from "../utils/contextUser";
import UserContextType from "../utils/interfaces";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import style from "./home.module.css";
import Image from "next/image";
import BG from '@/images/BG.jpg';
import RaffleGroup from "./componentsHome/raffle-group";
import AboutLokinho from "./componentsHome/about-lokinho";
import PopUpBuy from "../components/pop-up-buy";
import home from "@/images/home.png"

export default function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType
  const [PopUp, setPopUp] = useState(false);

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
    <div className={style.Container}>
    <Image src={home} alt="Papel de parede do site" className={style.Background} />
    <div className={style.Titulo}>
      <p>
        <span>Transforme</span> seu <br /> inventário com o <br /><span>Lokinho</span>
      </p>
      <p className={style.subTitulo}>
      Fazemos upgrade, compra e venda. <br /> Precisa de uma skin especifica? Também fazemos encomendas!
      </p>
      <button onClick={() => setPopUp(true)}></button>
      
        </div>
        {PopUp?<PopUpBuy setPopUp={setPopUp}></PopUpBuy>:<></>
        }
  </div>
  );
}