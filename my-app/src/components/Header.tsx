import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../images/Logo.png";
import Xmark from "../assets/xmark.svg";
import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "../utils/interfaces";
import HeaderProfile from "./HeaderProfile";

const Header = () => {
  const { userInfo, showSidebar, toggleSidebar } = useUserStateContext() as UserContextType

  const router = useRouter();

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
