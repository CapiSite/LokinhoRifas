import { useEffect, useState } from "react";
import { useSidebarState } from "../contexts/SidebarContext";

import { useRouter } from "next/router";
import { useUserStateContext } from "contexts/UserContext";
import axios from "axios";
import HeaderProfileMobile from "./HeaderProfileMobile";
import { SidebarContextType, UserContextType } from "utils/interfaces";
import Image from "next/image";

import logo from "../images/Logo.png";
import Instagram from "../assets/instagram.svg"
import Whatsapp from "../assets/Whatsapp.svg"

const Sidebar = () => {
  const { sidebarView, toggleSidebar } = useSidebarState() as SidebarContextType
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType;
  const [ showSettings, setShowSettings ] = useState<boolean>(false)

  const router = useRouter();

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    htmlElement?.classList.toggle("SidebarOn", sidebarView);

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        axios
          .post(
            process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth",
            {},
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          )
          .then((res) => {
            setUserInfo({
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              picture: res.data.user.picture,
              token: res.data.user.token,
              isAdmin: res.data.user.isAdmin,
              phoneNumber: res.data.user.phoneNumber,
              tradeLink: res.data.user.tradeLink,
              saldo: res.data.user.saldo,
            });
          })
          .catch((err) => {
            localStorage.setItem("token", "");
            setUserInfo({
              id: "",
              name: "",
              email: "",
              picture: "",
              token: "",
              isAdmin: false,
              phoneNumber: "",
              tradeLink: "",
              saldo: 0,
            });
          });
      }
    }
  }, [sidebarView, setUserInfo, userInfo.picture]);
  // * O código acima adiciona e retira scroll da página quando a Sidebar está visível

  const handleRedirectBtn = (route: string) => {
    router.push(`/${route}`);
    toggleSidebar();
  };

  return (
    <section
      className={
        sidebarView ? `Sidebar mobile tablet visible ${showSettings ? 'scrollOff' : ''}` : "Sidebar mobile tablet"
      }
    >
      <div className="SidebarWrapper">
        <div
          className="LogoBox"
          onClick={() => router.push("/")}
        >
            <Image className="Logo" src={logo} alt="Logo de Lokinho Rifas" />
        </div>
        <ul className="MainNavigation">
          <li onClick={() => handleRedirectBtn("/#Home")}>Home</li>
          <li onClick={() => handleRedirectBtn("/roleta")}>Sorteio</li>
          <li onClick={() => handleRedirectBtn("/live")}>Live</li>
          <li onClick={() => handleRedirectBtn("/ultimosganhadores")}>
            Últimos Ganhadores
          </li>
          <li onClick={() => handleRedirectBtn("/#SobreNos")}>Sobre Nós</li>
        </ul>
        {userInfo.token == "" ? (
          <button onClick={() => handleRedirectBtn("login")}>
            Faça Parte!
          </button>
        ) : (
          <div className="mobile">
            <HeaderProfileMobile props={{showSettings, setShowSettings}} />
          </div>
        )}
        <ul className="Socials">
          <li>
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5586981088012"
            >
              <Image src={Whatsapp} width={35} alt="Link para Whatsapp"/>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://instagram.com/lokinhoskins">
              <Image src={Instagram} width={40} alt="Link para Instagram"/>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
