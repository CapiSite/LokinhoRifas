const RaffleNumber = ({ props }: { props: { data: {
  number: number;
  isSelected: boolean;
  isAvailable: boolean;
}
value: {
  toggleSelectNumber: Function;
}
}}) => {
  const { data, value } = props
  const { toggleSelectNumber } = value

  return (
    <button disabled={data.isAvailable ? false : true} onClick={() => toggleSelectNumber(data.number)} className={`Number ${data.isSelected ? 'selected' : ''}`}>{data.number.toString().padStart(2, '0')}</button>
  );
}
 
export default RaffleNumber;