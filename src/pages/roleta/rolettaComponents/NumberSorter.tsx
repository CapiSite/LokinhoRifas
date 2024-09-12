import { useRouletteContext } from 'contexts/RouletteContext';
import style from '../roletta.module.css'
import { RouletteContext } from 'utils/interfaces';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { BsTypeH2 } from 'react-icons/bs';

const NumberSorter = () => {
  const { participants = [], raffle, winnerProperties } = useRouletteContext() as RouletteContext

  // window.innerWidth
  // window.innerHeight

  const [ zeroAmount, setZeroAmount ] = useState(4)

  useEffect(() => {
    if(!participants) return
    if(participants.length == 0) return

    setZeroAmount(prev => {
      const zeroesAmount = Number(participants.reduce((max, current) => {
      if(max.number > current.number) return max
      else if(max.number < current.number) return current
      else return max
    }).number.toString().length)

    if(zeroesAmount % 2 !== 0) return zeroesAmount + 1
    else return zeroesAmount
    })
  }, [raffle ? raffle.id : raffle])

  const handleNumber = (number: number): ReactNode[] => {
    const tempString = number.toString().padStart(zeroAmount, '0')
    const tempArray: React.ReactNode[] = [];

    for(let i = 2; i <= zeroAmount; i += 2) {
      tempArray.push(
      <Fragment key={i}>
        <span
        style={{ "--dynamic-margin": `${i/2}` } as React.CSSProperties}
        >
          {tempString[i - 2]}{tempString[i - 1]}
          {i < zeroAmount && <br />}
        </span>
      </Fragment>)
    }

    return tempArray
  }

  // 3 Mostrar "card" com número vencedor

  // 5 Remover número vencedor
  

  return (
    <div className={style.NumberSorter}>
      <div className={style.NumberSorterWrapper}>
        {winnerProperties ? 
        <>
          <h2 className={zeroAmount > 4 ? style.scroll : ''}>{handleNumber(winnerProperties.number)}</h2>
          <p><span className={style.mainName}>{winnerProperties.user.name}</span><span className={style.number}>#{winnerProperties.number.toString().padStart(zeroAmount, '0')}</span></p> 
        </>
        : <h2>Sem participantes</h2>}
      </div>
    </div>
  );
}
 
export default NumberSorter;