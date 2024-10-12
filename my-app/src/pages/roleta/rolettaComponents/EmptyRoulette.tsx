import { useRouletteContext } from 'contexts/RouletteContext';
import style from '../roletta.module.css';
import { RouletteContext } from 'utils/interfaces';
import { useEffect, useState } from 'react';

const EmptyRoulette = () => {
  const {availableRaffles = [], raffle} = useRouletteContext() as RouletteContext

  return (
    <div className={style.emptyRoulette}><h1>{availableRaffles.length == 0 ? 'Sem Rifas no momento' : `Rifa sem participantes ainda!`}</h1>
    <h2>Números em estoque: {(raffle?.users_quantity || 0)}</h2></div>
  );
}
 
export default EmptyRoulette;