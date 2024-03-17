import Capa from '../images/capalokinho.png'
import Image from 'next/image'

const SignIn = () => {
  return (
    <div>
        
        <div>
            <div className="lado-esquerdo">
            </div>
            <div className="lado-direito">
                <div className="icones-login">

                </div>
                <div className="info">
                    <form action="" method="post">
                        <label htmlFor="nome"></label>
                        <input type="text" name="nome" id="nome" placeholder="nome de usuário" autoComplete="on"/>

                        <label htmlFor="senha"></label>
                        <input type="password" name="" id="senha" placeholder="senha" autoComplete="on"/>

                        <a href="src\pages\about\components\SignUp.tsx">Primeira vez? Crie uma conta!</a>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SignIn