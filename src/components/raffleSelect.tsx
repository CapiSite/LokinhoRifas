import { Dispatch } from "react";
import RaffleCard from "./RaffleCard";
import { raffleItem } from "utils/interfaces";

const RaffleSelect = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, rafflesData: raffleItem[], setRaffleDetails: Dispatch<React.SetStateAction<number>>} }) => {

  const { setDetailsVisible, rafflesData, setRaffleDetails } = moreDetails
  
  return (
    <div className="raffleSelect">
    <div className="sessionInfo">
      <h2>Compra de Rifa</h2>
      <p>Selecione quais rifas gostaria de participar</p>
    </div>
    <div className="cardGroup">
      <div className="cardGroupWrapper">
        {rafflesData && rafflesData.map(raffle => <RaffleCard key={raffle.id} props={{raffle}} moreDetails={{setDetailsVisible, setRaffleDetails}} />)}
      </div>
    </div>
  </div>
  );
}
 
export default RaffleSelect;