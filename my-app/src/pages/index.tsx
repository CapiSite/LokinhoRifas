import Hero from "./homeComponents/Hero";
import Services from "./homeComponents/Services";
import ServicesDisplay from "./homeComponents/ServicesDisplay";
import ServiceRaffle from "./homeComponents/ServiceRaffle";
import PopupBuy from "components/PopupBuy";
import History from "./homeComponents/History";
import { useEffect, useState } from "react";
import { useUserStateContext } from "../contexts/UserContext";
import axios from "axios";
import { RouletteProvider } from "contexts/RouletteContext";
import PaymentBrick from "components/PaymentSteps";
import { UserContextType } from "utils/interfaces";

const Homepage = () => {
  const { userInfo, setUserInfo, showPayment, setShowPayment } = useUserStateContext() as UserContextType;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    htmlElement?.classList.toggle("scrollOff", isVisible);
  }, [isVisible]);

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
  }, [setUserInfo, userInfo.picture]);

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/auth/twitch`,
            { code }
          );
          localStorage.setItem("token", res.data.sessionToken);
          setUserInfo({
            ...userInfo,
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
            token: res.data.sessionToken,
            saldo: res.data.saldo,
          });
        } catch (error) {
          console.log("Error:", error);
        }
      }
    })();
  }, []);

  return (
    <>
      {isVisible && <RouletteProvider>
        <PopupBuy props={{ isVisible, setIsVisible, setShowPayment }} />
      </RouletteProvider>}
      <Hero props={{ isVisible, setIsVisible }} />
      <Services />
      <ServicesDisplay />
      <ServiceRaffle />
      <History />
    </>
  );
};

export default Homepage;
