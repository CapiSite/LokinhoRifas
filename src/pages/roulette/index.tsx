import { useRef, useState } from 'react';
import style from "./styles/roulette.module.css";

const CrateOpening = () => {
  const [currentBox, setCurrentBox] = useState(0);
  const [alreadyActive, setAlreadyActive] = useState(false);
  const [activeBox, setActiveBox] = useState(99);
  const boxRef:any = useRef(null);
  const carrouselRef:any = useRef(null);
  
  const handleRandomClick = () => {
    if (alreadyActive) return;
  
    const boxes = boxRef.current.querySelectorAll(`.${style.box}`);
    const carrousel = carrouselRef.current.querySelector(`.${style.boxGroup}`);
  
    if (!boxes.length) {
      console.error('No boxes found!');
      return; // Adiciona uma verificação para garantir que existem boxes
    }
  
    let count = 0;
    const timing = 30000;
    setAlreadyActive(true);
  
    setTimeout(() => {
      setAlreadyActive(false);
    }, timing);
  
    let randomBox = Math.floor(Math.random() * boxes.length);
    while (count < 1000) {
      if (randomBox !== activeBox) {
        setActiveBox(randomBox);
        break;
      }
      randomBox = Math.floor(Math.random() * boxes.length);
    }
  
    const box = boxes[randomBox];
    if (!box) {
      console.error('Selected box is undefined!');
      return; // Verifica se o box selecionado realmente existe
    }
  
    const boxCenter = 
      (Math.round(box.getBoundingClientRect().right) -
       Math.round(box.getBoundingClientRect().left)) / 2 +
      Math.round(box.getBoundingClientRect().left) -
      window.innerWidth / 2;
  
    const spinTheCarrousel = new KeyframeEffect(
      carrousel,
      [
        { transform: `translateX(${currentBox}px)`, offset: 0 },
        { transform: `translateX(${currentBox + 20}px)`, offset: 0.1 },
        {
          transform: `translateX(${
            currentBox + boxCenter * -1 + (Math.random() * 30 - 15)
          }px)`,
          offset: 0.999,
        },
        { transform: `translateX(${currentBox + boxCenter * -1}px)`, offset: 1 },
      ],
      { duration: timing, easing: 'cubic-bezier(.44,.06,.22,1.04)', fill: 'forwards' }
    );
  
    setCurrentBox(prevCurrentBox => prevCurrentBox + boxCenter * -1);
  
    const spinAnimation = new Animation(spinTheCarrousel, document.timeline);
    spinAnimation.play();
  };
  

  const handleResetClick = () => {
    const carrousel = document.querySelector('.box-group');

    const spinTheCarrousel = new KeyframeEffect(
      carrousel,
      [
        { transform: `translateX(${currentBox}px)` },
        { transform: `translateX(${currentBox + 30}px)` },
        { transform: 'translateX(0px)' },
      ],
      { duration: 1000, fill: 'forwards' }
    );

    setCurrentBox(0);

    const spinAnimation = new Animation(spinTheCarrousel, document.timeline);
    spinAnimation.play();
  };

  const handleDebuggingClick = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
      console.log(`The position of the ${index + 1}º box:`, (Math.round(box.getBoundingClientRect().right) - Math.round(box.getBoundingClientRect().left)) / 2 + Math.round(box.getBoundingClientRect().left));
    });
    console.log('\nCenter of screen: ', window.innerWidth / 2);
  };

  return (
    <div className={style.body}>
      <h1 className={style.h1}>Crates</h1>
      <div ref={carrouselRef} className={style.boxGroupWrapper}>
        <div ref={boxRef} className={style.boxGroup}>
        <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.box}></div>
      <div className={style.box}></div>
      <div className={style.box}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.box}></div>
      <div className={style.box}></div>
      <div className={style.box}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
      <div className={style.faultyBox}></div>
        </div>
        <div className={style.marker}></div>
      </div>
      <div className={style.buttonGroup}>
        <div className={style.main}>
          <button className={style.randomBox} onClick={handleRandomClick}>Get a random crate</button>
          <button className={style.button} id="resetBoxes" onClick={handleResetClick}>Reset crates</button>
        </div>
        <div className={style.extras}>
          <h2 className={style.h2}>Extra (for debugging)</h2>
          <button className={style.button} id="getBoxes" onClick={handleDebuggingClick}>Find crates</button>
        </div>
      </div>
    </div>
  );
};

export default CrateOpening;
