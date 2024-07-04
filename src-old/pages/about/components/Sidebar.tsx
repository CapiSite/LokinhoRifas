import Profile from './Profile';
import Image from 'next/image';
import HeaderSidebar from './HeaderSidebar';
import style from "../styles/Sidebar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import Logo from '@/images/logo.jpg';

export default function Sidebar({ sideBar, setSideBar }: any) {
  const router = useRouter();

  return (

    <div className={style.background}>
      <AiOutlineClose onClick={() => setSideBar(!sideBar)} />
      <Profile />
      <Image src={Logo} alt='Logo do site' className={style.Logo} />
      <p className={style.Per}>entre ou cadastre-se</p>
      <p>e encontre as mais incríveis personalizações para você!</p>
      <div className={style.UserActions}>
        <button onClick={() => router.push("/sign-in")} className={style.BotaoEntrar}>
          entrar
        </button>
        <button className={style.BotaoCadastrar} type="button" onClick={() => router.push("/sign-up")}>
          cadastrar
        </button>
      </div>
      <hr className={style.Linha} />
      <div className={style.RoutesContainer}>
        <button onClick={() => router.push("/")} className={style.Routes}>
          Home
        </button>
        <button onClick={() => router.push("/roulette")} className={style.Routes}>
          Sorteio
        </button>
        <button onClick={() => router.push("/twitch")} className={style.Routes}>
          Live
        </button>
        <button onClick={() => router.push("/winners")} className={style.Routes}>
          Últimos Ganhadores
        </button>
        <button onClick={() => router.push("/about")} className={style.Routes}>
          Sobre nós
        </button>
      </div>
      <hr className={style.Linha} />
      <HeaderSidebar />
    </div>
  );
}