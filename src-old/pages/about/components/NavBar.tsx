import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from '../styles/NavBar.module.css';
import Logo from "../images/Logo.png";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../utils/contextUser";
import UserContextType from "../../../utils/interfaces";
import axios from "axios";
import defaultImage from "../../../images/foto-perfil-ex.png";

const NavBar = ({ setPopUpInfo }:any) => {
  const [token, setToken] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) {
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth", {}, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }).then((res) => {
          setUserInfo({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            picture: res.data.user.picture,
            token: res.data.user.token,
            isAdmin: res.data.user.isAdmin,
            phoneNumber: res.data.user.phoneNumber,
            tradeLink: res.data.user.tradeLink
          });
        }).catch((err) => {
          localStorage.setItem("token", "");
          setUserInfo({ id: "", name: "", email: "", picture: "", token: "", isAdmin: false, phoneNumber: "", tradeLink: "" });
        });
      }
    }
  }, [setUserInfo, userInfo.picture]);

  const router = useRouter();

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function handleLogout() {
    localStorage.setItem("token", "");
    setUserInfo({ id: "", name: "", email: "", picture: "", token: "", isAdmin: false, phoneNumber: "", tradeLink: "" });
    setIsDropdownOpen(false)
    router.push('/sign-in');
  };

  return (
    <div>
      <nav className={style.Nav}>
        <div className={style.Container}>
          <Image src={Logo} onClick={() => router.push("/")} alt="Logo do site" className={style.Logo} />
          <div>
            <button onClick={() => router.push("/")} className={style.Routes}>Home</button>
            <button onClick={() => router.push("/roulette")} className={style.Routes}>Sorteio</button>
            <button onClick={() => router.push("/twitch")} className={style.Routes}>Live</button>
            <button onClick={() => router.push("/winners")} className={style.Routes}>Últimos Ganhadores</button>
            <button onClick={() => router.push("/about")} className={style.Routes}>Sobre nós</button>
          </div>
          <div className={style.dropdown}>
          
          {userInfo.picture ? (
            <div className={style.profileContainer} onClick={handleProfileClick}>
            <Image
              src={userInfo.picture === "default" ? defaultImage :
                   (userInfo.picture).startsWith('https://static-cdn.jtvnw.net') ?
                   userInfo.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${userInfo.picture}`}
              width={50}
              height={50}
              alt="User Profile"
              className={style.FotoPerfil}
            />
          </div>
          ) : (
            <button onClick={() => router.push("/sign-in")} className={style.BotaoEntrar}>Entrar</button>
          )}
          
          </div>
          <div className={style.sidebar}>
            <FaBars onClick={() => setSideBar(!sideBar)} />
          </div>

          <AnimatePresence>
            {!sideBar ? null : (
              <motion.aside
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ duration: 0.5 }}
                className={style.aside}
              >
                <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
              animate={{ y: 0 }}
              initial={{ y: -80 }}
              exit={{ y: -80 }}
              transition={{ duration: 0.5, type: "tween" }}
                className={style.dropdownMenu}
              >
                <button onClick={()=>handleLogout()} className={style.dropdownItem}>Sair</button>
                <button className={style.dropdownItem} onClick={()=>setPopUpInfo(true)}>Configuração</button>
              </motion.div>
            )}
          </AnimatePresence>
          
    </div>
  );
};

export default NavBar;
