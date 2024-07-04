
import axios from "axios";
import style from "./style/about-lokinho.module.css";
import Image from "next/image";
import ArtworkAbount from "@/images/ArtworkAbount.png"
export default function AboutLokinho() {

  return (
    <>  
      <div className={style.aboutContainer}>
      <Image src={ArtworkAbount} alt={""} className={style.imageCardLokinho}></Image>
      <div className={style.contentAbout}>
        <h1 className={style.TitleAbout}>Quem é thiago Cordeiro? </h1>
        <p className={style.descriptionAbout}>Conhecido como Lokinho, é um empreendedor determinado e apaixonado pelo universo das skins do Counter-Strike. Com uma experiência desde 2017 no jogo e adentrando no mercado de vendas em 2019, Thiago tem se destacado na construção de um sólido negócio centrado na comercialização e rifas de skins. Sua dedicação e visão estratégica têm sido fundamentais para o crescimento contínuo de sua empreitada. Agradeço pela oportunidade de compartilhar minha experiência e seja muito bem-vindo a esta jornada de sucesso."</p>
      </div>
      </div>
    </>
  );
}