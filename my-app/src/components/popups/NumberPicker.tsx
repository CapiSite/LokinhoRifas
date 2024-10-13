import { useUserStateContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { UserContextType } from "utils/interfaces";

const NumberPicker = () => {
  const { raffleSelected, setShowNumberPicker, userInfo } = useUserStateContext() as UserContextType

  const [ possibleNumbers, setPossibleNumbers ] = useState<{number: number, reserved: boolean, notAvailable: boolean, selected: boolean}[]>([])
  const [ fillerNumbers, setFillerNumbers ] = useState<{number: number, available: boolean, selected: boolean}[]>([])

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const tempArray = []
      const tempArrayFiller = []

      // TODO Alterar para checar participantes

      // console.log(raffleSelected)

      for(let i = 1; i <= raffleSelected.users_quantity; i++) {
        tempArray.push({ number: i, reserved: i <= raffleSelected.maxQuantity, notAvailable: i <= raffleSelected.maxQuantity, selected: false })
      }

      for(let i = (raffleSelected.users_quantity + 1); i <= 150; i++) {
        tempArrayFiller.push({ number: i, available: true, selected: false })
      }

      setPossibleNumbers(tempArray)
      setFillerNumbers(tempArrayFiller)
    }, 400);

    return () => clearTimeout(debouncer)
  }, [])

  const handleClick = (number: number) => {
    const tempArray = possibleNumbers.map(item => {
      if(item.number == number) return {...item, selected: !item.selected}
      return item
    })

    setPossibleNumbers(tempArray)
  }

  const handleConfirm = () => {
    if(possibleNumbers.filter(item => item.selected).length == 0) return

    // TODO Adicionar etapas no back
    // TODO enviar número, userId e id da rifa



    // Rotas de:
    // Reservar
    // Cancelar
    // Comprar

    setShowNumberPicker(false)
  }

  return (
    <div className="NumberPicker">
      <div className="NumberPickerWrapper">
        <div className="infoSection">
          <h2>Selecione seus números</h2>
          <p>Selecione seus números abaixo!</p>
        </div>
        {possibleNumbers.length !== 0 ? <div className="NumberGroup">
          {possibleNumbers && possibleNumbers.map(number => <button onClick={() => handleClick(number.number)} className={`${number.notAvailable ? 'notAvailable' : ''} ${number.selected ? 'selected' : ''}`} disabled={number.reserved || number.notAvailable}>{number.number}</button>)}
          {fillerNumbers && fillerNumbers.map(number => <button disabled={number.available}>{number.number}</button>)}
        </div> : <div className="loading"><h1>Carregando...</h1></div> }
        <div className="BottomSection">
          <p onClick={() => setShowNumberPicker(false)}>Cancelar</p>
          <button onClick={handleConfirm} disabled={possibleNumbers.filter(item => item.selected).length == 0}>Confirmar Números</button>
        </div>
      </div>
      <div onClick={() => setShowNumberPicker(false)} className="background"></div>
    </div>
  );
}
 
export default NumberPicker;