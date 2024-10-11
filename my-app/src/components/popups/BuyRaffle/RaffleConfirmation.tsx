import Image from 'next/image';
import checkMark from '../../../assets/checkmark.shield.svg'

const RaffleConfirmation = ({ props }: { props: { setIsVisible: React.Dispatch<React.SetStateAction<boolean>> } }) => {

  const {setIsVisible} = props

  return (
    <div className="raffleConfirmation">
      <div className="raffleConfirmationWrapper">
        <Image src={checkMark} width={220} alt='confirmação'/>
        <h2>Obrigado!</h2>
        <p>Pagamento realizado com sucesso, em caso de dúvida, entrar em contato pelo grupo do Whatsapp.</p>
        <button onClick={() => setIsVisible(false)}>Continuar</button>
      </div>
    </div>
  );
}
 
export default RaffleConfirmation;