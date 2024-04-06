import Header from "@/pages/about/components/Header";
import Carousel from "@/pages/about/components/Carousel";
import Stick from "@/pages/about/components/Stick";
import Benefits from "@/pages/about/components/Benefits";
import AboutLokinho from "@/pages/about/components/About";
import Image from "next/image";
import style from "./styles/background.module.css";
import Background from "@/images/background.png"
import BackgroundMobile from "./images/backgroundMobile.png"
import BackgroundAboutMob from "./images/backgroundMobileAbout.png"
import { useEffect } from "react";
import axios from "axios";

export default function About() {

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/auth/twitch`, { code });
        localStorage.setItem('token', res.data.token);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, []);

  return (
    <>
    <Image className={style.back} src={Background} alt="background"/>
    <Image className={style.backMob} src={BackgroundMobile} alt="background"/>
    <Image className={style.backAboutMob} src={BackgroundAboutMob} alt="background"/>
      <Header/>
      <Carousel/>
      <Stick/>
      <Benefits/>
      <AboutLokinho/>
    </>
  );
}
