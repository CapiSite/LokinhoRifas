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
import { useState } from "react";
export default function Benefits() {
    const [more, setMore] = useState(false)
    const group = [{name:"GRUPO DE RIFAS", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto},
    {name:"GRUPO 2", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto2},
    {name:"GRUPO 3", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto},
    {name:"GRUPO 4", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto2},
    {name:"GRUPO 5", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto},
    {name:"GRUPO 6", description:"Seja bem vindo ao maior grupo de Lokinho RIfas! Aqui nós fazemos rifas de Skins do Counter Strike dos mais variados tipos. Tem desde o item mais barato até o mais Top!", photo: GroupPhoto2}
    ]


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
         {group.map((o,i)=> <Card group={o} key={i}/>)}
         {more?
         <div className={style.seeMore}>
            <h1>VER MENOS</h1>
            <MdOutlineKeyboardArrowUp/>
        </div>
        :  
        <div className={style.seeMore}>
            <h1>VER MAIS</h1>
            <MdKeyboardArrowDown/>
        </div>
        }
         
        </div>
        
      </div>
    </>
  );
}
