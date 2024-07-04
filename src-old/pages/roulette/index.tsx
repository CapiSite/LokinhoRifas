import { useEffect, useRef, useState } from 'react';
import style from "./styles/roulette.module.css";
import Bg from "@/images/background.png";
import Image from 'next/image';
import Winner from "./winner/index";
import axios from 'axios';
import React from 'react';
import defaultImage from "../../images/foto-perfil-ex.png";
import colors from '../../utils/contants';

const Roullete = () => {
  const [currentBox, setCurrentBox] = useState(0);
  const [alreadyActive, setAlreadyActive] = useState(false);
  const [activeBox, setActiveBox] = useState(99);
  const boxRef:any = useRef(null);
  const carrouselRef:any = useRef(null);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
     
        axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/roulette/participants", {}).then((res: any) => {
          console.log(res.data)  
          setParticipants(res.data)
        }).catch((err: any) => {
          console.log(err.response)
        })
        

}, [])
  const handleRandomClick = () => {
    if (alreadyActive) return;
  
    const boxes = boxRef.current.querySelectorAll(`.${style.box}`);
    const carrousel = carrouselRef.current.querySelector(`.${style.boxGroup}`);
  
    if (!boxes.length) {
      console.error('No boxes found!');
      return; // Adiciona uma verificação para garantir que existem boxes
    }
  
    let count = 0;
    const timing = 5000;
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
    const carrousel = carrouselRef.current.querySelector(`.${style.boxGroup}`);

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
    const boxes = boxRef.current.querySelectorAll(`.${style.box}`);
    boxes.forEach((box:any, index:any) => {
      console.log(`The position of the ${index + 1}º box:`, (Math.round(box.getBoundingClientRect().right) - Math.round(box.getBoundingClientRect().left)) / 2 + Math.round(box.getBoundingClientRect().left));
    });
    console.log('\nCenter of screen: ', window.innerWidth / 2);
  };
  function getNearestMultiple(total: number, multipleOf: number): number {
    const remainder = total % multipleOf;
    if (remainder === 0) return total; // Já é múltiplo
    const adjustment = remainder < multipleOf / 2 ? -remainder : (multipleOf - remainder);
    return total + adjustment;
  }
  
  function falseBoxes(number: number) {
    const nearestMultiple = getNearestMultiple(number, participants.length);
    let boxes:any = [];
    const forQuantity = nearestMultiple / participants.length;
    let colorIndex = 0; // Inicializando o índice de cores
  
    for (let i = 0; i < forQuantity; i++) {
      participants.forEach((participant: any, index: number) => {
        const bgColor = colors[colorIndex % colors.length]; // Calcula a cor atual
        boxes.push(
          <div key={`participant-${index}-${i}`} className={style.faultyBox} style={{ backgroundColor: bgColor }}>
            <Image 
              src={participant.picture === "default" ? defaultImage :
                  (participant.picture).startsWith('https://static-cdn.jtvnw.net') ?
                  participant.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${participant.picture}`} 
              width={100} 
              height={100} 
              alt={participant.name}
            />
            <p className={style.TitleParticipant}>Número: {participant.number}</p>
            <p className={style.TitleParticipant}>{participant.name}</p>
          </div>
        );
        colorIndex++; // Incrementa o índice para a próxima cor
      });
    }
    return boxes;
  }
  
  return (
    <>
      <Image src={Bg} alt="Fundo" className={style.body}/>
      <div ref={carrouselRef} className={style.boxGroupWrapper}>
        <div className={style.shadow}></div>
        <div ref={boxRef} className={style.boxGroup}>
          {falseBoxes(160)}
          {participants.map((participant:any, index) => (
  <div key={index} className={style.box} style={{ backgroundColor: colors[index % colors.length] }}>
    <Image src={participant.picture === "default" ? defaultImage :
                  (participant.picture).startsWith('https://static-cdn.jtvnw.net') ?
                  participant.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${participant.picture}`} 
      width={100} height={100} alt={participant.name} style={{ borderRadius: '50%' }}/>
    <p className={style.TitleParticipant}>Número: {participant.number}</p>
    <p className={style.TitleParticipant}>{participant.name}</p>
  </div>
))}
          {falseBoxes(40)}
        </div>
        <div className={style.marker}></div>
      </div>
      <div className={style.buttonGroup}>
        <div className={style.main}>
          <button className={style.randomBox} onClick={handleRandomClick}>Sortear</button>
          <button className={style.button} id="resetBoxes" onClick={handleResetClick}>Reset crates</button>
        </div>
        <div>
          <Winner/>
        </div>
      </div>
    </>
  );
};

export default Roullete;
