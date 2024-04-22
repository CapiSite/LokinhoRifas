import { UserContext } from "@/utils/contextUser";
import UserContextType from "@/utils/interfaces";
import axios from "axios";
import { useContext, useEffect } from "react";

export default function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/auth/twitch`, { code });
        localStorage.setItem('token', res.data.sessionToken);
        setUserInfo({ ...userInfo, id: res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.sessionToken })
        console.log({ ...userInfo, id: res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.sessionToken })
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, []);
  return (
    <>
    <div>Home</div>
    </>
  );
}