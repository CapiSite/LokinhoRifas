import style from "@/styles/Carousel.module.css"
import Prancheta from "@/../public/Prancheta1.png"
import device from "@/../public/dev1ce.webp"
import Image from "next/image";
export default function Carousel() {
  return (
    <>
    <div className={style.background}>
      <Image src={Prancheta} className={style.carousel} alt="Prancheta"/>
      <Image src={device} className={style.image} alt="device"/>
      <h1>AOBA</h1>
    </div>
    </>
  );
}