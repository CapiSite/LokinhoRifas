const Login = () => {
  return (
    <div>
        <div>
            <div className="lado-esquerdo"></div>
            <div className="lado-direito">
                <div>
                    <form action="" method="post">
                        <input type="text" name="" id="email" placeholder="e-mail"/>
                        <label htmlFor="email"></label>

                        <input type="password" name="" id="senha" placeholder="senha"/>
                        <label htmlFor="senha"></label>

                        <input type="text" name="" id="nome" placeholder="nome de usuário"/>
                        <label htmlFor="nome"></label>

                        <input type="text" name="link" id="tradlink" placeholder="tradlink"/>
                        <label htmlFor="tradlink"></label>

                        <label htmlFor="imagem-usuario">Foto de Perfil</label>
                        <input type="file" name="" id="imagem-usuario"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login