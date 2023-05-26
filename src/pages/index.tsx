import TopHeader from "@/Components/TopHeader";
import Header from "@/Components/Header";
import Prancheta from "@/../public/Prancheta1.png"
import device from "@/../public/dev1ce.webp"
import Image from "next/image";
export default function Home() {
  return (
    <>
      <TopHeader/>
      <Header/>
      <div className="w-[100%] h-[500px] bg-black flex">
      <Image src={Prancheta} className="w-[50%] h-[100%] " alt="Prancheta"/>
      <Image src={device} className="w-[50%] h-[100%]" alt="device"/>
      </div>
    </>
  );
}
