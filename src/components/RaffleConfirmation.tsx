import Image from 'next/image';
import checkMark from '../assets/checkmark.shield.svg'
import { raffleItem } from 'utils/interfaces';

const RaffleConfirmation = () => {
  return (
    <div className="raffleConfirmation">
      <Image src={checkMark} width={220} alt='confirmação'/>
      <h2>Obrigado!</h2>
      <p>Pagamento realizado com sucesso, em caso de dúvida, entrar em contato pelo grupo do Whatsapp.</p>
    </div>
  );
}
 
export default RaffleConfirmation;