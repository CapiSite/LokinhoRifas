import Image from "next/image";
import Logo from "@/../public/Logo1.png"
import style from "@/styles/Header.module.css"

export default function Header() {

  const handleScroll = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("about");
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.background}>
      <div className={style.image}>
        <Image src={Logo} width={170} alt="Logo1" />
      </div>
      <div className={style.buttons}>
        <button className={style.button}>HOME</button>
        <button className={style.button} onClick={(e) => handleScroll(e)}> SOBRE </button>
        <button className={style.button}>CONTATO</button>
        <button className={style.do}>FAÇA PARTE</button>
      </div>
    </div>
  );
}
