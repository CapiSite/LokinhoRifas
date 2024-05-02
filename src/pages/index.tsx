import { UserContext } from "@/utils/contextUser";
import UserContextType from "@/utils/interfaces";
import axios from "axios";
import { useContext, useEffect } from "react";
import style from "./home.module.css";
import Image from "next/image";
import Logo from './about/images/banner_mob2.png';
import Banner from './about/images/bannersite1.png';
import Background from '@/images/background.png';
import Luva from '@/images/luva2.jpg';
import Awp from '@/images/awp.jpg';
import M4A1 from '@/images/m4a1.png';

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
    <div className={style.Conteudo}>
      <Image src={Background} alt="" className={style.Background} />
      <Image src={Logo} alt="" className={style.Logo} />
      <button className={style.botaoComprarRifa}>
        Comprar Rifa
      </button>
      <div className={style.infoRifa}>
        <p>Próxima Rifa</p>
        <div className={style.horaRifa}>
          <p>0</p>
          <p>:</p>
          <p>08</p>
          <p>:</p>
          <p>50</p>
          <p>:</p>
          <p>23</p>
        </div>
      </div>
      <p className={style.AvisoSkins}>Últimas Skins</p>
      <div className={style.SkinsRifa}>
        <div>
          <Image src={M4A1} alt="" className={style.ImagemRifa}/>
          <Image src={Luva} alt="" className={style.ImagemRifa}/>
          <Image src={Awp} alt="" className={style.ImagemRifa}/>
        </div>
        <div>
          <Image src={Luva} alt="" className={style.ImagemRifa}/>
          <Image src={Awp} alt="" className={style.ImagemRifa}/>
          <Image src={M4A1} alt="" className={style.ImagemRifa}/>
        </div>
      </div>
      <Image src={Banner} alt="" className={style.Logo2}/>
      <button className={style.botaoComprarRifa}>
        Comprar Rifa
      </button>
    </div>
  );
}