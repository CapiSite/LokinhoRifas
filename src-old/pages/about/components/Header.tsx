import Image from "next/image";
import Logo from "../images/Logo.png"
import style from "../styles/Header.module.css"
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { UserContext } from "../../../utils/contextUser";
import UserContextType from "../../../utils/interfaces";

export default function Header() {
  const [sideBar, setSideBar] = useState<boolean>(false)
  const router = useRouter()
  const initial = {
    x: 500,
  };

  const animate = {
    x: 0,
  };

  const transition = {
    duration: 0.5,
  };
  const handleScroll = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("about");
    window.scrollTo({
      top: elem?.getBoundingClientRect().top ? elem?.getBoundingClientRect().top  - 70 : 0,
      behavior: "smooth",
    });
  };
  const handleScroll2 = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("cards");
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.centralizer}>
    <div className={style.background}>
      <div className={style.image}>
        <Image onClick={()=>router.push("/")} src={Logo} width={155} alt="Logo1" />
      </div>
      <div className={style.buttons}>
        <button className={style.button} onClick={()=>router.push("/")}>HOME</button>
        <button className={style.button} onClick={(e) => handleScroll(e)}> SOBRE </button>
        <button className={style.do} onClick={(e) => handleScroll2(e)}>FAÇA PARTE</button>
      </div>
      <div className={style.sidebar}>
        <FaBars onClick={()=>setSideBar(!sideBar)}/>
      </div>
      <AnimatePresence>
        {!sideBar ? null : (
          <motion.aside
            initial={initial}
            animate={animate}
            exit={initial}
            transition={transition}
            className={style.aside}
          >
        <Sidebar sideBar={sideBar} setSideBar={setSideBar}/>
        </motion.aside>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}