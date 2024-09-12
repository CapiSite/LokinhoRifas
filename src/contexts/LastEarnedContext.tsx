import axios from "axios";
import RaffleCard from "components/RaffleCard";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LastEarnedPrizeType, LastEarnedWinnerType, playerRank } from "utils/interfaces";

const LastEarnedContext = createContext({});

export const useLastEarnedState = () => {
  return useContext(LastEarnedContext);
};

export const LastEarnedContextProvider = ({ children }: { children: ReactNode; }) => {
  //! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
  const items: LastEarnedPrizeType[] = [
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
    {
      itemImageUrl: "",
      TimeOfEarning: "21 horas",
      unformattedTime: "21 horas",
      raffleName: "unamed raffle",
      ChanceOfEarning: "25%",
      PoolType: "Silver",
      ItemName: "Nome da Skin",
      ItemType: "Tipo da Skin",
      ItemValue: "1,000",
      WinnerID: 1,
      WinnerName: "Alison Sousa",
      WinnerPicture: "",
    },
  ];

  const [lastEarnedList, setLastEarnedList] = useState<LastEarnedPrizeType[]>(items);

  const [ playerRank, setPlayerRank ] = useState<playerRank[]>([])

  const NewAdditions = (latestWinner: LastEarnedPrizeType) => {
    const tempArray = [latestWinner]

    setLastEarnedList(tempArray.concat(lastEarnedList))
  }

  const setNewLastEarnedList = (dataArray: LastEarnedWinnerType[]) => {
    if (!dataArray) return;

    const tempArray: LastEarnedPrizeType[] = [];

    const filterPendingRaffles = dataArray.filter(item => item.raffle.is_active != 'Em espera')
    
    filterPendingRaffles.map((item: LastEarnedWinnerType) => {
      const { updatedAt, skinsWithWinners, name } = item.raffle;

      // * alterar imagem do item

      const date = new Date(updatedAt);

      const earnedDateHours = Math.floor(
        Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60)
      );
      const earnedDateDays = Math.floor(
        Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60 * 24)
      );

      let time = "";

      if (earnedDateHours < 1)
        time = `Alguns minutos atrás`;
      else if (earnedDateDays < 24) 
        time = `${earnedDateHours} hora${earnedDateHours == 1 ? "" : "s"}`;
      else if (earnedDateDays)
        time = `${earnedDateDays} dia${earnedDateDays == 1 ? "" : "s"}`;

      skinsWithWinners.map(win => {
        const { skin, winner, chance } = win

        const newItem = {
          itemImageUrl: `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${skin.skinPicture}`,
          TimeOfEarning: time,
          unformattedTime: updatedAt,
          raffleName: name,
          ChanceOfEarning: chance,
          PoolType: skin.skinValue >= 1000 ? "Gold" : "Silver",
          ItemName: skin.skinName,
          ItemType: skin.skinType,
          ItemValue: String(skin.skinValue),
          WinnerID: winner.id,
          WinnerName: winner.name,
          WinnerPicture: winner.picture,
        };
  
        tempArray.push(newItem);

      })

    });

    setLastEarnedList(tempArray);
  };

  // * Sanitize Rank
  const sanitizeLatestWinners = (rankArray: any[]) => {
    const finalArray: playerRank[] = []

    rankArray.map(item => {
        finalArray.push({
          name: item.user.name, 
          profilePicture: `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${item.user.picture}`, 
          winCount: item.totalWins, 
          participations: item.participations
        })
    })

    setPlayerRank(finalArray)
  }
  // * Sanitize Rank

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_REACT_NEXT_APP +
          `/users/winners?page=${1}&itemsPerPage=${50}`
      )
      .then((res: any) => {
        setNewLastEarnedList(res.data);
      })
      .catch((err: any) => console.error(err));
    
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/users/rank?page=${1}&itemsPerPage=${50}`).then(res => sanitizeLatestWinners(res.data))
    .catch(err => console.log(err))
  }, []);

  const value = {
    lastEarnedList,
    NewAdditions,
    playerRank
  };

  // ! PARA DEBUGGING
  // useEffect(() => {
  //   console.log('Debugging LastEarnedState: ', participants)
  // })
  // ! PARA DEBUGGING

  return (
    <LastEarnedContext.Provider value={value}>
      {children}
    </LastEarnedContext.Provider>
  );
};
