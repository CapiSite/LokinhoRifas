import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Stick from "./components/Stick";
import Benefits from "./components/Benefits";
import AboutLokinho from "./components/About";
import Image from "next/image";
import style from "./styles/background.module.css";
import Background from "@/images/background.png"
import BackgroundMobile from "./images/backgroundMobile.png"
import BackgroundAboutMob from "./images/backgroundMobileAbout.png"
import { useEffect } from "react";
import axios from "axios";

export default function About() {

  return (
    <>
    <Image className={style.back} src={Background} alt="background"/>
    <Image className={style.backMob} src={BackgroundMobile} alt="background"/>
    <Image className={style.backAboutMob} src={BackgroundAboutMob} alt="background"/>
      {/* <Header/> */}
      <Carousel/>
      <Stick/>
      <Benefits/>
      <AboutLokinho/>
    </>
  );
}