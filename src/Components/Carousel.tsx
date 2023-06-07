import style from "@/styles/Carousel.module.css"
import banner_mob from "@/../public/banner_mob1.png"
import banner from "@/../public/banner_1.png"
import Image from "next/image";
export default function Carousel() {
  return (
    <>
    <div className={style.background}>
      <Image src={banner_mob}  className={style.mob} alt="Prancheta"/>
      <Image src={banner}  className={style.banner} alt="Prancheta"/>
    </div>
    </>
  );
}