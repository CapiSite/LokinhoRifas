import style from "@/styles/Benefits.module.css";
import Prancheta from "@/../public/Prancheta2.png"
import { BsTwitch } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeopleCircleOutline } from "react-icons/io5";
import GroupPhoto from "@/../public/GroupImageRed.png"
import GroupPhoto2 from "@/../public/GroupImageYellow.png"
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";
import Card from "./Cards";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Benefits() {
  const [more, setMore] = useState(false)
  const [screenWidth, setWidth] = useState<number>(1200)
  const group = [{ name: "GRUPO DE RIFAS", description: "Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto },
  { name: "GRUPO 2", description: "Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto2 },
  { name: "GRUPO 3", description: "Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto },
  { name: "GRUPO 4", description: "Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto2 }
  ]

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <motion.div className={style.background}
        animate={more && screenWidth > 1012 ? { height: 2450 } : more ? { height: 3000 } : screenWidth > 1012 ? { height: 1650 } : { height: 1760 }}
        initial={more && screenWidth > 1012 ? { height: 1650 } : more ? { height: 1760 } : screenWidth > 1012 ? { height: 3250 } : { height: 3550 }}
        transition={{ duration: 2 }}>
        <Image className={style.img} alt="background" src={Prancheta} />
        <div className={style.index}>
          <div className={style.text}>
            <h1>NOSSAS</h1>
            <h1>VANTAGENS!</h1>
          </div>
          <div className={style.cardBenefits}>
            <div>
              <FaRegCalendarAlt />
              <h1>SORTEIOS DIÁRIOS</h1>
              <p>Realizamos sorteios diariamente, ou seja, você tem a oportunidade de ganhar uma skin nova todos os dias.</p>
            </div>
            <div className={style.line}></div>
            <div>
              <IoPeopleCircleOutline />
              <h1>NOSSOS GRUPOS</h1>
              <p>Oferecemos um sorteio gratuito exclusivo para nossos clientes no final de cada mês. Concorra e ganhe!</p>
            </div>
            <div className={style.line}></div>
            <div>
              <BsTwitch />
              <h1>LIVES NA TWITCH</h1>
              <p>Transmitimos ao vivo os sorteios das nossas rifas na nossa Twitch, utilizando a plataforma WheelOfNames para garantir a transparência e imparcialidade do processo.</p>
            </div>
          </div>

          <motion.div
            animate={more && screenWidth > 1012 ? { height: 1600 } : more ? { height: 2700 } : screenWidth > 1012 ? { height: 800 } : { height: 910 }}
            initial={more && screenWidth > 1012 ? { height: 800  } : more ? { height: 910 } : screenWidth > 1012 ? { height: 2400 } : { height: 2700 }}

            transition={{ duration: 2 }} className={style.groups}>
            {group.map((o, i) => <Card more={more} i={i} group={o} key={i} />)}
          </motion.div>

          {more ?
            <motion.div onClick={() => setMore(!more)} className={style.seeMore}>
              <h1>VER MENOS</h1>
              <MdOutlineKeyboardArrowUp />
            </motion.div>
            :
            <motion.div onClick={() => setMore(!more)} className={style.seeMore}>
              <h1>VER MAIS</h1>
              <MdKeyboardArrowDown />
            </motion.div>
          }
        </div>
      </motion.div>
    </>
  );
}
