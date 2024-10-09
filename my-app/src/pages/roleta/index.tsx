import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';
import RoletaWinner from './rolettaComponents/WinnerPopup';
import { RouletteProvider } from 'contexts/RouletteContext';
import { useState } from 'react';
import PopupBuy from 'components/PopupBuy';
import { useUserStateContext } from 'contexts/UserContext';
import { UserContextType } from 'utils/interfaces';

const TempRoleta = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setShowPayment } = useUserStateContext() as UserContextType;


  return (
    <>
      <LastEarnedContextProvider>
        <RouletteProvider>
        {isVisible && <PopupBuy props={{ isVisible, setIsVisible, setShowPayment }} />}
          <Hero props={{ isVisible, setIsVisible }} />
          <LastEarnedPrizeGrid />
          <RoletaWinner />
        </RouletteProvider>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default TempRoleta;