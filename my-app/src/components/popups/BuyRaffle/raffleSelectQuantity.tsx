import { Dispatch, useEffect, useState } from "react";
import RaffleCartItem from "./raffleCartItem";
import { raffleItem } from "utils/interfaces";

const RaffleSelectQuantity = ({setQuantity}: {setQuantity: {setTotal: Dispatch<React.SetStateAction<number>>, rafflesData: raffleItem[], handleChangeQuantity: Function}}) => {
  const { setTotal, rafflesData, handleChangeQuantity } = setQuantity

  const [ updateQuantity, setUpdateQuantity ] = useState(false)

  
  useEffect(() => {
    // console.log(rafflesData)
    changeTotal()
  }, [updateQuantity, rafflesData])

  // TODO: Atualizar números selecionados na propriedade selected? da rifa selecionada
    // TODO: Criar uma função em useRouletteContext para adicionar ou remover números da rifa que se está editando
  // TODO: Descobrir como enviar os números para o back caso tenha algum selecionado individualmente

  // ? Quando reservamos?
    // ? Ao pressionar o botão de selecionar números, ou ao passar da etapa de seleção

//   type raffleItem = {
//     id: number;
//     skins: string[];
//     name: string;
//     users_quantity: number;
//     value: number;
//     quantity: number;
//     selected?: number[];
//     maxQuantity: number;
//     isSelected: boolean;
//     bannerSkin: string;
//     bundleValue: number;
// }

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