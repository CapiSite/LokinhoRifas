import { StaticImageData } from "next/image";

export default interface UserContextType {
    userInfo: {
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean
    };
    setUserInfo: React.Dispatch<React.SetStateAction<{
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean;

    }>>;
  }