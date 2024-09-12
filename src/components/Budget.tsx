import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "utils/interfaces";

const Budget = () => {
  const { userInfo, setShowPayment, setShowBudget, lastestTransactions, setQrcode64, setValueDiff } = useUserStateContext() as UserContextType;

  const formatarDataHora = (date: string): string => {
    const getDate = new Date(date)

    const dia = String(getDate.getDate()).padStart(2, "0");
    const mes = String(getDate.getMonth() + 1).padStart(2, "0");
    const ano = getDate.getFullYear();
    const horas = String(getDate.getHours()).padStart(2, "0");
    const minutos = String(getDate.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  };

  type Transaction = {
    date: string;
  }

  const sortMechanism = (a: Transaction, b: Transaction) => {
    if(a.date < b.date) return 1
    else return -1
  }

  const handleClick = (qrcode64: string | null) => {
    if(!qrcode64) return

    setValueDiff(0)
    setQrcode64(qrcode64)
    setShowPayment(true)
  }

  const handlePaymentOpen = () => {
    setValueDiff(0)
    setQrcode64('')

    setShowPayment(true)
  }

  return (
    <div className="budget">
      <div className="budgetWrapper">
        <div className="currentBudget">
          <h1>R$ {userInfo.saldo.toFixed(2).toString().replace(".", ",")}</h1>
          <h2>Saldo Atual</h2>
        </div>

        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Data da Movimentação</th>
                <th>Status</th>
                <th>Método</th>
                <th className="price">Débito/Crédito</th>
              </tr>
            </thead>
            <tbody>
              {lastestTransactions.length > 0 &&
                lastestTransactions.sort((a, b) => sortMechanism(a, b)).map((payment) => (
                  <tr key={payment.id}>
                    <th>{formatarDataHora(payment.date)}</th>
                    <th className="status">{payment.status.toUpperCase()}{payment.status == 'pending' && <button className="finishPayment" onClick={() => handleClick(payment.qrCodeBase64)}>Finalizar pagamento</button>}</th>
                    <th>{payment.method.toUpperCase()}</th>
                    <th className={`price ${payment.type == 'credit' ? 'earn' : 'loss'}`}>
                      {payment.type == 'credit' ? '+ ' : '- '}R${" "}
                      {payment.exchanged
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => handlePaymentOpen()}>Comprar Saldo</button>
      </div>
      <div onClick={() => setShowBudget(false)} className="background"></div>
    </div>
  );
};

export default Budget;
