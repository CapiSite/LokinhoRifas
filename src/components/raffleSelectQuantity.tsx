import { Dispatch, useEffect, useState } from "react";
import RaffleCartItem from "./raffleCartItem";
import { raffleItem } from "utils/interfaces";

const RaffleSelectQuantity = ({setQuantity}: {setQuantity: {setTotal: Dispatch<React.SetStateAction<number>>, rafflesData: raffleItem[], handleChangeQuantity: Function}}) => {
  const { setTotal, rafflesData, handleChangeQuantity } = setQuantity

  const [ updateQuantity, setUpdateQuantity ] = useState(false)

  
  useEffect(() => {
    changeTotal()
  }, [updateQuantity])

  const changeTotal = () => {
    if(rafflesData.length == 0) return

    let tempNumber = 0
    rafflesData.map(item => item.isSelected && (tempNumber += item.value * item.quantity))
    setTotal(tempNumber)
  }

  return (
    <div className="raffleBuyQuantity">
      <div className="sessionInfo">
        <h2>Compra de Rifa</h2>
        <p>Selecione a quantidade de rifas que gostaria de comprar</p>
      </div>
      <div className="cartGroup">
        <div className="cartGroupWrapper">
          {rafflesData && rafflesData.map(item => item.isSelected && <RaffleCartItem key={item.id} props={{item, handleChangeQuantity, setUpdateQuantity}}/>)}
        </div>
      </div>
    </div>
  );
}
 
export default RaffleSelectQuantity;