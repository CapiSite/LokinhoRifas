
import axios from "axios";
import style from "./style/raffle-group.module.css";
import Image from "next/image";
import logoSilver from '@/images/logoSilver.png';
import logoGold from '@/images/logoGold.png';
import BG from '@/images/m4a1.png';
export default function RaffleGroup() {

  return (
    <>  
      <div className={style.conteinerRaffle}>
      <Image src={BG} alt="" className={style.BackgroundGroupRaffle} />
        <h1 className={style.TitleRaffle}>Grupos De Rifas</h1>
        <div className={style.groupRaffle}>
          <div className={style.ContentRaffleGold}>
            <Image src={logoGold} alt={""} width={344} className={style.ImageRaffle}></Image>
            <h1 className={style.TitleCard} >Grupo Gold</h1>
            <p className={style.descriptionGroupRaffle}>Entre no nosso grupo de RIFAS GOLDEN e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços medianos a altos com floats baixíssimo e promoções diferenciadas.</p>
            <button className={style.buttonGroupWhats}>Entrar</button>
          </div>
          <div className={style.ContentRaffleSilver}>
            <Image src={logoSilver} alt={""} width={344} className={style.ImageRaffle}></Image>
            <h1 className={style.TitleCard} >Grupo Silver</h1>
            <p className={style.descriptionGroupRaffle}>Entre no nosso grupo de RIFAS SILVER e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços baixos a medianas.</p>
            <button className={style.buttonGroupWhats}>Entrar</button>
          </div>
        </div>
      </div>
    </>
  );
}