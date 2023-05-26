import Image from "next/image";
import Logo from "@/../public/Logo.png"
import style from "@/styles/Header.module.css"

export default function Header() {
  return (
      <div className={style.background}>
        <div className={style.image}>
          <Image src={Logo} width={170} alt="Logo"/>
        </div>
        <div className={style.buttons}>
          <button className={style.button}>HOME</button>
          <button className={style.button}>SOBRE</button>
          <button className={style.button}>CONTATO</button>
          <button className={style.do}>FAÇA PARTE</button>
        </div>
      </div>
  );
}
