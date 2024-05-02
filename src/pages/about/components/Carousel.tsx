import style from "../styles/Carousel.module.css";
import banner_mob from "../images/bannercelular1.png";
import banner from "../images/bannersite1.png";
import banner_mob2 from "../images/banner_mob2.png";
import banner2 from "../images/banner_2.png";
import banner_mob3 from "../images/banner_mob3.png";
import banner3 from "../images/banner_3.png";
import banner_mob4 from "../images/banner_mob4.png";
import banner4 from "../images/banner_4.png";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/router";
export default function Carousel() {
  const router = useRouter()
  return (
    <>
      <div className={style.background}>
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={4000}
        className={style.slider}>
        <div onClick={()=>{
          router.push("/")
        }}>
          <Image src={banner} className={style.banner} alt="Prancheta" />
        </div>
        <div onClick={()=>{
          router.push("/")
        }}>
        <Image src={banner2} className={style.banner} alt="Prancheta" />
        </div>
        <div onClick={()=>{
          router.push("/")
        }}>
        <Image src={banner3} className={style.banner} alt="Prancheta" />
        </div>
        
      </Slider>
      </div>
      <div className={style.backgroundMob}>
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={4000}
        className={style.slider}
      >
        <div>
          <Image src={banner_mob} className={style.mob} alt="Prancheta" />
        </div>
        <div>
        <Image src={banner_mob2} className={style.mob} alt="Prancheta" />
        </div>
        <div>
        <Image src={banner_mob3} className={style.mob} alt="Prancheta" />
        </div>
      </Slider>
      </div>
    </>
  );
}