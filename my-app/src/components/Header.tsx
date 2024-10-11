import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../images/Logo.png";
import Xmark from "../assets/xmark.svg";
import { useEffect } from "react";
import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "../utils/interfaces";
import HeaderProfile from "./HeaderProfile";
import axios from "axios";

const Header = () => {
  const { userInfo, setUserInfo, showSidebar, toggleSidebar } = useUserStateContext() as UserContextType

  const router = useRouter();

  useEffect(() => {
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
              created: res.data.user.createdAt
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
              created: ''
            });
          });
      }
    }
  }, [showSidebar]);
  // * O código acima adiciona e retira scroll da página quando a Sidebar está visível

  return (
    <header className={showSidebar ? "no-background" : ""}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <div
            className={showSidebar ? "LogoBox SidebarOn" : "LogoBox"}
            onClick={() => router.push("/")}
          >
            <Image quality={100} className="Logo" src={logo} alt="Logo de Lokinho Rifas" />
          </div>
          <nav className="desktop">
            <ul>
              <li onClick={() => router.push("/#Home")}>Home</li>
              <li onClick={() => router.push("/roleta")}>Sorteio</li>
              <li onClick={() => router.push("/live")}>Live</li>
              <li onClick={() => router.push("/latestWinners")}>
                Últimos Ganhadores
              </li>
              <li onClick={() => router.push("/#SobreNos")}>Sobre Nós</li>
            </ul>
          </nav>
        </div>
        {userInfo.token == "" ? (
          <button onClick={() => router.push("/login")} className="desktop">
            Faça Parte!
          </button>
        ) : (
          <div className="desktop">
            <HeaderProfile />
          </div>
        )}
        <button onClick={() => toggleSidebar()} className="mobile tablet">
          {showSidebar ? <Image width={50} src={Xmark} alt="Fechar sidebar" /> : "|||"}
        </button>
      </div>
    </header>
  );
};

export default Header;
