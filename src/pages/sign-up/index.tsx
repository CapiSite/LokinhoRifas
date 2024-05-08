import Image from "next/image";
import style from "./styles/SignUp.module.css";
import Background from "@/images/background.png"
import Post from "@/images/Post.png"
import Steps from "./steps"
const Cadastro = () => {
  return (
    <div className={style.background3}>
      <div className={style.left3}>
        <Image className={style.back2} src={Background} alt="background" />
        <h1 className={style.welcome}>Seja bem-vindo!</h1>
        <Image className={style.post3} src={Post} alt="post" />
      </div>
      <div className={style.right3}>
        <Steps/>
      </div>
    </div>
  );
};
export default Cadastro;