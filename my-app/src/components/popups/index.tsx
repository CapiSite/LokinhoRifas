import defaultProfilePicture from "../../assets/defaultProfilePic.svg";
import { UserContextType } from "utils/interfaces";

import { RouletteProvider } from "contexts/RouletteContext";
import { useUserStateContext } from "contexts/UserContext";

import Budget from "./Budget";
import Settings from "./Settings";
import PaymentBrick from "./PaymentSteps";
import PopupBuy from "./BuyRaffle";
import NumberPicker from "./NumberPicker";

const PopUps = () => {
  const {
    userInfo,
    showBudget,
    showPayment,
    showSettings,
    showRafflePopup,
    showNumberPicker,
    image,
    setImage,
  } = useUserStateContext() as UserContextType;

  const { name, email, picture, tradeLink, phoneNumber } = userInfo;

  const profile = {
    name: name != "" ? name : "notloggedinuser",
    email: email != "" ? email : "notloggedinuser@gmail.com",
    tradeLink: tradeLink != "" ? tradeLink : "Sem Trade Link",
    phoneNumber: phoneNumber != "" ? phoneNumber : "Sem número cadastrado",
    picture:
      picture === "default"
        ? defaultProfilePicture
        : picture && picture.startsWith("https://static-cdn.jtvnw.net")
        ? picture
        : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`,
  };

  return (
    <>
      {showBudget && <Budget />}
      <RouletteProvider>
        {showPayment && <PaymentBrick />}
        {showRafflePopup && <PopupBuy />}
        {showNumberPicker && <NumberPicker />}
      </RouletteProvider>
      {showSettings && <Settings props={{ profile, image, setImage }} />}
    </>
  );
};

export default PopUps;
