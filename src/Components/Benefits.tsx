import style from "@/styles/Benefits.module.css";
import Prancheta from "@/../public/banner_5.png";
import { BsTwitch } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeopleCircleOutline } from "react-icons/io5";
import GroupPhoto from "@/../public/Logo-prata.jpg";
import GroupPhoto2 from "@/../public/Logo-dourada.jpg";
import GroupPhoto3 from "@/../public/Logo-verde.jpg";
import GroupPhoto4 from "@/../public/Logo-vermelho.jpg";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";
import Card from "./Cards";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Benefits() {
  const [more, setMore] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const [fatherHeight, setFatherheight] = useState<number>(0);
  const text = useRef<any>();
  const cardsBenefits = useRef<any>();
  const component = useRef<any>();

  const group = [
    {
      name: "GRUPO DE RIFAS SILVER",
      description:
        "Entre no nosso grupo de RIFAS SILVER e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços baixos a medianas.",
      photo: GroupPhoto,
      link: "https://chat.whatsapp.com/CXC6oVWoqy37bMUfiENeVx",
    },
    {
      name: "GRUPO DE RIFAS GOLDEN",
      description:
        "Entre no nosso grupo de RIFAS GOLDEN e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços medianos a altos com floats baixíssimo e promoções diferenciadas.",
      photo: GroupPhoto2,
      link: "https://chat.whatsapp.com/I6z9eUyNp33EpLAxLWmOId",
    },
    {
      name: "GRUPO DE COMPRA E VENDA",
      description:
        "Seja bem vindo ao maior grupo de Lokinho Rifas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!",
      photo: GroupPhoto3,
      link: "https://chat.whatsapp.com/EWKrihA9OUn8TjjX33oGuK",
    },
    {
      name: "GRUPO DE COMPRA E VENDA 2",
      description:
        "Seja bem vindo ao grupo de compra e venda 2 do Lokinho Rifas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!",
      photo: GroupPhoto4,
      link: "https://chat.whatsapp.com/C5N0eKOmRKN9eWLMJ4gyKp",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setHeight(component.current.scrollHeight);
      setFatherheight(
        text.current.scrollHeight +
          cardsBenefits.current.scrollHeight +
          component.current.scrollHeight +
          340
      );
    };
    handleResize();

    setTimeout(handleResize, 400);
    setTimeout(handleResize, 1000);
    setTimeout(handleResize, 1600);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <motion.div
        className={style.background}
        animate={
          more
            ? { height: fatherHeight, opacity: 1 }
            : { height: fatherHeight - height / 2, opacity: 1 }
        }
        initial={
          more ? { height: 2000, opacity: 0 } : { height: 2000, opacity: 0 }
        }
        transition={{ duration: 1.5 }}
      >
        <Image
          id="cards"
          className={style.img}
          alt="background"
          src={Prancheta}
        />
        <div className={style.index}>
          <div className={style.text} ref={text}>
            <h1>NOSSAS</h1>
            <h1>VANTAGENS!</h1>
          </div>
         
          <div className={style.cardBenefits} ref={cardsBenefits}>
            
            <div>
              <FaRegCalendarAlt />
              <h1>SORTEIOS DIÁRIOS</h1>
              <p>
              Realizamos rifas de skins - Facas, luvas, armas, agentes e adesivos. Sempre após ao terminar uma começamos outra e com facilidades para participar e com variedade de preços.
              </p>
            </div>
            <div className={style.line}></div>
            <div>
              <IoPeopleCircleOutline />
              <h1>NOSSOS GRUPOS</h1>
              <p>
              Nossos grupos de rifas - Compra e venda possuem administradores e moderadores de alta confiança no mercado de skins. temos sorteios free de skins e muita promoção e negociações 100% seguras.
              </p>
            </div>
            <div className={style.line}></div>
            <div>
              <BsTwitch />
              <h1>LIVES NA TWITCH</h1>
              <p>
              Transmitimos nossos sorteios sempre ao vivo na twitch ou instagram. Utilizando a plataforma WheelOfNames.
              </p>
            </div>
          </div>
          
          <motion.div
            ref={component}
            animate={more ? { height: height } : { height: height / 2 }}
            initial={more ? { height: height / 2 } : { height: height }}
            transition={{ duration: 1.5 }}
            className={style.groups}
          >
            {group.map((o, i) => (
              <Card more={more} i={i} group={o} key={i} />
            ))}
          </motion.div>

          {more ? (
            <motion.div
              onClick={() => setMore(!more)}
              className={style.seeMore}
            >
              <h1>VER MENOS</h1>
              <MdOutlineKeyboardArrowUp />
            </motion.div>
          ) : (
            <motion.div
              onClick={() => setMore(!more)}
              className={style.seeMore}
            >
              <h1>VER MAIS</h1>
              <MdKeyboardArrowDown />
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
