import { useEffect, useMemo } from "react";
import style from "../roletta.module.css";
import RouletteItem from "./RouletteItem";
import { RouletteContext } from "utils/interfaces";
import { useRouletteContext } from "contexts/RouletteContext";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const RouletteArray = React.memo(() => {
  const {
    raffle = {
      createdAt: "",
      free: false,
      id: 0,
      is_active: true,
      name: "",
      participants: [],
      raffleSkins: [],
      updatedAt: "",
      users_quantity: 0,
      value: 0,
    },
    winners = [],
    fillerParticipants = [],
    rouletteLoadingState = false,
    winnerProperties,
    getWinner,
    setIsButtonActive,
  } = useRouletteContext() as RouletteContext;

  // Memorizar os participantes para evitar re-renderizações
  const mappedParticipants = useMemo(() => {
    if (!fillerParticipants || !rouletteLoadingState) return [];

    return fillerParticipants.map((item, index) => (
      <RouletteItem
        key={`${item.id}-${index}`}
        props={{
          ...item,
          nickName: item.user.name + "#" + item.number,
          profilePicture: item.user.picture || "",
          personName: item.user.name,
          isWinner: false,
          number: item.number,
        }}
      />
    ));
  }, [fillerParticipants, rouletteLoadingState]);

  const mappedWinners = useMemo(() => {
    if (!winners || !rouletteLoadingState) return [];

    return winners.map((item) => (
      <RouletteItem
        key={uuidv4()}
        props={{
          ...item,
          nickName: item.user.name + "#" + item.number,
          profilePicture: item.user.picture,
          personName: item.user.name,
          isWinner: item.isWinner || false,
          number: item.number,
          distanceFromCenter: item.distanceFromCenter,
          debugWinners: true,
        }}
      />
    ));
  }, [winners, rouletteLoadingState]);

  useEffect(() => {
    if (rouletteLoadingState && !winnerProperties?.distanceFromCenter) {
      const winner = document.getElementById("winner");

      if (winner) {
        getWinner(winner);
        setIsButtonActive(true);
      }
    }
  }, [rouletteLoadingState, winnerProperties?.distanceFromCenter, getWinner, setIsButtonActive]);

  return (
    <div className={style.RouletteArray} id="Roulette">
      {mappedParticipants}
      {mappedWinners}
      {mappedParticipants}
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
