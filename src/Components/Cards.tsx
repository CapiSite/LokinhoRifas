import style from "@/styles/Card.module.css";
import Image from "next/image";

export default function   Card({ group, more, i }: any) {
  return (
    <>
      <div id="card" className={style.card}>
        <Image width={250} alt="GroupPhoto" src={group.photo} />
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
