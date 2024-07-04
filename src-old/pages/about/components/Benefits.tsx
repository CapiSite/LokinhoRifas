import style from "../styles/Benefits.module.css";
import Prancheta from "@/images/banner_5.png";
import { BsTwitch } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeopleCircleOutline } from "react-icons/io5";
import GroupPhoto from "../images/Logo-prata.jpg";
import GroupPhoto2 from "../images/Logo-dourada.jpg";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setHeight(component.current.scrollHeight);
      setFatherheight(
        text.current.scrollHeight +
        cardsBenefits.current.scrollHeight +
        component.current.scrollHeight +
        920

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
                Realizamos rifas de skins - Facas, luvas, armas, agentes e adesivos. Sempre após ao terminar uma começamos outra, com facilidades para participar e com valores diversos que cabem no seu bolso.
              </p>
            </div>
            <div className={style.line}></div>
            <div>
              <IoPeopleCircleOutline />
              <h1>NOSSOS GRUPOS</h1>
              <p>
                Nossos grupos de rifas - Compra e venda possuem administradores e moderadores de alta confiança no mercado de skins.
                Negociações 100% seguras. Temos sorteios gratuitos de skins e muitas promoções.              </p>
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
          <div>
            <div className={style.video2}>
              <video autoPlay muted className={style.video} controls >
                <source src="/video.mp4" type="video/mp4" />
                <source src="/video.webm" type="video/webm" />
                Seu navegador não suporta a reprodução de vídeos.
              </video>
              <div className={style.box}>
                <p className={style.title}>AS SKINS MAIS INSANAS POR PREÇOS MUITO BAIXOS</p>


                <p>Venha conhecer os grupos de rifas de skins com giros que são sempre ao vivo e com muita alegria e animação.</p>
                <Link href='https://chat.whatsapp.com/CXC6oVWoqy37bMUfiENeVx' target="_blank">
                  <button>FAZER PARTE</button>
                </Link>
              </div>
            </div>

          </div>
          <motion.div
            ref={component}
            animate={more ? { height: height } : { height: height / 2 }}
            initial={more ? { height: height / 2 } : { height: height }}
            transition={{ duration: 1.5 }}
            className={style.groups}
          >
            {group.map((o) => (
              <div id="card" className={style.card}>
                <Image width={250} alt="GroupPhoto" src={o.photo} />
                <div className={style.line2}>

                </div>
                <div className={style.group}>
                  <div>
                    <h1>{o.name}</h1>
                    <p>{o.description}</p>
                  </div>
                  <Link href={o.link} target="_blank">
                    <button>ENTRAR</button>
                  </Link>

                </div>
              </div>
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