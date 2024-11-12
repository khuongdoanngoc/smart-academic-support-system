import styles from "./Layout.module.scss";
import classnames from "classnames/bind";
// import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { Footer } from "./footer";
import { useState } from "react";
import { formLoginContext } from "./useContext";
const cx = classnames.bind(styles);

interface PropsType {
  children: React.ReactNode;
}

export default function Layout(props: PropsType) {
  const [isFormLogin, setIsFormLogin] = useState(false);
  const [formLogin, setFormLogin] = useState(false);
  const [isAnimationForm, setIsAnimationForm] = useState(false);
  const [clickLogin, setClickLogin] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [clickForgotPass, setClickForgotPass] = useState(false);

  return (
    <div className={cx("layout-wrapper")}>
      <formLoginContext.Provider
        value={{
          isFormLogin,
          setIsFormLogin,
          formLogin,
          setFormLogin,
          isAnimationForm,
          setIsAnimationForm,
          clickLogin,
          setClickLogin,
          clickRegister,
          setClickRegister,
          clickForgotPass,
          setClickForgotPass,
        }}
      >
        <Header />
        <Main>{props.children}</Main>
        <Footer />
      </formLoginContext.Provider>
    </div>
  );
}
