import Hero from "./homeComponents/Hero";
import Services from "./homeComponents/Services";
import ServicesDisplay from "./homeComponents/ServicesDisplay";
import ServiceRaffle from "./homeComponents/ServiceRaffle";
import History from "./homeComponents/History";
import { useEffect } from "react";
import { useUserStateContext } from "../contexts/UserContext";
import axios from "axios";
import { UserContextType } from "utils/interfaces";

const Homepage = () => {
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType;

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
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
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
              created: res.data.createdAt,
            });
          } catch (error) {
            console.log("Error:", error);
          }
        }
      })();
    }, 400);

    return () => clearTimeout(debounce);
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <ServicesDisplay />
      <ServiceRaffle />
      <History />
    </>
  );
};

export default Homepage;
