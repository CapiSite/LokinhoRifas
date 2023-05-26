import style from "@/styles/Carousel.module.css"
import Prancheta from "@/../public/Prancheta1.png"
import device from "@/../public/dev1ce.webp"
import Image from "next/image";
export default function Carousel() {
  return (
    <>
    <div className={style.background}>
      <div className={style.carousel}>
      
      <h1>A MELHOR RIFA </h1>
      <h1>CSGO</h1>
      <h1>ENTRE E GANHE!</h1>
      <Image src={Prancheta}  alt="Prancheta"/>
      </div>
      <Image src={device} className={style.image} alt="device"/>
    </div>
    </>
  );
}