import { useState, useEffect } from "react";
import style from "./styles/home.module.css";
import Image from "next/image";

import Logo from '../about/images/banner_mob2.png'
import Background from '@/images/background.png'

const Home = () => {
 

  return (
    <>
      <div className={style.Conteudo}>
        <Image src={Background} alt="" className={style.Background}/>
        <Image src={Logo} alt="" className={style.Logo}/>
        <button className={style.botaoComprarRifa}>
          Comprar Rifa
        </button>
      </div>
    </>  
  );
};

export default Home;