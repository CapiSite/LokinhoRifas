import { useState, useEffect } from "react";
import style from "./styles/home.module.css";
import Image from "next/image";


import Logo from '../about/images/banner_mob2.png'
import Banner from '../about/images/bannersite1.png'
import Background from '@/images/background.png'
import Exemplo from '@/images/lapis.png'


const Home = () => {

  return (
    <div className={style.Conteudo}>
      <Image src={Background} alt="" className={style.Background} />
      <Image src={Logo} alt="" className={style.Logo} />
      <button className={style.botaoComprarRifa}>
        Comprar Rifa
      </button>
      <div className={style.infoRifa}>
        <p>Próxima Rifa</p>
        <div className={style.horaRifa}>
          <p>0</p>
          <p>:</p>
          <p>08</p>
          <p>:</p>
          <p>50</p>
          <p>:</p>
          <p>23</p>
        </div>
      </div>
      <p className={style.AvisoSkins}>Últimas Skins</p>
      <div className={style.SkinsRifa}>
        <div>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
        </div>
        <div>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
          <Image src={Exemplo} alt="" className={style.ImagemRifa}/>
        </div>
      </div>
      <Image src={Banner} alt="" className={style.Logo2}/>
      <button className={style.botaoComprarRifa}>
        Comprar Rifa
      </button>
    </div>
  );
};

export default Home;