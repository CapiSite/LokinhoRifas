import style from "@/styles/Benefits.module.css";
import Prancheta from "@/../public/Prancheta2.png"
import { BsTwitch } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeopleCircleOutline } from "react-icons/io5";
import GroupPhoto from "@/../public/GroupImageRed.png"

import Image from "next/image";
export default function Benefits() {
  return (
    <>
      <div className={style.background}>
        <Image className={style.img} alt="background" src={Prancheta}/>
        <div className={style.index}>
        <div className={style.text}>
            <h1>NOSSAS</h1>
            <h1>VANTAGENS!</h1>
        </div>
        <div className={style.cardBenefits}>
            <div>
                <FaRegCalendarAlt/>
                <h1>SORTEIOS DIÁRIOS</h1>
                <p>Realizamos sorteios diariamente, ou seja, você tem a oportunidade de ganhar uma skin nova todos os dias.</p>
            </div>
            <div className={style.line}></div>
            <div>
                <IoPeopleCircleOutline/>
                <h1>NOSSOS GRUPOS</h1>
                <p>Oferecemos um sorteio gratuito exclusivo para nossos clientes no final de cada mês. Concorra e ganhe!</p>
            </div>
            <div className={style.line}></div>
            <div>
                <BsTwitch/>
                <h1>LIVES NA TWITCH</h1>
                <p>Transmitimos ao vivo os sorteios das nossas rifas na nossa Twitch, utilizando a plataforma WheelOfNames para garantir a transparência e imparcialidade do processo.</p>
            </div>
        </div>
        <div className={style.card}>
            <Image width={250} alt="GroupPhoto" src={GroupPhoto}/>
        </div>
        <div className={style.card}>

        </div>
        </div>
      </div>
    </>
  );
}
