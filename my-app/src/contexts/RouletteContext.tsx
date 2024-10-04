import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ImageCache,
  LastEarnedContextType,
  Raffle,
  raffleItem,
  RaffleParticipant,
  RaffleReward,
  RaffleSkin,
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
  const [ timing, setTiming ] = useState<number>(30000) // default: 30000
  const [participants, setParticipants] = useState<RaffleParticipant[]>([]);
  const [winners, setWinners] = useState<RaffleParticipant[]>([])
  const [fillerParticipants, setFillerParticipants] = useState<RaffleParticipant[]>(
    []
  );
  const [winnerProperties, setWinnerProperties] = useState<RaffleParticipant>({
    number: 0,
    id: 0,
    user: {
        participantid: 0,
        id: 0,
        name: '',
        picture: '',
    }
  });
  const [ alreadyRequestedImgs, setAlreadyRequestedImgs ] = useState<ImageCache>([])
  const [ rouletteLoadingState, setRouletteLoadingState ] = useState<boolean>(false)
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


  const debuggingFormatDate = () => {
    const date = new Date(Date.now());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
};

  const loadFillerCards = (newParticipantsArray: RaffleParticipant[]) => {
    const winnerlessCards = newParticipantsArray.map((item) => ({
      ...item,
      isWinner: false,
    }));

    let tempArray: RaffleParticipant[] = [];

    if (winnerlessCards.length != Infinity && winnerlessCards.length > 0) {
      while (tempArray.length < 300) {
        tempArray = tempArray.concat(winnerlessCards);
      }
    }

    const tempShuffledArray: RaffleParticipant[] = tempArray

    tempShuffledArray.splice(300 - Math.round(newParticipantsArray.length / 2), 10000)

    setFillerParticipants(tempShuffledArray);
  };

  const playAnimation = () => {
    if (!winnerProperties) return;
    if (!winnerProperties.distanceFromCenter) return;

    const roulette = document.getElementById("Roulette");

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
    if(!raffle.participants) return
    if(raffle.participants.length == 0) return

    toggleIsButtonActive();
    
    setTimeout(() => {
      toggleWinnerPopupVisibility();
      setIsConfettiActive(true)

      setTimeout(() => {
        toggleIsButtonActive();
      }, 5000);
    }, timing);

    const interval = setInterval(() => {
      setWinnerProperties(raffle.participants[Math.floor(Math.random() * (raffle.participants.length - 1))])
    }, 100);

    setTimeout(() => {
      clearInterval(interval)

      const interval2 = setInterval(() => {
        setWinnerProperties(raffle.participants[Math.floor(Math.random() * (raffle.participants.length - 1))])
      }, 200);
      
      setTimeout(() => {
        clearInterval(interval2)

        const interval3 = setInterval(() => {
          setWinnerProperties(raffle.participants[Math.floor(Math.random() * (raffle.participants.length - 1))])
        }, 400);
        
        setTimeout(() => {
          clearInterval(interval3)

          const interval4 = setInterval(() => {
            setWinnerProperties(raffle.participants[Math.floor(Math.random() * (raffle.participants.length - 1))])
          }, 800);

          setTimeout(() => {
            clearInterval(interval4)
            setWinnerProperties(winners[Math.floor(Math.random() * (winners.length - 1))])
          }, timing / 6);
        }, timing / 6);
      }, timing / 3);
    }, timing / 3);
  }

  const manageWinner = () => {
    setIsMockWin(false);

    raffle.participants.length >= 100 ? handleRolling() : setAnimationState(playAnimation());
  };

  const manageMockWinner = () => {
    setIsMockWin(true);

    raffle.participants.length >= 100 ? handleRolling() : setAnimationState(playAnimation());
  };

  const manageCloseResult = () => {
    toggleWinnerPopupVisibility();
    setIsConfettiActive(false)

    if (raffle.participants.length < 100) animationState?.cancel()

    if (isMockWin) {
      setNewWinnersQuickly(winners)
      return
    }

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

  const checkImagesInParticipants = async () => {
    const participants = raffle.participants;

    // Extract and transform users
    const newUsers = participants.map(p => ({
      ...p.user,
      picture: p.user.picture.includes('static-cdn') ? p.user.picture :`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${p.user.picture}`,
      participantId: p.id
    }));

    // Process images and update users
    const updatedUsers = await Promise.all(
      newUsers.map(async (user) => {
        const cachedImage = alreadyRequestedImgs.find(item => item.url === user.picture);

        if (cachedImage) {
          return { ...user, picture: cachedImage.success ? user.picture : 'default' };
        }

        try {
          const response = await fetch(user.picture, { method: 'HEAD' });

          if (response.ok) {
            setAlreadyRequestedImgs(prev => {
              const alreadyExists = prev.some(item => item.url === user.picture);
              if (!alreadyExists) {
                return [...prev, { url: user.picture, success: true }];
              }
              return prev;
            });
            return { ...user, picture: user.picture };
          } else {
            setAlreadyRequestedImgs(prev => {
              const alreadyExists = prev.some(item => item.url === user.picture);
              if (!alreadyExists) {
                return [...prev, { url: user.picture, success: false }];
              }
              return prev;
            });
            return { ...user, picture: 'default' };
          }
        } catch (error) {
          setAlreadyRequestedImgs(prev => {
            const alreadyExists = prev.some(item => item.url === user.picture);
            if (!alreadyExists) {
              return [...prev, { url: user.picture, success: false }];
            }
            return prev;
          });
          return { ...user, picture: 'default' };
        }
      })
    );

    // Rebuild full participant objects with updated user data
    const rebuiltParticipants = participants.map(participant => {
      const updatedUser = updatedUsers.find(user => user.participantId === participant.id);
      return {
        ...participant,
        user: updatedUser || participant.user // Fallback to original if no update found
      };
    });

    // Ensure this state updater function matches the expected type
    setParticipants(rebuiltParticipants); // Use the resolved array here

    setNewWinners(rebuiltParticipants)
  };
  // ? Functions

  // * Setting new winner
  const addLatestWinnerToTable = async () => {
    if (!raffle.participants) return;
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
      ChanceOfEarning: ((1 / raffle.participants.length) * 100).toFixed(2) + "%",
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

    const updatedParticipants = winners.filter(
      (item) => item.number != winnerProperties.number
    );

    setNewWinners(updatedParticipants)

    setRewards(rewards.filter((reward) => reward != rewards[0]));
  };
  // * Setting new winner

  // * Sanitize Participants
  const setNewWinners = (newParticipantsArray: RaffleParticipant[]) => {
    // console.count('arrived in setNewWinners')
    if (!newParticipantsArray) return;
    if (newParticipantsArray.length == 0) return;
    // console.log('passed verification in setNewWinners')

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

    loadFillerCards(possibleWinners)

    setWinnerProperties(possibleWinners[random]);
  };
  const setNewWinnersQuickly = (newParticipantsArray: RaffleParticipant[]) => {
    // console.count('arrived in setNewWinners')
    if (!newParticipantsArray) return;
    if (newParticipantsArray.length == 0) return;
    // console.log('passed verification in setNewWinners')

    const newWinners = newParticipantsArray.map(participant => ({...participant, isWinner: false}))

    const oldWinnersId = raffle.raffleSkins.filter(item => item.winner_id).map(item => '#' + item.winner_id)
    const possibleWinners = newWinners.filter(item => !(oldWinnersId.join().includes('#' + item.id)))

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
          //! Alterar para apenas id?
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

    if(!winnerStats) return

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
        users_quantity,
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
    setRouletteLoadingState(false);

    // console.count('Raffle variable')
    // console.log('altered at ' + debuggingFormatDate())
    
    const debounce = setTimeout(() => {
      checkImagesInParticipants()

      setNewRewards(raffle.raffleSkins);
      filterPurchasableRaffles();

      setTimeout(() => {
        setRouletteLoadingState(true);
      }, 200);
    }, 200);

    return () => clearTimeout(debounce)
  }, [raffle ? raffle.id : raffle]);

  // useEffect(() => {
  //   console.count('winnerProperties variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [winnerProperties])

  // useEffect(() => {
  //   console.count('isButtonActive variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [isButtonActive])

  // useEffect(() => {
  //   console.count('winners variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [winners.length])

  // useEffect(() => {
  //   console.count('participants variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [participants.length])

  // useEffect(() => {
  //   console.count('rouletteLoadingState variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [rouletteLoadingState])

  // useEffect(() => {
  //   console.count('winnerPopupVisible variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [winnerPopupVisible])

  // useEffect(() => {
  //   console.count('isConfettiActive variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [isConfettiActive])

  // useEffect(() => {
  //   console.count('isMockWin variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [isMockWin])

  // useEffect(() => {
  //   console.count('animationState variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [animationState])

  // useEffect(() => {
  //   console.count('rewards variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [rewards.length])

  // useEffect(() => {
  //   console.count('alreadyRequestedImgs variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [alreadyRequestedImgs.length])

  // useEffect(() => {
  //   console.count('fillerParticipants variable')
  //   console.log('altered at ' + debuggingFormatDate())
  // }, [fillerParticipants.length])

  // useEffect(() => {
  //   console.count('purchasableRaffles variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [purchasableRaffles.length])

  // useEffect(() => {
  //   console.count('availableRaffles variable')
  // console.log('altered at ' + debuggingFormatDate())
  // }, [availableRaffles.length])

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
    participants,
    rewards,
    alreadyRequestedImgs,
    rouletteLoadingState,
    setRouletteLoadingState,
    setAlreadyRequestedImgs,
    setIsButtonActive,
    toggleSelection,
    handleChangeQuantity,
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
