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

export type UserData = {
    tradeLink: string;
    phoneNumber: string;
    oldPassword: string;
    newPassword: string;
    picture: File | null;
}

export type ServicesCardType = {
  ImageSVG:string;
  ImageAlt:string;
  CardTitle:string;
  CardContent:string;
}

export type CardItemType = {
  color: string;
  profilePicture: string;
  personName: string;
  nickName: string;
}

export type RewardItemType = {
  type: string;
  itemImageUrl: string;
  itemImageAlt: string;
  itemName: string;
  itemType: string;
  itemValue: string;
}

export type LastEarnedPrizeType = {
  TimeOfEarning: string;
  ChanceOfEarning: string;
  PoolType: string;
  ItemName: string;
  ItemType: string;
  ItemValue: string;
}