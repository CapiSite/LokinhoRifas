import { useLastEarnedState } from 'contexts/LastEarnedContext';
import style from '../latestWinners.module.css'
import cn from 'classnames'
import { LastEarnedContextType } from 'utils/interfaces';
import { v4 as uuidv4 } from 'uuid';

const WinnersRank = () => {
  const { playerRank = [] } = useLastEarnedState() as LastEarnedContextType
  return (
    <div className={cn(style.rank, style.col2, style.bottom)}>
      <h2>Ranking</h2>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Vitórias</th>
              <th>Rifas participadas</th>
            </tr>
          </thead>
          <tbody>
            {playerRank && playerRank.map((rank, index) =>
            <tr key={uuidv4()}>
              <th>{index + 1}</th>
              <th>{rank.name}</th>
              <th>{rank.winCount}</th>
              <th>{rank.participations}</th>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default WinnersRank;