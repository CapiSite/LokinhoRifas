import Image from "next/image";
import Logo from "@/../public/Logo.png"

export default function Header() {
  return (
      <div className="h-36 bg-white flex">
        <div className="w-1/2 bg-white flex items-center pl-28">
          <Image src={Logo} width={170} alt="Logo"/>
        </div>
        <div className="h-36 flex justify-end items-center pr-[40px] bg w-1/2">
          <button className="bg-white text-gray h-10 font-Montserrat font-medium text-lg ml-8">HOME</button>
          <button className="bg-white text-gray h-10 font-Montserrat font-medium text-lg ml-8">SOBRE</button>
          <button className="bg-white text-gray h-10 font-Montserrat font-medium text-lg ml-8">CONTATO</button>
          <button className="w-40 ml-8 bg-use-red text-white font-Montserrat rounded-md font-bold h-10 text-xl">FAÇA PARTE</button>
        </div>
      </div>
  );
}
