import Image from "next/image";
import { useRouter } from "next/router";
import { useSidebarState } from "../contexts/SidebarContext";
import logo from "../images/Logo.png";
import Xmark from "../assets/xmark.svg";
import { useEffect } from "react";
import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "../utils/interfaces";
import HeaderProfile from "./HeaderProfile";
import axios from "axios";
import Budget from "./Budget";
import { RouletteProvider } from "contexts/RouletteContext";
import PaymentBrick from "./PaymentSteps";
import Settings from "./Settings";
import defaultProfilePicture from '../assets/defaultProfilePic.svg'

const Header = () => {
  const { sidebarView, toggleSidebar }: any = useSidebarState();
  const { userInfo, setUserInfo, showBudget, showPayment, setShowPayment, showSettings, setShowSettings, image, setImage } = useUserStateContext() as UserContextType

  const { name, email, picture, tradeLink, phoneNumber, saldo } = userInfo

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.toggle("scrollOff", showBudget);
  }, [showBudget]);

  const profile = {
    name: name != '' ? name : 'notloggedinuser',
    email: email != '' ? email : 'notloggedinuser@gmail.com',
    tradeLink: tradeLink != '' ? tradeLink : 'Sem Trade Link',
    phoneNumber: phoneNumber != '' ? phoneNumber : 'Sem número cadastrado',
    picture: picture === "default" ? defaultProfilePicture :
    (picture && picture.startsWith('https://static-cdn.jtvnw.net')) ? 
    picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`,
  }

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
  }, [sidebarView]);
  // * O código acima adiciona e retira scroll da página quando a Sidebar está visível

  return (
    <header className={sidebarView ? "no-background" : ""}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <div
            className={sidebarView ? "LogoBox SidebarOn" : "LogoBox"}
            onClick={() => router.push("/")}
          >
            <Image width={50} quality={100} className="Logo" src={logo} alt="Logo de Lokinho Rifas" />
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
          {sidebarView ? <Image width={50} src={Xmark} alt="Fechar sidebar" /> : "|||"}
        </button>
      </div>
      {showBudget && <Budget />}
      {showPayment && <RouletteProvider>
        <PaymentBrick props={{setShowPayment}}/>
      </RouletteProvider>}
      {showSettings && <Settings props={{profile, showSettings, setShowSettings, image, setImage}}/>}
    </header>
  );
};

export default Header;
