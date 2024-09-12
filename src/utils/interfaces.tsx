import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch } from "react";

export interface TextContextType {
  textInfo: {
    text: string;
    id: number;
  };
  setTextInfo: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserContextType {
  userInfo: UserInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
  logOut: Function;
  showPayment: boolean;
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
  showBudget: boolean;
  setShowBudget: React.Dispatch<React.SetStateAction<boolean>>;
  lastestTransactions: LastPayment[];
  getLatestTransactions: Function;
  qrcode64: string; 
  setQrcode64: React.Dispatch<React.SetStateAction<string>>;
  valueDiff: number;
  setValueDiff: React.Dispatch<React.SetStateAction<number>>;
}

export type UserInfoType = {
  name: string;
  id: string;
  email: string;
  picture: string;
  token: string;
  isAdmin: boolean;
  phoneNumber: string;
  tradeLink: string;
  saldo: number;
};

export type InfoTable = {
  id: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  tradeLink: string;
  created: string;
};

export type UserSettingsType = {
  profile: {
    name: string;
    tradeLink: string;
    phoneNumber: string;
    email: string;
    picture: string;
    budget: string | undefined;
  };
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export type UserData = {
  tradeLink: string;
  phoneNumber: string;
  oldPassword: string;
  newPassword: string;
  picture: File | null;
};

export type ServicesCardType = {
  ImageSVG: string;
  ImageAlt: string;
  CardTitle: string;
  CardContent: string;
};

export type CardItemType = {
  profilePicture: string;
  personName: string;
  nickName: string;
  isWinner: boolean;
  number: number;
};

// export type RaffleParticipant = {
//   number: number;
//   id: number;
//   user: {
//     id: number;
//     name: string;
//     picture: string;
//   };
// };

// Sem isWinner

export type RewardItemType = {
  type: string;
  itemImageUrl: string;
  itemName: string;
  itemType: string;
  itemValue: string;
};

export type LastEarnedPrizeType = {
  itemImageUrl: string | StaticImport;
  TimeOfEarning: string;
  unformattedTime: string;
  raffleName: string;
  ChanceOfEarning: string;
  PoolType: string;
  ItemName: string;
  ItemType: string;
  ItemValue: string;
  WinnerID: number;
  WinnerName: string;
  WinnerPicture: string;
};

export type PersonInfoCard = {
  id: number;
  name: string;
  number: number;
  picture: string;
};

export type Participant = {
  id: number;
  profilePicture: string;
  personName: string;
  nickName: string;
  number: number;
  isWinner: boolean;
};

export type PersonCardContextType = {
  participants: PersonInfoCard[];
  setNewParticipants: (dataArray: Participant[]) => void;
};

export type SkinType = {
  id: number;
  name: string;
  value: number;
  type: string;
  picture: string | StaticImport;
};

export type RewardItemContextType = {
  rewards: RewardItemType[];
  setNewRewards: (dataArray: SkinType[]) => void;
};

export type LastEarnedWinnerType = {
  raffle: {
    createdAt: string,
    id: number,
    is_active: "Ativa" | "Em espera" | "Inativa",
    name: string,
    skinsWithWinners: {
      chance: string;
      skin: {
        id: number,
        skinName: string,
        skinPicture: string,
        skinType: string,
        skinValue: number
      },
      winner: {
        email: string,
        id: number,
        isAdmin: boolean,
        name: string,
        phoneNumber?: string,
        picture: string,
        saldo: number
      }
    }[],
    updatedAt: string
  };
};

export type LastEarnedContextType = {
  lastEarnedList: LastEarnedPrizeType[],
  NewAdditions: (latestWinner: LastEarnedPrizeType) => void,
  playerRank: playerRank[],
}

export type WinnerType = {
  id: number;
  email: string;
  name: string;
  phoneNumber: null | string;
  picture: string;
  tradeLink: string | null;
  isAdmin: boolean;
};

export type playerRank = {
  name: string,
  profilePicture: string,
  winCount: number,
  participations: number,
}

export type RaffleType = {
  id: number;
  value: number;
  is_active: "Ativa" | "Em espera" | "Inativa";
  skin: SkinType;
  item_chance: string;
  updatedAt: string;
};

export type RaffleInfoTable = {
  id: string;
  name: string;
  state: "Ativa" | "Em espera" | "Inativa";
  totalValue: number;
  isFree: boolean;
  unitValue: number;
  participants: number;
  maxParticipants: number;
  skins: string[];
  ocurred: string | false;
  created: string;
};

export type LastEarnFrontEndType = {
  itemImageUrl: string;
  TimeOfEarning: string;
  ChanceOfEarning: string;
  PoolType: string;
  ItemName: string;
  ItemType: string;
  ItemValue: string;
};

export interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  tradeLink: string;
  phoneNumber: string;
  name: string;
  picture: null | File | string;
}

export interface skinDataType {
  value: number;
  type: string;
  name: string;
  picture: null | File | string;
}

export interface ProfileInformationsProps {
  reloadSkins: () => void;
}

export interface RegisterRaffleProps {
  skinsCard: RegisterRifa[];
  setSkinsCard: React.Dispatch<React.SetStateAction<RegisterRifa[]>>;
}

export type raffleItem = {
  id: number;
  skins: string[];
  name: string;
  value: number;
  quantity: number;
  maxQuantity: number;
  isSelected: boolean;
  bannerSkin: string;
  bundleValue: number;
};
export interface RaffleNumberType {
  key: number;
  number: number;
  isSelected: boolean;
  isAvailable: boolean;
}
[];

//interface temporaria para os users da tela do admin
export interface UsersProps {
  id: number;
  image: string;
  name: string;
  email:string;
  tradeLink: string;
  charge: string;
  context: string;
  onChargeChange: (id: number, newCharge: string) => void;
  onDeleteUser: (id: number) => void;
  onDeleteUserRaffle:(id: number) => void;
  onAddUser: (id: number) => void;
  onnumberChange:(id: number) => void;
  number: string;
}

export interface User {
  id: number;
  image: string;
  name: string;
  tradLink: string;
  charge: string;
  email:string;
  number: string;
}

export type RegisterRifa = {
  id: number;
  name: string;
  value: number;
  picture: string;
};

export interface InterRegisterRifa {
  id: number;
  name: string;
  value: number;
  picture: string;
}

export type Raffle = {
  createdAt: string;
  free: boolean;
  id: number;
  is_active: string;
  name: string;
  participants: RaffleParticipant[];
  raffleSkins: RaffleSkin[];
  updatedAt: string;
  users_quantity: number;
  value: number;
};

export type RaffleSkin = {
  id: number;
  raffle_id: number;
  skinName: string;
  skinPicture: string;
  skinType: string;
  skinValue: number;
  skin_id: number;
  winner_id: null;
};

export type RaffleParticipant = {
  number: number;
  id: number;
  isWinner?: boolean;
  distanceFromCenter?: number;
  user: {
    id: number;
    name: string;
    picture: string;
  };
};

export type RaffleReward = RewardItemType & {
  id: number;
};

export type WinnerProperties = Participant & {
  distanceFromCenter: number;
}

export type SidebarContextType = {
  sidebarView: boolean,
  toggleSidebar: Function,
}

export type RouletteContext = {
  availableRaffles: Raffle[];
  purchasableRaffles: raffleItem[];
  isConfettiActive: boolean;
  fillerParticipants: RaffleParticipant[];
  raffle: Raffle;
  winnerPopupVisible: boolean;
  winnerProperties: RaffleParticipant;
  winners: RaffleParticipant[];
  isButtonActive: boolean;
  isMockWin: boolean;
  participants: RaffleParticipant[];
  rewards: RaffleReward[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>
  toggleSelection: (id: number) => void;
  handleChangeQuantity: (id: number, newQuantity: number) => void;
  manageWinner: Function;
  manageMockWinner: Function;
  manageCloseResult: Function;
  selectRaffle: (id: number) => void;
  getWinner: (winnerParam: HTMLElement) => void;
};

export interface LastPayment {
  id: number;
  date: string;
  status: string;
  type: 'credit' | 'debit';
  qrCodeBase64: string | null;
  exchanged: number;
  method: string;
}

export interface LastPaymentBack {
  dateApproved: string;
  dateCreated: string;
  dateLastUpdated: string;
  id: number;
  paymentMethod: string;
  qrCode: string | null;
  qrCodeBase64: string | null;
  raffle_id: number | null;
  status: string;
  status_detail: string | null;
  transactionAmount: number;
  type: 'credit' | 'debit';
  user_id: number;
}

export type rafflePayment = {
  key: number;
  name: string;
  quantity: number;
  value: number;
};

