import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import { useUserStateContext } from "contexts/UserContext";
import style from "./recoverPassword.module.css";
import cn from "classnames";

import SingUpBG from "../../images/Cadastro/CADASTROBG.png";
import Lines from "../../images/Cadastro/Lines.png";
import Image from "next/image";
import { UserContextType } from "utils/interfaces";

const RecoverPassword = () => {
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType;
  const { query, push } = useRouter();
  const { email } = query;
  const router = useRouter();

  const [step, setStep] = useState(0);

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
    token: "",
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
    axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth/forgot-password", {email: formDataValue.email}).then(res => {
      addStep();
    }).catch(err=>{
      alert("Email não encontrado")
    })
          
  };

  const validateLogIn = async () => {
    setError("");
    const { email, token, password } = formDataValue;

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

  return (
    <>
      <div className={style.LogIn}>
        <div className={style.LogInWrapper}>
          <div className={style.col1}></div>
          <div className={style.col2}>
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Recupere a sua senha!</h2>

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
                      placeholder="Digite o seu Email"
                      onChange={(e) =>
                        setFormDataValue((oldValue) => {
                          return { ...oldValue, email: e.target.value };
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Codigo de verificação:
                    <input
                      type="password"
                      name="password"
                      id="Codigo"
                      placeholder="Digite o codigo de verificação"
                      value={formDataValue.password}
                      
                      required
                    />
                  </label>
                  <label>
                    Nova Senha:
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Nova senha"
                      value={formDataValue.password}
                      onChange={(e) =>
                        setFormDataValue((oldValue) => {
                          return { ...oldValue, password: e.target.value };
                        })
                      }
                      required
                    />
                  </label>
                </div>
              </div>

              <button type="button" onClick={() => validateLogIn()}>
                Atualizar
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

export default RecoverPassword;
