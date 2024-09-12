import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';
import RoletaWinner from './rolettaComponents/WinnerPopup';
import { RouletteProvider } from 'contexts/RouletteContext';

const TempRoleta = () => {
  return (
    <>
      <LastEarnedContextProvider>
        <RouletteProvider>
          <Hero />
          <LastEarnedPrizeGrid />
          <RoletaWinner />
        </RouletteProvider>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default TempRoleta;