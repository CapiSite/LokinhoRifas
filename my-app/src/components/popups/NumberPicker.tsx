import { useRouletteContext } from "contexts/RouletteContext";
import { useUserStateContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { RouletteContext, UserContextType } from "utils/interfaces";

const NumberPicker = () => {
  const { raffleSelected, setShowNumberPicker, userInfo } = useUserStateContext() as UserContextType
  const { handleChangeNumbers } = useRouletteContext() as RouletteContext

  const [ possibleNumbers, setPossibleNumbers ] = useState<{number: number, reserved: boolean, notAvailable: boolean, selected: boolean, user: number}[]>([])
  const [ fillerNumbers, setFillerNumbers ] = useState<{number: number, available: boolean, selected: boolean}[]>([])

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const tempArray = []
      const tempArrayFiller = []

      for(let i = 1; i <= raffleSelected.users_quantity; i++) {
        const isSelected = raffleSelected.participants.filter(item => item.number == i)[0]

        tempArray.push({ number: i, reserved: isSelected ? isSelected.is_paid == false : false, notAvailable: isSelected ? isSelected.is_paid == true : false, selected: isSelected ? (isSelected.is_paid == false && isSelected.user.id == Number(userInfo.id)) : false, user: isSelected ? isSelected.user.id : -1 })
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
    // TODO Permitir o envio "vazio" do array pro back para cancelar as reservas
    if(possibleNumbers.filter(item => item.selected).length == 0 && (possibleNumbers.filter(item => item.reserved && !item.selected && item.user == Number(userInfo.id)).length == 0 )) return


    // TODO Adicionar etapas no back
    // TODO enviar número, userId e id da rifa

    // ! userId = userInfo.id
    // ! número =  possibleNumbers.filter(item => item.selected).map(item => item.number)
    // ! id da rifa = raffleSelected.id

    handleChangeNumbers(raffleSelected.id, possibleNumbers.filter(item => item.selected).map(item => item.number))

    // Rotas de:
    // Reservar
    // // Cancelar
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
        <div className="Content">
          <div className="NumberGroupLegend">
            <button className="notAvailable">X</button> Já comprado / reservados por outros <br />
            <button className="notReserved">X</button> Reserva removida <br />
            <button className="selected">X</button> Selecionado / Reservado anteriormente <br />
            <button className="selected" disabled>X</button> Já comprado
          </div>
          {possibleNumbers.length !== 0 ? <div className="NumberGroup">
            {possibleNumbers && possibleNumbers.map((number, index) => <button key={index} onClick={() => handleClick(number.number)} className={`${(number.notAvailable && (number.user != Number(userInfo.id))) || ((number.reserved && number.user != Number(userInfo.id))) ? 'notAvailable' : ''} ${((number.reserved && !(number.selected)) && number.user == Number(userInfo.id)) ? 'notReserved' : ''} ${number.selected ? 'selected' : ''} ${(number.user == Number(userInfo.id)) && number.notAvailable ? 'selected' : ''}`} disabled={(number.reserved && number.user != Number(userInfo.id)) || number.notAvailable}>{number.number}</button>)}
            {fillerNumbers && fillerNumbers.map((number, index) => <button key={-index} disabled={number.available}>{number.number}</button>)}
          </div> : <div className="loading"><h1>Carregando...</h1></div> }
        </div>
        <div className="BottomSection">
          <p onClick={() => setShowNumberPicker(false)}>Cancelar</p>
          <button onClick={handleConfirm} disabled={(possibleNumbers.filter(item => item.selected).length == 0 && possibleNumbers.filter(item => item.reserved).length == 0)}>Confirmar Números</button>
        </div>
      </div>
      <div onClick={() => setShowNumberPicker(false)} className="background"></div>
    </div>
  );
}
 
export default NumberPicker;