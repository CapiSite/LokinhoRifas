import { useRouletteContext } from 'contexts/RouletteContext';
import style from '../roletta.module.css'
import { RaffleParticipant, RouletteContext } from 'utils/interfaces';
import { useEffect, useRef, useState } from 'react';
import StandByItem from './StandByItem';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames'

const StandBy = ({props}: {props: {afk: boolean}}) => {

  const { afk } = props

  const { winners, raffle } = useRouletteContext() as RouletteContext
  const [users, setUsers] = useState<RaffleParticipant[]>([])

  const standByRef = useRef<Animation | null>(null);


  const getUniqueParticipants = () => {
    if(!winners) return
    if(winners.length == 0) return

    const tempArray: RaffleParticipant[] = []

    winners.map(participant => {
      if(tempArray.filter(item => item.number == participant.number).length == 0) tempArray.push(participant)
    })

    setUsers(tempArray)

    // ! PARA DEBUGGING
    // setUsers(winners)
    // ! PARA DEBUGGING
  };

  useEffect(() => {
    getUniqueParticipants()
  }, [winners?.length, raffle?.id])

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const roulette = document.getElementById('RouletteBox');
      const standBy = document.getElementById('StandBy');

      if(standByRef.current) standByRef.current.cancel()
  
      const distance = Math.round(standBy?.getBoundingClientRect().right || 0) - Math.round(roulette?.getBoundingClientRect().right || 0);
      
      if(distance <= 0) return
  
      standByRef.current = new Animation(
        new KeyframeEffect(
          standBy,
          [
            { transform: `translateX(0px)`, offset: 0 },
            { transform: `translateX(-${distance}px)`, offset: 0.5 },
            { transform: `translateX(0px)`, offset: 1 },
          ],
          {
            duration: 30000,
            fill: "forwards",
            iterations: Infinity,
          }
        ),
        document.timeline
      );
  
      standByRef.current.play();
  
      return () => {
        standByRef.current?.cancel();
        clearTimeout(debouncer);
      };
    }, 400);
  
    return () => clearTimeout(debouncer);
  }, [raffle?.id, winners?.length]);


  return (
    <div className={cn(style.usersBox, afk ? style.running : '')}>
      <div className={style.usersBoxWrapper} id='StandBy'>
        {users.length > 0 && users.map(user => (
          <StandByItem key={uuidv4()} user={{name: user.user.name || 'Unknown', picture: user.user.picture || '', number: user.number || 0}}/>
        ))}
      </div>
    </div>
  );
}
 
export default StandBy;