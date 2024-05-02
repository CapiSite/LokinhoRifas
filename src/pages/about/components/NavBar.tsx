"use client";
import { useState } from "react";

import Image from "next/image";
import style from '../styles/NavBar.module.css'
import Logo from "../images/Logo.png"
import { useRouter } from "next/router";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";


const NavBar = () => {
  const router = useRouter();
  //const { isLoggedIn } = useAuth();
  const [sideBar, setSideBar] = useState<boolean>(false)
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

            {/* onClick={() => router.push(isLoggedIn ? '/perfil' : '/sign-in')} colocar no bortao abaixo vara verificar se esta logado ou n */}
            <button  onClick={() => router.push("/sign-in")} className={style.BotaoEntrar}>
              Entrar
            </button>

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

  )

}

export default NavBar 