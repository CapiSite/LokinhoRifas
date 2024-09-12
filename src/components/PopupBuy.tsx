import { useEffect, useState } from "react";
import { raffleItem, RouletteContext, UserContextType } from "utils/interfaces";
import Link from "next/link";

import leftarrow from '../assets/arrowleft.svg'

import RaffleDetails from "./RaffleDetails";
import StepCounter from "./stepCounter";
import RaffleSelect from "./raffleSelect";
import RaffleSelectQuantity from "./raffleSelectQuantity";
import RafflePayment from "./RafflePayment";
import { useUserStateContext } from "contexts/UserContext";
import RaffleConfirmation from "./RaffleConfirmation";
import { useRouletteContext } from "contexts/RouletteContext";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const PopupBuy = ({
  props,
}: {
  props: {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {

  const {
    purchasableRaffles = [],
    toggleSelection,
    handleChangeQuantity,
  } = useRouletteContext() as RouletteContext;

  const router = useRouter();

  const { isVisible, setIsVisible, setShowPayment } = props;
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [ selectedItems, setSelectedItems ] = useState<raffleItem[]>(purchasableRaffles.filter(raffle => raffle.isSelected))
  const [raffleDetails, setRaffleDetails] = useState(0);
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  const addStep = () => {
    setStep((oldValue) => (oldValue += 1));
  };

  useEffect(() => {
    setSelectedItems(purchasableRaffles.filter(raffle => raffle.isSelected))
  }, [step])

  useEffect(() => {
    if(selectedItems.length == 0) return
    console.log(selectedItems)
  }, [selectedItems.length])

  const removeStep = () => {
    setStep((oldValue) => (oldValue -= 1));
  };

  const checkStep = () => {
    return `step-${step}`;
  };

  const handleButtonText = () => {
    if (checkStep() == "step-1") return "Confirmar seleções";
    else if (checkStep() == "step-2") return "Confirmar quantidades";
    else if (checkStep() == "step-3") return "Confirmar compra";
    else if (checkStep() == "step-4") return "Continuar";
  };

  const handleStepValidation = () => {
    if (!userInfo.email) return router.reload();
    if (step < 3) addStep();
    else if (step == 4) {
      setIsVisible(false);
    } else {
      if (userInfo.saldo < total) {
        setShowPrompt(true);
        // * Lançar um popup na interface para pedir pro usuário comprar mais créditos ou cancelar a compra
      } else {
        const tempArray2 = purchasableRaffles.filter(
          (raffle) => raffle.isSelected
        );

        const tempArray = tempArray2.map((raffle) => ({
          id: raffle.id,
          quantity: raffle.quantity,
        }));

        axios
          .post(
            `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle/buyRaffle`,
            {
              raffle: tempArray,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if(res.data.remainingBalance) setUserInfo(oldValue => ({...oldValue, saldo: res.data.remainingBalance}))
            // * Verificar se ao retorno a resposta está vindo correta, e atualizar o saldo local de forma correta
            addStep();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handlePrompt = (redirect: boolean) => {
    setShowPrompt(false);

    if (redirect) setShowPayment(true)
  };

  const newTotal = total.toString().includes(".")
    ? `${total.toString().split(".")[0]},${total.toString().split(".")[1][0]}${
        total.toString().split(".")[1][1]
          ? total.toString().split(".")[1][1]
          : "0"
      }`
    : `${total.toString()},00`;

  return (
    <section className={`PopupBuy ${isVisible ? "" : "not-show"}`}>
      <div className="PopupBuyWrapper">
        <StepCounter steps={{ step }} />

        <div className="PopupBuyContent">
          <div className={`PopupBuyContentWrapper ${checkStep()}`}>
            {/* Abaixo são as etapas para compra de rifa */}

            <RaffleSelect
              moreDetails={{
                setDetailsVisible,
                rafflesData: purchasableRaffles,
                setRaffleDetails,
              }}
            />

            {/* Raffle select é a primeira etapa, o usuário precisa ter pelo menos uma rifa selecionada para progredir */}

            <RaffleSelectQuantity
              setQuantity={{
                setTotal,
                rafflesData: purchasableRaffles,
                handleChangeQuantity
              }}
            />

            {/* Raffle select quantity é a segunda, aqui ele poderá adicionar mais números referentes as rifas selecionadas na etapa anterior */}

            <RafflePayment
              props={{ selectedItems, step }}
            />

            {/* Raffle payment lidará com o pagamento através do saldo na conta, essa escolha foi feita pra evitar o possível assincronismo entre a pessoa ter ou não o valor em mãos, algo que à prontifica melhor */}

            <RaffleConfirmation />

            {/* Por último, a tela de confirmação, nela será apenas adiantado que o pagamento foi realizado com sucesso, e que agora ela terá acesso aos números que está participando na rifa */}
          </div>
          <div className={step == 4 ? "bottomSection end" : "bottomSection"}>
            {step > 1 && step < 3 && (
              <div className="totalValue">
                <h3>Total: R$ {newTotal}</h3>
              </div>
            )}
            {step > 1 && step < 4 && (
              <Link href={""} onClick={removeStep}>
                <Image width={20} height={20} className="seta" src={leftarrow} alt="Voltar"/> Voltar
              </Link>
            )}
            <button
              onClick={handleStepValidation}
              disabled={
                purchasableRaffles.filter((raffle) => raffle.isSelected)
                  .length == 0
              }
              className={`${(step == 1 || step == 4) && "center"}`}
            >
              {handleButtonText()}
            </button>
          </div>
        </div>

        <div onClick={() => setIsVisible(false)} className="background"></div>
        {detailsVisible && (
          <RaffleDetails
            moreDetails={{
              setDetailsVisible,
              rafflesData: purchasableRaffles.filter(
                (raffle) => raffle.id == raffleDetails
              )[0],
              toggleSelection,
            }}
          />
        )}
      </div>
      {showPrompt && (
        <div className="prompt">
          <div className="promptWrapper">
            <h2>Saldo insuficiente!</h2>
            <div className="buttonGroup">
              <button onClick={() => handlePrompt(true)}>Comprar mais</button>
              <button onClick={() => handlePrompt(false)}>Cancelar</button>
            </div>
          </div>
          <div onClick={() => setIsVisible(false)} className="background"></div>
        </div>
      )}
    </section>
  );
};

export default PopupBuy;
