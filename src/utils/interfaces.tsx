import { StaticImageData } from "next/image";

export default interface TextContextType{
  textInfo: {
    text:string,
    id:number
  };
  setTextInfo: React.Dispatch<React.SetStateAction<string>>;
}

export default interface UserContextType {
    userInfo: {
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean;
      phoneNumber: string;
      tradeLink: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<{
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean;
      phoneNumber: string;
      tradeLink: string;
    }>>;
  }

export interface UserData {
    tradeLink: string;
    phoneNumber: string;
    oldPassword: string;
    newPassword: string;
    picture: File | null;
}


