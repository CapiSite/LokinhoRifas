import axios from "axios";
import { useRouletteContext } from "contexts/RouletteContext";
import { useUserStateContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { RouletteContext, UserContextType } from "utils/interfaces";

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
    const debouncer = setTimeout(() => {
      // TODO fazer requisição pro back com rifa

      const tempArray = [];
      const tempArrayFiller = [];

      console.log(raffleSelected);

      for (let i = 1; i <= raffleSelected.users_quantity; i++) {
        const isSelected = raffleSelected.participants.filter(
          (item) => item.number == i
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

      for (let i = raffleSelected.users_quantity + 1; i <= 150; i++) {
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

    console.log(possibleNumbers.filter((item) => item.selected));

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

    // ! token pelo header
    // ! selections =  possibleNumbers.filter(item => item.selected).map(item => item.number)
    // ! quantity =  possibleNumbers.filter(item => item.selected).length
    // ! id da rifa = raffleSelected.id

    handleChangeNumbers(
      raffleSelected.id,
      possibleNumbers.filter((item) => item.selected).map((item) => item.number)
    );

    // Rotas de:
    // Reservar
    // // Cancelar
    // Comprar

    setShowNumberPicker(false);
  };

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
            </button>{" "}
            Já comprado
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
          <p onClick={() => setShowNumberPicker(false)}>Cancelar</p>
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
        onClick={() => setShowNumberPicker(false)}
        className="background"
      ></div>
    </div>
  );
};

export default NumberPicker;
