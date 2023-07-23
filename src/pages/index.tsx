import TopHeader from "@/Components/TopHeader";
import Header from "@/Components/Header";
import Carousel from "@/Components/Carousel";
import Stick from "@/Components/Stick";
import Benefits from "@/Components/Benefits";
import About from "@/Components/About";
import Footer from "@/Components/Footer";
import Form from "@/Components/Form";
import Background from "@/../public/background.png"
import BackgroundMobile from "@/../public/backgroundMobile.png"
import BackgroundAboutMob from "@/../public/backgroundMobileAbout.png"

import Image from "next/image";
import style from "@/styles/background.module.css"
export default function Home() {
  return (
    <>
    <Image className={style.back} src={Background} alt="background"/>
    <Image className={style.backMob} src={BackgroundMobile} alt="background"/>
    <Image className={style.backAboutMob} src={BackgroundAboutMob} alt="background"/>
      <TopHeader/>
      <Header/>
      <Carousel/>
      <Stick/>
      <Benefits/>
      <About/>
      <Footer/>
      <Form/>
    </>
  );
}
