"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import style from '../styles/NavBar.module.css'
import logovermelho from "@/images/logovermelho.png";

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div>
      <nav className={style.Nav}>
        <div className={style.Container}>
          <Image src={logovermelho} alt="Logo do site" className={style.Logo} />
          <div className={`${isOpen ? 'style.ContainerRoutes' : style.meuComponenteFlex}`}>
            <Link href="/home" className={style.Routes}>
              Home
            </Link>
            <Link href="/" className={style.Routes}>
              Sorteio
            </Link>
            <Link href="/twitch" className={style.Routes}>
              Live
            </Link>
            <Link href="/" className={style.Routes}>
              Últimos Ganhadores
            </Link>
            <Link href="/" className={style.Routes}>
              Sobre nós
            </Link>
          </div>
          <button type="button">
            <Link href="/sign-up" className={style.BotaoEntrar}>
              Entrar
            </Link>
          </button>
        </div>
      </nav>
    </div>

  )

}

export default NavBar