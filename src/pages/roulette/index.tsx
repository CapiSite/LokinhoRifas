import style from "./styles/roulette.module.css";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { items } from './const';


const duplicatedItems = [...items, ...items];

const Roulette = () => {
  const rouletteRef:any = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null) as any;
  const [isSpinning, setIsSpinning] = useState(false);
  const sortearPessoa = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const itemSorteado:any = items[Math.floor(Math.random() * items.length)];
    setSelectedItem(itemSorteado);
    // Calcule o índice do item no array duplicado, escolhendo a segunda ocorrência para a animação
    const itemIndex = items.length + items.indexOf(itemSorteado);
    const spinTime = 3000; // 3 segundos de rotação
    const itemWidth:any = rouletteRef.current.firstChild.offsetWidth;
    const itemMargin = 10;
    const scrollToCenter = (itemWidth + itemMargin * 2) * itemIndex + (itemWidth / 2) - (rouletteRef.current.offsetWidth / 2);
    rouletteRef.current.style.transition = 'transform 0s';
    rouletteRef.current.style.transform = 'translateX(0px)';
    setTimeout(() => {
      rouletteRef.current.style.transition = `transform ${spinTime}ms ease-out`;
      rouletteRef.current.style.transform = `translateX(-${scrollToCenter}px)`;
    }, 0);
    setTimeout(() => {
      // Resetar a posição da roleta de forma imperceptível após a animação
      rouletteRef.current.style.transition = 'none';
      rouletteRef.current.style.transform = `translateX(-${(itemWidth + itemMargin * 2) * items.indexOf(itemSorteado) + (itemWidth / 2) - (rouletteRef.current.offsetWidth / 2)}px)`;
      setIsSpinning(false);
    }, spinTime);
  };
  return (

    <div className={style.container}>
      <div ref={rouletteRef} className={style.wrapper}>
        {duplicatedItems.map((item, index) => (
          <div key={index} className={style.item && selectedItem && selectedItem.id === item.id ? style.selected : ''}>
            <img src={item.img} alt={item.name} />
            <div className={style.info}>{item.name}</div>
          </div>
        ))}
      </div>
      <br />
      <button onClick={sortearPessoa} disabled={isSpinning}>Sortear</button>
    </div>
    
  );
};

export default Roulette;