"use client";
import { useState } from "react";

import Image from "next/image";
import style from '../styles/NavBar.module.css'
import logovermelho from "@/images/logovermelho.png";
import  { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  //const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (

    <div>
      <nav className={style.Nav}>
        <div className={style.Container}>
          <Image src={logovermelho} alt="Logo do site" className={style.Logo} />
          <div className={`${isOpen ? 'style.ContainerRoutes' : style.meuComponenteFlex}`}>
            <Link onClick={() => router.push("/")} className={style.Routes} href={""}>
              Home
            </Link>
            <Link onClick={() => router.push("/roulette")} className={style.Routes} href={""}>
              Sorteio
            </Link>
            <Link  onClick={() => router.push("/twitch")} className={style.Routes} href={""}>
              Live
            </Link>
            <Link onClick={() => router.push("/winners")} className={style.Routes}href={""}>
              Últimos Ganhadores
            </Link>
            <Link onClick={() => router.push("/about")} className={style.Routes}href={""}>
              Sobre nós
            </Link>
          </div>
          <button type="button">
             {/* onClick={() => router.push(isLoggedIn ? '/perfil' : '/sign-in')} colocar no bortao abaixo vara verificar se esta logado ou n */}
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