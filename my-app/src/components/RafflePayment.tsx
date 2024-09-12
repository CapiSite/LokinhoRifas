import { useUserStateContext } from "contexts/UserContext";
import { raffleItem, rafflePayment, UserContextType } from "utils/interfaces";
import Currency from '../assets/currency.svg'
import Image from "next/image";
import { useEffect } from "react";

const RafflePayment = ({props}: {props: {
  selectedItems: raffleItem[],
  step: number,
}}) => {

  const { userInfo, setValueDiff, setQrcode64 } = useUserStateContext() as UserContextType

  const { step, selectedItems = [] } = props

  let value = 0
  selectedItems.map(item => value = value + (item.value * item.quantity))

  useEffect(() => {
    if(userInfo.saldo < value) {
      setValueDiff((userInfo.saldo - value) * -1)
      setQrcode64('')
    }
  }, [step])

  useEffect(() => {
    console.log(value)
  }, [value])



  function formatDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year}, às ${hours}:${minutes}`;
  }

  return (
    <div className="rafflePayment">
      <div className="sessionInfo">
        <h2>Pagamento</h2>
        <p>Confira os dados e confirme a compra para prosseguir</p>
      </div>

      <div className="rafflePaymentWrapper">
        <div className="userPaymentData">
          <div className="value">
            <h3><Image height={24} src={Currency} alt="Imagem de uma moeda"/> <span>BRL</span></h3>
            <h2>R$ {value.toFixed(2).toString().replace('.', ',')}</h2>
          </div>
          <div className="userBudget">
            <h3>Saldo Atual: R$ {userInfo.saldo.toFixed(2).toString().replace('.', ',')} BRL</h3>
            <h3>Saldo Restante: R$ {(userInfo.saldo - value).toFixed(2).toString().replace('.', ',')} BRL</h3>
          </div>
        </div>
        <div className="itemTable">
          <div className="header">
            <h3>Produto x Quantidade</h3>
            <h3>Custo</h3>
          </div>
          {selectedItems && selectedItems.map(item =>
          <div className="item" key={item.id}>
            <h3><span className="name">{item.name}</span> <div className="quantity">x {item.quantity}</div></h3>
            <h3>R$ {item.value.toString().includes('.') ? `${item.value.toString().split('.')[0]},${item.value.toString().split('.')[1][0]}${item.value.toString().split('.')[1][1] ? item.value.toString().split('.')[1][1] : '0'}` : `${item.value.toString()},00`}</h3>
          </div>)}
        </div>
        <div className="purchaseDetails">
          <div className="account">
            <h3>Conta:</h3>
            <p>{userInfo.email || 'notloggedinindividual'}</p>
          </div>
          <div className="dateOfPurchase">
            <h3>Data da Compra:</h3>
            <p>{formatDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default RafflePayment;