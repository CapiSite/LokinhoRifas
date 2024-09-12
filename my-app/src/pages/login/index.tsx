import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import style from "./login.module.css";
import cn from "classnames";

import Eye from '../../assets/eye.svg'
import EyeSlashed from '../../assets/eye-slash.svg'

import SingUpBG from "../../images/Cadastro/CADASTROBG.png";
import Lines from "../../images/Cadastro/Lines.png";
import Image from "next/image";

const Login = () => {
  const { query, push } = useRouter();
  const { email } = query;
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [ passwordVisible, setPasswordVisible ] = useState(false)

  const addStep = () => {
    setStep((oldValue) => oldValue + 1);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        axios
          .post(
            process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth",
            {},
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          )
          .then((res: any) => {
            router.push("/");
          })
          .catch((err: any) => {
            localStorage.setItem("token", "");
          });
      }
    }
  }, []);

  const [formDataValue, setFormDataValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!email) return;

    setFormDataValue((oldValue) => {
      return { ...oldValue, email: String(email) };
    });
  }, [email]);

  const [error, setError] = useState("");

  const checkEmail = async () => {
    let tempBool = await axios
      .post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/verify", {
        email: formDataValue.email,
      })
      .then((res) => {
        push(`./cadastro?email=${formDataValue.email}`);
        return false;
      })
      .catch((error) => {
        if (error.response.data.name == "DuplicatedEmailError" && step == 0) {
          addStep();
        }
        return true;
      });

    return tempBool;
  };

  const keyDownHandler = (key: string) => {
    if(key != 'Enter') return
    validateLogIn()
  }

  const validateLogIn = async () => {
    setError("");
    const { email, password } = formDataValue;

    if (step == 0) {
      if (!email) {
        return setError("Todos os campos são obrigatórios!");
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return setError("Por favor, insira um endereço de e-mail válido.");
      }

      return await checkEmail();
    }

    if (step == 1) {
      if (!email || !password) {
        return setError("Todos os campos são obrigatórios!");
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return setError("Por favor, insira um endereço de e-mail válido.");
      }
    }

    axios
      .post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth/sign-in", {
        email: formDataValue.email,
        password: formDataValue.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message || "Email ou senha incorretos");
      });
  };

  const twitchAuth = () => {
    const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize";
    const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    if (CLIENT_ID && REDIRECT_URI) {
      const params = new URLSearchParams({
        response_type: "code",
        scope: "user:read:email",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
      });
      const authURL = `${TWITCH_URL}?${params.toString()}`;
      window.location.href = authURL;
    }
  };

  const toggleStatePassword = () => {
    setPasswordVisible(oldPassword => !oldPassword)
  }

  return (
    <>
      <div className={style.LogIn}>
        <div className={style.LogInWrapper}>
          <div className={style.col1}></div>
          <div className={style.col2}>
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Seja bem-vindo!</h2>

              {error && <div className={style.errorBox}>{error}</div>}

              <div
                className={cn(style.box, step == 0 ? style?.["step-1"] : "")}
              >
                <div className={style.boxWrapper}>
                  <label>
                    E-mail:
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formDataValue.email}
                      onChange={(e) =>
                        setFormDataValue((oldValue) => {
                          return { ...oldValue, email: e.target.value };
                        })
                      }
                      onKeyDown={e => keyDownHandler(e.key)}
                      required
                    />
                  </label>
                  <label>
                    Senha:
                    <div className={style.inputWrapper}>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formDataValue.password}
                        onChange={(e) =>
                          setFormDataValue((oldValue) => {
                            return { ...oldValue, password: e.target.value };
                          })
                        }
                        onKeyDown={e => keyDownHandler(e.key)}
                        required
                      />
                      <button onClick={toggleStatePassword}>
                        {passwordVisible ?
                         <Image src={EyeSlashed} alt="Hide password"/> : <Image src={Eye} alt="Show password"/>}
                      </button>
                    </div>
                  </label>
                  <Link href={"/recoverPassword"}>Esqueceu a senha?</Link>
                </div>
              </div>

              <button type="button" onClick={() => validateLogIn()}>
                Entrar
              </button>
              <hr />
              <button
                type="button"
                className={style.TwitchButton}
                onClick={() => twitchAuth()}
              >
                Entrar com Twitch
              </button>
              <Link href={"/cadastro"}>Não tem uma conta? Crie sua conta!</Link>
            </form>
          </div>
        </div>
        <div className={style.background}>
          <div className={style?.["background-0Wrapper"]}>
            <Image
              className={style?.["background-0"]}
              priority={true}
              src={SingUpBG}
              alt="Imagem de fundo"
            />
          </div>
          <Image
            className={style?.["background-1"]}
            src={Lines}
            alt="Linhas de fundo"
          />
        </div>
        <div className={style.glowGroup}>
          <div className={style?.["glow-0"]}>
            <div className={style?.["glow-1"]}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
