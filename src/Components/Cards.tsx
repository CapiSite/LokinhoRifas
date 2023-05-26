import style from "@/styles/Card.module.css";
import Image from "next/image";




export default function Card({group}:any) {
  return (
    <>
      <div className={style.card}>
            <Image width={250} alt="GroupPhoto" src={group.photo}/>
            <div className={style.line2}>
                
            </div>
            <div className={style.group}>
                <h1>{group.name}</h1>
                <p>{group.description}</p>
                <button>ENTRAR</button>
            </div>
        </div>
    </>
  );
}
