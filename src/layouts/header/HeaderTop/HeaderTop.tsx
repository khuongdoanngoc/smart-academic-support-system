import styles from "./HeaderTop.module.scss";
import classnames from "classnames/bind";
import VietnameseIcon from "../../../assets/images/vietnamese.icon.png";
import Avatar from "../../../assets/images/avatar.png";
import logoLogin from "../../../assets/images/user-single-neutral-male--close-geometric-human-person-single-up-user-male.png";
import logoGoogle from "../../../assets/images/Social Icons.png";
import logoRegister from "../../../assets/images/waving-hand.png";

import { useGlobalContextLoin } from "../../useContext";
import { useNavigate } from "react-router-dom";
const cx = classnames.bind(styles);

const HeaderTop = () => {
  const {
    setIsFormLogin,
    setFormLogin,
    formLogin,
    isAnimationForm,
    isFormLogin,
    setIsAnimationForm,
    setClickLogin,
    setClickRegister,
  } = useGlobalContextLoin();
  const navigate = useNavigate();

  const handleFormLogin = () => {
    if (isFormLogin === true && formLogin === true) {
      setTimeout(() => {
        setIsAnimationForm(true);
        setTimeout(() => {
          setFormLogin(false);
          setIsFormLogin(false);
        }, 1200);
      }, 100);
    }
    if (isFormLogin === false && formLogin === false) {
      setFormLogin(true);
      setIsAnimationForm(false);
      setIsFormLogin(true);
    }
  };
  const addClickHandlerLogin = () => {
    setTimeout(() => {
      navigate("/login");
      setClickLogin(true);
    }, 1500);
  };
  const addClickHandlerRegister = () => {
    setTimeout(() => {
      navigate("/register");
      setClickRegister(true);
    }, 1500);
  };
  const combinedClickHandlerLogin = () => {
    handleFormLogin();
    addClickHandlerLogin();
  };
  const combinedClickHandlerRegister = () => {
    handleFormLogin();
    addClickHandlerRegister();
  };

  return (
    <div className={cx("header-top")}>
      <a href="/">
        <h1 className={cx("logo")}>
          DT<span>FOR</span>YOU
        </h1>
      </a>
      <div className={cx("items")}>
        <div className={cx("language")}>
          <img src={VietnameseIcon} alt="" />
          <h3>Vietnamese</h3>
        </div>
        <button onClick={handleFormLogin}>SIGN-IN</button>

        <a href="#avatar">
          <img src={Avatar} alt="avatar" />
        </a>
      </div>
      {formLogin && (
        <div className={cx("form-login", isAnimationForm && "home-animation")}>
          <div className={cx("form-login-main")}>
            <div className={cx("login-main-header")}>
              <div>
                <h1>Chào mừng đến với DTFORYOU</h1>
                <p>
                  Đăng nhập để truy cập tài nguyên của trường đại học Duy Tân
                </p>
              </div>
            </div>
            <div className={cx("login-main-button")}>
              <div onClick={combinedClickHandlerLogin}>
                <div className={cx("main-button-google", "button")}>
                  <img src={logoLogin} alt="logo google" />
                  <span>Đăng nhập bằng tài khoản, mật khẩu </span>
                </div>
              </div>

              <div>
                <div className={cx("main-button-login", "button")}>
                  <img src={logoGoogle} alt="logo login" />
                  <span>Đăng nhập với Google</span>
                </div>
              </div>
              <div className={cx("main-button-list")}>
                <div></div>
                <span>Bạn chưa có tài khoản ?</span>
                <div></div>
              </div>
              <div onClick={combinedClickHandlerRegister}>
                <div className={cx("main-button-register", "button")}>
                  <img src={logoRegister} alt="logo register" />
                  <span>Đăng ký ở đây !</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeaderTop;
