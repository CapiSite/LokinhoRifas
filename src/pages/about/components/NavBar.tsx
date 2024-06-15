"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from '../styles/NavBar.module.css';
import Logo from "../images/Logo.png";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { UserContext } from "@/utils/contextUser";
import UserContextType from "@/utils/interfaces";
import axios from "axios";
import defaultImage from "../../../images/foto-perfil-ex.png";
const NavBar = () => {
  const [token, setToken] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
  const [loaded, setLoaded] = useState(false);  // Novo estado para controle de carregamento

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth", {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).then((res: any) => {
        setUserInfo({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          picture: res.data.user.picture,
          token: res.data.user.token,
          isAdmin: res.data.user.isAdmin
        });
        setLoaded(true)
      }).catch((err: any) => {
        localStorage.setItem("token", "");
        setUserInfo({ id: "", name: "", email: "", picture: "", token: "", isAdmin: false });
      });
    }
  }
  }, [setUserInfo, token, setToken]);

  const router = useRouter();
  const [sideBar, setSideBar] = useState<boolean>(false);

  const initial = {
    x: 500,
  };

  const animate = {
    x: 0,
  };

  const transition = {
    duration: 0.5,
  };

  return (
    <div>
      <nav className={style.Nav}>
        <div className={style.Container}>
          <Image src={Logo} alt="Logo do site" className={style.Logo} />
          <div>
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

          {token && loaded ? (
  <Image
    key={userInfo.picture}  // Usando userInfo.picture como chave para forçar re-renderização
    src={userInfo.picture === "default" ? defaultImage :
         userInfo.picture.startsWith('https://static-cdn.jtvnw.net') ?
         userInfo.picture : `http://localhost:5000/uploads/${userInfo.picture}`}
    width={50}
    height={50}
    alt="User Profile"
    className={style.FotoPerfil}
    onLoadingComplete={() => setLoaded(false)}  // Reinicia o estado após a imagem ser carregada
  />
) : (
  <button onClick={() => router.push("/sign-in")} className={style.BotaoEntrar}>Entrar</button>
)}
          
          <div className={style.sidebar}>
            <FaBars onClick={() => setSideBar(!sideBar)} />
          </div>
          <AnimatePresence>
            {!sideBar ? null : (
              <motion.aside
                initial={initial}
                animate={animate}
                exit={initial}
                transition={transition}
                className={style.aside}
              >
                <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
