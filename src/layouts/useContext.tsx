import { createContext, useContext } from "react";
// import { createContext } from "vm";
interface PropsLogin {
  isFormLogin: boolean;
  formLogin: boolean;
  isAnimationForm: boolean;
  clickLogin: boolean;
  clickRegister: boolean;
  clickForgotPass: boolean;
  setIsFormLogin: (visible: boolean) => void;
  setFormLogin: (visible: boolean) => void;
  setIsAnimationForm: (visible: boolean) => void;
  setClickLogin: (visible: boolean) => void;
  setClickRegister: (visible: boolean) => void;
  setClickForgotPass: (visible: boolean) => void;
}

export const formLoginContext = createContext<PropsLogin>({
  formLogin: false,
  isFormLogin: false,
  isAnimationForm: false,
  clickLogin: false,
  clickRegister: false,
  setIsFormLogin: () => {},
  setFormLogin: () => {},
  setIsAnimationForm: () => {},
  setClickLogin: () => {},
  setClickRegister: () => {},
  setClickForgotPass: () => {},
  clickForgotPass: false,
});

export const useGlobalContextLoin = () => useContext(formLoginContext);
