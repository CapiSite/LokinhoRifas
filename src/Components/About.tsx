import style from "@/styles/About.module.css";
import Image from "next/image";
import Artwork from "@/../public/Artwork.png"
import BackgroundAbout from "@/../public/backgroundAbout.png"
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export default function About() {
  const options = {
    scale: 1.10,
    speed: 300,
    max: 10
  };
  const tilt:any = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);
  return (
    <div className={style.forLine}>
    <Image className={style.backAbout} src={BackgroundAbout} alt="background"/>

      <div className={style.background} id="about">
        <div className={style.left}>
          <h1>QUEM <span>SOMOS</span></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it
            to make a type specimen book. It has survived not only
            ve centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
            desktop publishing software like Aldus PageMaker in
          </p>
        </div>
        <div data-tilt className={style.right}>
          <Image  ref={tilt} alt="lokinho" src={Artwork} width={550} />
        </div>
      </div>
    </div>
  );
}
