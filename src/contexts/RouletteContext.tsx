import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LastEarnedContextType,
  Participant,
  Raffle,
  raffleItem,
  RaffleParticipant,
  RaffleReward,
  RaffleSkin,
  WinnerProperties,
} from "utils/interfaces";
import { useLastEarnedState } from "./LastEarnedContext";

export const RouletteStateContext = createContext({});

export const useRouletteContext = () => {
  return useContext(RouletteStateContext);
};

export const RouletteProvider = ({ children }: { children: ReactNode }) => {
  // ? Init variables
  const [availableRaffles, setAvailableRaffles] = useState<Raffle[]>([]);
  const [purchasableRaffles, setPurchasableRaffles] = useState<raffleItem[]>(
    []
  );
  const [raffle, setRaffle] = useState<Raffle>({
    createdAt: "",
    free: false,
    id: 0,
    is_active: "",
    name: "",
    participants: [],
    raffleSkins: [],
    updatedAt: "",
    users_quantity: 0,
    value: 0,
  });

  const { NewAdditions } = useLastEarnedState() as LastEarnedContextType;
  // ? Init variables

  // ? Necessary variables
  const [participants, setParticipants] = useState<RaffleParticipant[]>([]);
  const [winners, setWinners] = useState<RaffleParticipant[]>([])
  const [fillerParticipants, setFillerParticipants] = useState<RaffleParticipant[]>(
    []
  );
  const [winnerProperties, setWinnerProperties] = useState<RaffleParticipant>({
    number: 0,
    id: 0,
    user: {
        id: 0,
        name: '',
        picture: '',
    }
  });
  // TODO! Setar algum canto para as propriedades serem atualizadas
  const [rewards, setRewards] = useState<RaffleReward[]>([]);

  const [animationState, setAnimationState] = useState<Animation>();
  const [isMockWin, setIsMockWin] = useState<boolean>(false);
  // ? Necessary variables

  // ? Component variables
  const [winnerPopupVisible, setWinnerPopupVisible] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);
  const [isConfettiActive, setIsConfettiActive] = useState<boolean>(false);
  // ? Component variables

  // ? Functions
  const toggleIsButtonActive = () => setIsButtonActive((oldValue) => !oldValue);
  const toggleWinnerPopupVisibility = () => setWinnerPopupVisible((oldValue) => !oldValue);

  const loadFillerCards = () => {
    const winnerlessCards = raffle.participants.map((item) => ({
      ...item,
      isWinner: false,
    }));

    let tempArray: RaffleParticipant[] = [];

    if (winnerlessCards.length != Infinity && winnerlessCards.length > 0) {
      while (tempArray.length < 300) {
        tempArray = tempArray.concat(winnerlessCards);
      }
    }

    tempArray.splice(300, 10000)

    setFillerParticipants(tempArray);
  };

  const playAnimation = () => {
    if (!winnerProperties) return;
    if (!winnerProperties.distanceFromCenter) return;

    const roulette = document.getElementById("Roulette");

    const timing = 30000;

    const randomSide = Math.floor(Math.random() * 2) == 1 ? -1 : 1;

    toggleIsButtonActive();
    
    setTimeout(() => {
      toggleWinnerPopupVisibility();
      setIsConfettiActive(true)

      setTimeout(() => {
        toggleIsButtonActive();
      }, 5000);
    }, timing);

    if (randomSide == -1) {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 105);

      const spinAnimation = new Animation(
        new KeyframeEffect(
          roulette,
          [
            { transform: `translateX(0px)`, offset: 0 },
            { transform: `translateX(80px)`, offset: 0.009 },
            {
              transform: `translateX(-${
                winnerProperties.distanceFromCenter + random
              }px)`,
              offset: 1,
            },
          ],
          {
            duration: timing,
            easing: "cubic-bezier(.04,.81,.48,1)",
            fill: "forwards",
          }
        ),
        document.timeline
      );

      // * Função que roda a animação
      spinAnimation.play();

      return spinAnimation;
    } else {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 110);

      const spinAnimation = new Animation(
        new KeyframeEffect(
          roulette,
          [
            { transform: `translateX(0px)`, offset: 0 },
            { transform: `translateX(80px)`, offset: 0.009 },
            {
              transform: `translateX(-${
                winnerProperties.distanceFromCenter - random
              }px)`,
              offset: 1,
            },
          ],
          {
            duration: timing,
            easing: "cubic-bezier(.04,.81,.48,1)",
            fill: "forwards",
          }
        ),
        document.timeline
      );

      // * Função que roda a animação
      spinAnimation.play();

      return spinAnimation;
    }
  };
  
  const handleRolling = () => {
    if(!participants) return
    if(participants.length == 0) return
    
    const timer = 30000

    toggleIsButtonActive();
    
    setTimeout(() => {
      toggleWinnerPopupVisibility();
      setIsConfettiActive(true)

      setTimeout(() => {
        toggleIsButtonActive();
      }, 5000);
    }, timer);

    const interval = setInterval(() => {
      setWinnerProperties(participants[Math.floor(Math.random() * (participants.length - 1))])
    }, 100);

    setTimeout(() => {
      clearInterval(interval)

      const interval2 = setInterval(() => {
        setWinnerProperties(participants[Math.floor(Math.random() * (participants.length - 1))])
      }, 200);
      
      setTimeout(() => {
        clearInterval(interval2)

        const interval3 = setInterval(() => {
          setWinnerProperties(participants[Math.floor(Math.random() * (participants.length - 1))])
        }, 400);
        
        setTimeout(() => {
          clearInterval(interval3)

          const interval4 = setInterval(() => {
            setWinnerProperties(participants[Math.floor(Math.random() * (participants.length - 1))])
          }, 800);

          setTimeout(() => {
            clearInterval(interval4)
            setWinnerProperties(winners[Math.floor(Math.random() * (winners.length - 1))])
          }, timer / 6);
        }, timer / 6);
      }, timer / 3);
    }, timer / 3);
  }

  const manageWinner = () => {
    setIsMockWin(false);

    participants.length >= 100 ? handleRolling() : setAnimationState(playAnimation());
  };

  const manageMockWinner = () => {

    setIsMockWin(true);

    participants.length >= 100 ? handleRolling() : setAnimationState(playAnimation());
  };

  const manageCloseResult = () => {
    toggleWinnerPopupVisibility();
    setIsConfettiActive(false)

    if (isMockWin) return;

    if (participants.length < 100) animationState?.cancel()

    addLatestWinnerToTable();
  };

  const selectRaffle = (id: number) => {
    if (!availableRaffles.filter((raffle) => raffle.id == id)[0]) return;

    setRaffle(availableRaffles.filter((raffle) => raffle.id == id)[0]);
  };

  const toggleSelection = (id: number) => {
    const newRaffles = purchasableRaffles.map((raffle) => {
      if (raffle.id == id) return { ...raffle, isSelected: !raffle.isSelected };
      return raffle;
    });

    setPurchasableRaffles(newRaffles);
  };

  const handleChangeQuantity = (id: number, newQuantity: number) => {
    const newRaffles = purchasableRaffles.map((raffle) => {
      if (raffle.id == id) return { ...raffle, quantity: newQuantity };
      return raffle;
    });

    setPurchasableRaffles(newRaffles);
  };
  // ? Functions

  // * Setting new winner
  const addLatestWinnerToTable = async () => {
    if (!participants) return;
    if (!winnerProperties) return;
    if (!raffle) return;

    const participantWinner = winners.filter(
      (item) => item.number == winnerProperties.number
    )[0];

    const date = Date.now();

    const earnedDateHours = Math.floor(
      Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60)
    );
    const earnedDateDays = Math.floor(
      Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60 * 24)
    );

    let time = "";

    if (earnedDateHours < 1) time = `Alguns minutos atrás`;
    else if (earnedDateDays < 24)
      time = `${earnedDateHours} hora${earnedDateHours == 1 ? "" : "s"}`;
    else if (earnedDateDays)
      time = `${earnedDateDays} dia${earnedDateDays == 1 ? "" : "s"}`;

    NewAdditions({
      itemImageUrl: rewards[0].itemImageUrl,
      TimeOfEarning: time,
      unformattedTime: date.toString(),
      ChanceOfEarning: ((1 / participants.length) * 100).toFixed(2) + "%",
      PoolType: rewards[0].type,
      ItemName: rewards[0].itemName,
      ItemType: rewards[0].itemType,
      ItemValue: rewards[0].itemValue,
      WinnerID: participantWinner.id,
      raffleName: raffle.name,
      WinnerName: participantWinner.user.name,
      WinnerPicture: participantWinner.user.picture,
    });

    const token = localStorage.getItem("token");

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/winners`,
          {
            id: participantWinner.id,
            number: participantWinner.number,
            raffle_id: raffle.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => removeWinnerAndRaffleFromRoulette());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const removeWinnerAndRaffleFromRoulette = () => {
    if (!winners) return;
    if (!winnerProperties) return;
    if (!rewards) return;

    setWinners((oldParticipants) => {
      const updatedParticipants = oldParticipants.filter(
        (item) => item.number != winnerProperties.number
      );

      setNewWinners(updatedParticipants)
      
      return updatedParticipants;
    });
    setRewards(rewards.filter((reward) => reward != rewards[0]));
  };
  // * Setting new winner

  // * Sanitize Participants
  const setNewWinners = (newParticipantsArray: RaffleParticipant[]) => {
    if (!newParticipantsArray) return;
    if (newParticipantsArray.length == 0) return;

    const oldWinnersId = raffle.raffleSkins.filter(item => item.winner_id).map(item => '#' + item.winner_id)
    const possibleWinners = newParticipantsArray.filter(item => !(oldWinnersId.join().includes('#' + item.id)))

    const random = Math.floor(Math.random() * (possibleWinners.length - 1))

    possibleWinners[random] = {
      id: possibleWinners[random].id,
      number: possibleWinners[random].number,
      isWinner: true,
      user: possibleWinners[random].user
    }

    setWinners(possibleWinners);
    setWinnerProperties(possibleWinners[random]);
  };
  // * Sanitize Participants

  // * Sanitize Rewards
  const setNewRewards = (newRewardsArray: RaffleSkin[]) => {
    if (!newRewardsArray) return;

    const tempArray: RaffleReward[] = [];

    newRewardsArray.map((item: RaffleSkin) => {
      if (item.winner_id === null) {
        const newItem = {
          id: item.skin_id,
          type: item.skinValue >= 1000 ? "Gold" : "Silver",
          itemImageUrl: `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${item.skinPicture}`,
          itemName: item.skinName,
          itemType: item.skinType,
          itemValue: String(item.skinValue),
        };
        tempArray.push(newItem);
      }
    });

    // ! Comentar o código abaixo para ter mais de 4 prêmios, opção para DEBUGGING
    // tempArray.splice(4, 1000)

    setRewards(tempArray);
  };

  const getWinner = (winnerParam: HTMLElement) => {
    if (!winnerParam) return;

    const winnerStats = winners.filter(
      (winnerArray) => winnerArray.number == Number(winnerParam.dataset.number)
    )[0];

    if(!winnerStats) throw new Error('Participante não encontrado')

    const winnerCardCenter =
      (Math.round(winnerParam.getBoundingClientRect().right) -
        Math.round(winnerParam.getBoundingClientRect().left)) /
        2 +
      Math.round(winnerParam.getBoundingClientRect().left) -
      window.innerWidth / 2;

    const centerOfCard =
      winnerCardCenter < 0 ? winnerCardCenter * -1 : winnerCardCenter;

    setWinnerProperties({
      ...winnerStats,
      distanceFromCenter: centerOfCard,
    });
  };
  // * Sanitize Rewards

  // * Available for purchase raffles
  const handleBigNames = (raffles: raffleItem[]) => {
    let tempNamesArray: string[] = [];

    let itemsTempArray: { name: string; quantity: number }[] = [];

    const newRaffleData = raffles.map((raffle) => {
      tempNamesArray = [];
      itemsTempArray = [];

      raffle.skins.map((raffle) => {
        if (tempNamesArray.join("").includes(raffle)) {
          itemsTempArray.filter((item) => item.name == raffle)[0].quantity++;
        } else {
          tempNamesArray.push(raffle);
          itemsTempArray.push({ name: raffle, quantity: 1 });
        }
      });

      const finalArray: string[] = [];

      itemsTempArray.map((item) =>
        finalArray.push(
          `${item.quantity > 1 ? item.quantity + "x " : ""}${item.name}${
            item.quantity > 1 ? "'s" : ""
          }`
        )
      );

      return { ...raffle, skins: finalArray };
    });

    return newRaffleData;
  };
  const filterPurchasableRaffles = () => {
    if (availableRaffles.length == 0) return;

    const tempArray: raffleItem[] = [];

    const options = availableRaffles.filter(
      (raffle) =>
        raffle.free == false &&
        raffle.participants.length != raffle.users_quantity
    );

    options.map((raffle) => {
      const { id, raffleSkins, name, value, users_quantity, participants } =
        raffle;

      const skins: string[] = raffleSkins.map((skin) => skin.skinName);

      const bundleValue: number = raffleSkins.reduce(
        (sum, skin) => sum + skin.skinValue,
        0
      );
      let choosenSkinBanner;
      if (raffleSkins.length > 0) {
        choosenSkinBanner = raffleSkins.reduce((max, skin) => {
          return skin.skinValue >= max.skinValue ? skin : max;
        }).skinPicture;
      }

      const bannerSkin: string = `${
        process.env.NEXT_PUBLIC_REACT_NEXT_APP
      }/uploads/${choosenSkinBanner || "default"}`;

      const tempObject: raffleItem = {
        id,
        skins,
        name,
        value: value / users_quantity,
        quantity: 1,
        maxQuantity: users_quantity - participants.length,
        isSelected: false,
        bannerSkin,
        bundleValue,
      };
      
      tempArray.unshift(tempObject);
    });
    
    setPurchasableRaffles(handleBigNames(tempArray));
  };
  // * Available for purchase raffles
  
  // * INIT
  const getRaffleList = () => {
    // * adicionar escolha de rifas com padrão caso não haja parâmetro
    axios
      .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/raffle", {})
      .then((res) => {
        setAvailableRaffles(res.data.filter(
          (result: Raffle) => result.raffleSkins.length > 0
        ));
        setRaffle(
          res.data.filter(
            (result: Raffle) => result.raffleSkins.length > 0
          )[0]
        );
      })
      .catch((err: any) => console.error("Raffles error ", err.response));
  };

  useEffect(() => {
    getRaffleList();
  }, []);
  // * INIT

  // ? Alter participants when raffle changes
  useEffect(() => {
    if(!raffle) return
    
    setParticipants(raffle.participants);
    if(raffle.participants.length < 100) {
      loadFillerCards()
      setIsButtonActive(false)
    }

    setNewWinners(raffle.participants)
    setNewRewards(raffle.raffleSkins);
    filterPurchasableRaffles();
  }, [raffle ? raffle.id : raffle]);

  const value = {
    availableRaffles,
    purchasableRaffles,
    isConfettiActive,
    fillerParticipants,
    raffle,
    winnerPopupVisible,
    winnerProperties,
    winners,
    isButtonActive,
    isMockWin,
    // winner,
    participants,
    rewards,
    setIsButtonActive,
    toggleSelection,
    handleChangeQuantity,
    // setWinner,
    // loadFillerCards,
    manageWinner,
    manageMockWinner,
    manageCloseResult,
    selectRaffle,
    getWinner,
  };

  return (
    <RouletteStateContext.Provider value={value}>
      {children}
    </RouletteStateContext.Provider>
  );
};
