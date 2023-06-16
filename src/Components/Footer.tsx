import style from "@/styles/Footer.module.css"
import Logo from "@/../public/Logo.png"
import Image from "next/image";


export default function Footer() {
  return (
    <>
    <div className={style.background}>
        <div className={style.left}>
        

        </div>
        <div className={style.line}></div>
        <div className={style.right}>
            <Image src={Logo} width={170} alt="Logo1" />
        </div>
      </div>
    </>
  );

}
