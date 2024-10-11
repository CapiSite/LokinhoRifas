import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
import shield from "../../assets/checkmark.shield.svg";
import copynpaste from "../../assets/copynpaste.svg"
import leftarrow from "../../assets/arrowleft.svg"
import { useRouter } from "next/router";
import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "utils/interfaces";

declare global {
  interface Window {
    paymentBrickController?: {
      unmount: () => void;
    };
    MercadoPago: any;
  }
}

const PaymentBrick = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [price, setPrice] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [qrCode64, setQrCode64] = useState("");
  const [qrCode, setQrCode] = useState("");
  const router = useRouter();

  const { setShowPayment } = useUserStateContext() as UserContextType

  useEffect(() => {
    if(price == '') return
    let tempNum = price.split('R$ ')[1]
    tempNum = tempNum.replaceAll('.', '')
    setPriceValue(Number(tempNum.replace(',', '.')))
  }, [price])

  const { qrcode64, valueDiff, setQrcode64 } = useUserStateContext() as UserContextType

  const addStep = () => {
    setStep((oldValue) => oldValue + 1);
  };

  const removeStep = (number: number) => {
    setStep((oldValue) => oldValue - number);
  };
  
  useEffect(() => {
    if (valueDiff != 0) {
      setPrice(maskValue(valueDiff.toFixed(2).toString()));
    } else if (qrcode64 != '') {
      setStep(3)
      setQrCode64(qrcode64)
      setQrcode64('')
      // setQrCode(qrcodeReceived)
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      console.log("MercadoPago SDK loaded.");
      setSdkLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Simulação de obtenção do preferenceId (substitua por sua lógica real)
  useEffect(() => {
    if (step === 2) {
      // Simulação: definir um preferenceId fictício
      setPreferenceId("YOUR_PREFERENCE_ID");
      console.log("Preference ID set.");
    }
  }, [step]);

  // Renderize o Payment Brick
  useEffect(() => {
    if (!sdkLoaded || !preferenceId || step !== 2) {
      console.log(
        "SDK not loaded, preference ID not set, or step not correct."
      );
      return;
    }

    const renderPaymentBrick = async () => {
      console.log("Rendering Payment Brick...");

      const mp = new window.MercadoPago(
        process.env.NEXT_PUBLIC_PUBLIC_KEY,
        {
          locale: "pt-BR",
        }
      );

      const bricksBuilder = mp.bricks();
      const settings = {
        initialization: {
          preferenceId: preferenceId,
          amount: priceValue,
        },
        customization: {
          paymentMethods: {
            bankTransfer: "pix",
            maxInstallments: 1,
          },
          visual: {
            hideFormTitle: true,
            style: {
              theme: "default",
            },
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Payment Brick is ready.");
          },
          onSubmit: ({
            selectedPaymentMethod,
            formData,
          }: {
            selectedPaymentMethod: any;
            formData: any;
          }): Promise<void> => {
            console.log("Submitting payment data...");
            return new Promise((resolve, reject) => {
              fetch(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/payment`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log(response, selectedPaymentMethod);
                  if (selectedPaymentMethod != "bank_transfer") addStep();
                  addStep();
                  setQrCode(response.qrCode);
                  setQrCode64(response.qrCodeBase64);
                  resolve(response);
                })
                .catch((error) => {
                  console.log("Error encountered: ", error);
                  reject(error);
                });
            });
          },
          onError: (error: Error) => {
            console.error("Payment error:", error);
          },
        },
      };

      try {
        window.paymentBrickController = await bricksBuilder.create(
          "payment",
          "paymentBrick_container",
          settings
        );
        console.log("Payment Brick successfully created.");
      } catch (error) {
        console.error("Error creating Payment Brick:", error);
      }
    };

    renderPaymentBrick();

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
        console.log("Payment Brick unmounted.");
      }
    };
  }, [sdkLoaded, preferenceId, step]);

  const handleInputChange = () => {
    if (ref.current === null) return;

    const value = maskValue(ref.current.value)

    setPrice(value);
  }

  const maskValue = (value: number | string) => {
    
    let changedValue = value.toString().replace(/\D/g, ''); 

    changedValue = (Number(changedValue) / 100).toFixed(2); 
    changedValue = changedValue.replace(".", ","); 
    changedValue = changedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    changedValue = `R$ ${changedValue}`;

    return changedValue
  }

  const handleStepChange = () => {
    return `brickContent step-${step}-wrap`;
  };

  const handleCompletion = () => {
    router.reload();
    setShowPayment(false);
  };

  const handleClickCopynPaste = () => {
    navigator.clipboard.writeText(qrCode)
  }

  return (
    <div className="brick">
      <div className="brickWrapper">
        <div className={handleStepChange()}>
          <div className="step-1">
            <h2>Quanto de saldo gostaria de adicionar à sua conta?</h2>
            <input
              type='text' 
              name="value" 
              placeholder='R$ 0,00'
              ref={ref}
              value={price}
              onChange={handleInputChange}
              />
            <p>Min: R$ 10,00</p>
            {/* <button disabled={priceValue > 10000} onClick={addStep}> */}
            <button disabled={priceValue < 10 || priceValue > 10000} onClick={addStep}>
              Continuar
            </button>
            <p>Poderá voltar para alterar esse valor depois</p>
          </div>
          <div className="step-2">
            <div className="paymentWrapper">
              <div id="paymentBrick_container"></div>
            </div>
            <a onClick={() => removeStep(1)}><Image width={20} height={20} className="seta" src={leftarrow} alt="Voltar"/> Voltar</a>
          </div>
          <div className="step-3">
            <Image
              src={`data:image/png;base64,${qrCode64}`}
              width={160}
              height={160}
              alt="qrcode"
            />
            {qrCode != '' && 
            <label className="qrcodecopy">
              <input type="text" onClick={handleClickCopynPaste} value={qrCode} />
              <Image width={50} src={copynpaste} alt="pix copia e cola"/>
            </label>
            }

            <button onClick={addStep}>Terminou o pagamento?</button>
            <a onClick={() => removeStep(2)}><Image width={20} height={20} className="seta" src={leftarrow} alt="Voltar"/> Voltar</a>
          </div>
          <div className="step-4">
            <Image width={50} src={shield} alt="Ícone de confirmação" />
            <h2>Estamos processando o pagamento!</h2>
            <p>Já já estará disponível o novo saldo!</p>
            <button
              type="button"
              disabled={step != 4}
              onClick={() => handleCompletion()}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
      <div className="background" onClick={() => setShowPayment(false)}></div>
    </div>
  );
};

export default PaymentBrick;
