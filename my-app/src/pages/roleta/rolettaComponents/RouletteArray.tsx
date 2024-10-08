import { useEffect } from "react";
import style from "../roletta.module.css";
import RouletteItem from "./RouletteItem";
import { RouletteContext } from "utils/interfaces";
import { useRouletteContext } from "contexts/RouletteContext";
import { v4 as uuidv4 } from 'uuid';
import React from "react";

const RouletteArray = React.memo(() => {  // Aplicando React.memo no componente
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
    setIsButtonActive,
    rouletteLoadingState = false,
    winnerProperties,
    getWinner,
  } = useRouletteContext() as RouletteContext;
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (rouletteLoadingState === false) return;
      const winner = document.getElementById('winner');
      
      if (!winner) return;
  
      getWinner(winner);
      setIsButtonActive(true);
    }, 400);

    return () => clearTimeout(debounce);
  }, [winners.length, rouletteLoadingState, winnerProperties?.id, setIsButtonActive, getWinner]);

  return (
    <div className={style.RouletteArray} id="Roulette">
      {(fillerParticipants && rouletteLoadingState) && fillerParticipants.map((item, index) => (
        <RouletteItem key={`${item.id}-${index}`} props={{
          ...item,
          nickName: item.user.name + '#' + item.number,
          profilePicture: item.user.picture || '',
          personName: item.user.name,
          isWinner: false,
          number: item.number
        }} />
      ))}
      {(winners && rouletteLoadingState) && winners.map((item, index) => (
        <RouletteItem key={`${item.id}-${index}`} props={{
          ...item,
          nickName: item.user.name + '#' + item.number,
          profilePicture: item.user.picture,
          personName: item.user.name,
          isWinner: item.isWinner ? item.isWinner : false,
          number: item.number,
          distanceFromCenter: item.distanceFromCenter,
          debugWinners: true,
        }} />
      ))}
      {(fillerParticipants && rouletteLoadingState) && fillerParticipants.map((item, index) => (
        <RouletteItem key={`${item.id}-${index}`} props={{
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
}, (prevProps:any, nextProps:any) => {
  // Custom comparator para evitar re-renderizações desnecessárias
  return (
    prevProps.winners === nextProps.winners &&
    prevProps.fillerParticipants === nextProps.fillerParticipants &&
    prevProps.rouletteLoadingState === nextProps.rouletteLoadingState &&
    prevProps.winnerProperties?.id === nextProps.winnerProperties?.id
  );
});

export default RouletteArray;
