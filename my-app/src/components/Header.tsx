import Image from "next/image";
import { useRouter } from "next/router";
import { useSidebarState } from "../contexts/SidebarContext";
import logo from "../images/Logo.png";
import Xmark from "../assets/xmark.svg";
import { Dispatch, useEffect } from "react";
import { useUserStateContext } from "contexts/UserContext";
import { UserInfoType } from "../utils/interfaces";
import HeaderProfile from "./HeaderProfile";
import axios from "axios";
import Budget from "./Budget";
import { RouletteProvider } from "contexts/RouletteContext";
import PaymentBrick from "./PaymentSteps";

const Header = () => {
  const { sidebarView, toggleSidebar }: any = useSidebarState();
  const { userInfo, setUserInfo, showBudget, showPayment, setShowPayment } = useUserStateContext() as {
    userInfo: UserInfoType;
    setUserInfo: Dispatch<React.SetStateAction<UserInfoType>>;
    showBudget: boolean;
    showPayment: boolean;
    setShowPayment: Dispatch<React.SetStateAction<boolean>>;
  };

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.toggle("scrollOff", showBudget);
  }, [showBudget]);

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

  return (
    <header className={sidebarView ? "no-background" : ""}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <div
            className={sidebarView ? "LogoBox SidebarOn" : "LogoBox"}
            onClick={() => router.push("/")}
          >
            <Image className="Logo" src={logo} alt="Logo de Lokinho Rifas" />
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
          {sidebarView ? <Image src={Xmark} alt="Fechar sidebar" /> : "|||"}
        </button>
      </div>
      {showBudget && <Budget />}
      {showPayment && <RouletteProvider>
        <PaymentBrick props={{setShowPayment}}/>
      </RouletteProvider>}
    </header>
  );
};

export default Header;
