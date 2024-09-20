import { useEffect } from "react";
import style from "../roletta.module.css";
import RouletteItem from "./RouletteItem";
import { RouletteContext } from "utils/interfaces";
import { useRouletteContext } from "contexts/RouletteContext";
import { v4 as uuidv4 } from 'uuid';


const RouletteArray = () => {
  const {
    raffle,
    winners = [],
    fillerParticipants = [],
    getWinner,
    setIsButtonActive,
    rouletteLoadingState = false,
  } = useRouletteContext() as RouletteContext;
  
  useEffect(() => {
    if(rouletteLoadingState == false) return
    setTimeout(() => {
      const winner = document.getElementById('winner')

      if(!winner) return
  
      getWinner(winner)
      setIsButtonActive(true)
    }, 400);
  }, [raffle ? raffle.id : raffle, winners.length, rouletteLoadingState]);
  

  return (
    <div className={style.RouletteArray} id="Roulette">
      {(rouletteLoadingState && fillerParticipants) && fillerParticipants.map((item) => (
        <RouletteItem key={uuidv4()} props={{
          ...item,
          nickName: item.user.name + '#' + item.number,
          profilePicture: item.user.picture,
          personName: item.user.name,
          isWinner: false,
          number: item.number
        }} />
      ))}
      {(rouletteLoadingState && winners) &&
        winners.map((item) => (
          <RouletteItem key={uuidv4()} props={{
            ...item,
            nickName: item.user.name + '#' + item.number,
            profilePicture: item.user.picture,
            personName: item.user.name,
            isWinner: item.isWinner ? item.isWinner : false,
            number: item.number
          }} />
        ))}
      {(rouletteLoadingState && fillerParticipants) && fillerParticipants.map((item) => (
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
