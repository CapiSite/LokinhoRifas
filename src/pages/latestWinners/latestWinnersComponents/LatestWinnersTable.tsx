import { useLastEarnedState } from 'contexts/LastEarnedContext';
import style from '../latestWinners.module.css'
import { LastEarnedContextType } from 'utils/interfaces';
import { v4 as uuidv4 } from 'uuid';


const LatestWinnersTable = ({ props }: { props: {formatarDataHora: (date: string) => string} }) => {
  if(!props) return <h1>Erro nos props do LatestWinnersTable.tsx</h1>
  const { formatarDataHora } = props
  const { lastEarnedList } = useLastEarnedState() as LastEarnedContextType

  return (
    <div className={style.col1}>
      <h2>Recentes ganhadores</h2>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Skin</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {lastEarnedList.map(user =>
              <tr key={uuidv4()} className={Number(user.ItemValue) > 1000 ? style.Gold : style.Silver}>
                <th>{user.WinnerName}</th>
                <th>{user.ItemName}</th>
                <th>{user.ItemType}</th>
                <th>R$ {Number(user.ItemValue).toFixed(2)}</th>
                <th>{formatarDataHora(user.unformattedTime)}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default LatestWinnersTable;