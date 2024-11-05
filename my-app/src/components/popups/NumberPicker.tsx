import axios, { AxiosResponse } from "axios";
import { useRouletteContext } from "contexts/RouletteContext";
import { useUserStateContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { Raffle, RaffleParticipant, RouletteContext, UserContextType } from "utils/interfaces";

const NumberPicker = () => {
  const { raffleSelected, setShowNumberPicker, userInfo } =
    useUserStateContext() as UserContextType;
  const { handleChangeNumbers } = useRouletteContext() as RouletteContext;

  const [possibleNumbers, setPossibleNumbers] = useState<
    {
      number: number;
      reserved: boolean;
      notAvailable: boolean;
      selected: boolean;
      user: number;
    }[]
  >([]);
  const [fillerNumbers, setFillerNumbers] = useState<
    { number: number; available: boolean; selected: boolean }[]
  >([]);

  useEffect(() => {
    const debouncer = setTimeout(async () => {
      let raffles: AxiosResponse<Raffle[]> | void;

      try {
          raffles = await axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/raffle").then(res => res.data)
      } catch (err) {
          console.error("Raffles error", err);
          return;
      }

      if (!Array.isArray(raffles) || !raffles.every(item => typeof item === 'object' && item !== null)) return;

      const tempArray = [];
      const tempArrayFiller = [];

      const raffle = raffles.filter(raffle => raffle.id == raffleSelected.id)[0]

      for (let i = 1; i <= raffle.users_quantity; i++) {
        const isSelected = raffle.participants.filter(
          (item: RaffleParticipant) => item.number == i
        )[0];

        tempArray.push({
          number: i,
          reserved:
            isSelected && isSelected.is_reserved
              ? isSelected.is_reserved
              : false,
          notAvailable: isSelected ? isSelected.is_paid == true : false,
          selected: isSelected
            ? isSelected.user.id == Number(userInfo.id) &&
              isSelected.is_paid == false
            : false,
          user: isSelected ? isSelected.user.id : -1,
        });
      }

      // TODO Arredondar Número de botões da rifa sempre pra 3 décimais àcima

      function roundUp(num: number) {
        const roundedUp = Math.ceil(num / 10) * 10;
        const finalValue = roundedUp + 30;
        
        return finalValue;
      }
    
      for (let i = raffle.users_quantity + 1; i <= roundUp(raffle.users_quantity); i++) {
        tempArrayFiller.push({ number: i, available: true, selected: false });
      }


      setPossibleNumbers(tempArray);
      setFillerNumbers(tempArrayFiller);
    }, 400);

    return () => clearTimeout(debouncer);
  }, []);

  const handleClick = (number: number) => {
    const tempArray = possibleNumbers.map((item) => {
      if (item.number == number) return { ...item, selected: !item.selected };
      return item;
    });

    setPossibleNumbers(tempArray);
  };

  const handleConfirm = () => {
    if (
      possibleNumbers.filter((item) => item.selected).length == 0 &&
      possibleNumbers.filter(
        (item) =>
          item.reserved && !item.selected && item.user == Number(userInfo.id)
      ).length == 0
    )
      return;

    const body = {
      raffle: [
        {
          id: raffleSelected.id,
          selections: possibleNumbers
            .filter((item) => item.selected)
            .map((item) => item.number),
          quantity: possibleNumbers.filter((item) => item.selected).length,
        },
      ],
    };
    console.log(body);

    axios
      .post(
        process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/raffle/reserveRaffleNumbers",
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    handleChangeNumbers(
      raffleSelected.id,
      possibleNumbers.filter((item) => item.selected).map((item) => item.number)
    );

    setShowNumberPicker(false);
  };

  const handleCancel = () => {
    handleChangeNumbers(
      raffleSelected.id,
      []
    );

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
            <button className="notAvailable">X</button> Já comprado / reservados
            por outros <br />
            <button className="notReserved">X</button> Reserva removida <br />
            <button className="selected">X</button> Selecionado / Reservado
            anteriormente <br />
            <button className="selected" disabled>
              X
            </button> Já comprado <br />
            <p>Caso não finalize o pagamento em até 5 minutos, as reservas serão perdidas</p>
          </div>
          {possibleNumbers.length !== 0 ? (
            <div className="NumberGroup">
              {possibleNumbers &&
                possibleNumbers.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(number.number)}
                    className={`
                    ${
                      (number.notAvailable &&
                        number.user != Number(userInfo.id)) ||
                      (number.reserved && number.user != Number(userInfo.id))
                        ? "notAvailable"
                        : ""
                    } 
                    ${
                      number.reserved &&
                      !number.selected &&
                      number.user == Number(userInfo.id)
                        ? "notReserved"
                        : ""
                    } 
                    ${number.selected ? "selected" : ""} 
                    ${
                      number.user == Number(userInfo.id) && number.notAvailable
                        ? "selected"
                        : ""
                    }`}
                    disabled={
                      (number.reserved && number.user != Number(userInfo.id)) ||
                      number.notAvailable
                    }
                  >
                    {number.number}
                  </button>
                ))}
              {fillerNumbers &&
                fillerNumbers.map((number, index) => (
                  <button key={-index} disabled={number.available}>
                    {number.number}
                  </button>
                ))}
            </div>
          ) : (
            <div className="loading">
              <h1>Carregando...</h1>
            </div>
          )}
        </div>
        <div className="BottomSection">
          <p onClick={() => handleCancel()}>Cancelar</p>
          <button
            onClick={handleConfirm}
            disabled={
              possibleNumbers.filter((item) => item.selected).length == 0 &&
              possibleNumbers.filter((item) => item.reserved).length == 0
            }
          >
            Confirmar Números
          </button>
        </div>
      </div>
      <div
        onClick={() => handleCancel()}
        className="background"
      ></div>
    </div>
  );
};

export default NumberPicker;
