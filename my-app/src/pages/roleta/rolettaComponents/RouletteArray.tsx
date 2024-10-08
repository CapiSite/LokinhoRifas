import { useEffect } from "react";
import style from "../roletta.module.css";
import RouletteItem from "./RouletteItem";
import { RouletteContext } from "utils/interfaces";
import { useRouletteContext } from "contexts/RouletteContext";
import { v4 as uuidv4 } from 'uuid';


const RouletteArray = () => {
  const {
    raffle = {
      createdAt: '',
      free: false,
      id: 0,
      is_active: true,
      name: '',
      participants: [],
      raffleSkins: [],
      updatedAt: '',
      users_quantity: 0,
      value: 0
    },
    winners = [],
    fillerParticipants = [],
    getWinner,
    setIsButtonActive,
    rouletteLoadingState = false,
    winnerProperties,
    distanceFromCenter
  } = useRouletteContext() as RouletteContext;
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if(rouletteLoadingState == false) return
      setIsButtonActive(true)
    }, 400);

    return () => clearTimeout(debounce)
  }, [winners.length, rouletteLoadingState, distanceFromCenter]);

  return (
    <div className={style.RouletteArray} id="Roulette">
      {(fillerParticipants && rouletteLoadingState) && fillerParticipants.map((item) => (
        <RouletteItem key={uuidv4()} props={{
          ...item,
          nickName: item.user.name + '#' + item.number,
          profilePicture: item.user.picture,
          personName: item.user.name,
          isWinner: false,
          number: item.number
        }} />
      ))}
      {(winners && rouletteLoadingState) &&
        winners.map((item, index) => (
          <RouletteItem key={uuidv4()} props={{
            ...item,
            nickName: item.user.name + '#' + item.number,
            profilePicture: item.user.picture,
            personName: item.user.name,
            isWinner: item.isWinner ? item.isWinner : false,
            number: item.number,
            distanceFromCenter: item.distanceFromCenter,
            // debugWinners: true,
          }} />
        ))}
      {(fillerParticipants && rouletteLoadingState) && fillerParticipants.map((item) => (
          <RouletteItem key={uuidv4()} props={{
            ...item,
            nickName: item.user.name + '#' + item.number,
            profilePicture: item.user.picture,
            personName: item.user.name,
            isWinner: false,
            number: item.number
          }} />
        ))}
    </div>
  );
};

export default RouletteArray;
