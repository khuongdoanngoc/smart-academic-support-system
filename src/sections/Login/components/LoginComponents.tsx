import styles from "./LoginComponents.module.scss";
import classnames from "classnames/bind";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";

import user from "../../../assets/images/user.png";
import unlock from "../../../assets/images/Unlock.png";
import check from "../../../assets/images/Chield_check.png";
import image4 from "../../../assets/images/Return-Outline.svg";
import logoLogin from "../../../assets/images/image_main_login.jfif";

import { ButtonSubmit } from "../../../components/Button/Button";
import { useGlobalContextLoin } from "../../../layouts/useContext";
import {
  LoginAction,
  loginFailure,
  loginStart,
} from "../../../redux/AuthenticationSlice/AuthenticationSlice";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
const cx = classnames.bind(styles);

interface informationLogin {
  titleHeader: string;
  titleUser: string;
  titlePass: string;
  titleConfirm: string;
  titleButton: string;
  titleNoRegister: string;
  titleForgot: string;
  titleRegister: string;
}

interface LoginData {
  email: string;
  password: string;
  captcha: string;
}
interface ILogin {
  email: string;
  password: string;
}
interface PopsInformation {
  pops: informationLogin[];
}
const validationSchema: Yup.ObjectSchema<LoginData> = Yup.object({
  // Tạo schema kiểm tra với Yup
  email: Yup.string().required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập password"),
  captcha: Yup.string().required("Vui lòng nhập mã xác nhận"),
});
const LoginComponents: React.FC<PopsInformation> = ({
  pops,
}: PopsInformation) => {
  const [typePass, setTypePass] = useState(false); //useState xem hoặc ẩn password
  const randomString = () => Math.random().toString(36).slice(2, 6); // Tạo mã captcha
  const [captcha, setCaptcha] = useState(randomString()); //useState macaptcha
  const navigate = useNavigate(); //navigate login
  const dispatch = useAppDispatch(); //dispatch login

  const { clickLogin, setClickForgotPass, setClickRegister } =
    useGlobalContextLoin(); //hiện ứng animation login
  const loading = useSelector(
    (state: RootState) => state.authentication.loading
  ); //loading login

  const refreshString = () => {
    //hàm refresh mã captcha
    setCaptcha(Math.random().toString(36).slice(2, 6));
  };
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang quên mật khẩu
    setTimeout(() => {
      navigate("/forgot-password");
      setClickForgotPass(true);
    }, 600);
  };
  const handleOnClickRegister = () => {
    //hàm onclick để chuyển đến trang quên mật khẩu
    setTimeout(() => {
      navigate("/register");
      setClickRegister(true);
    }, 600);
  };
  const handleTypePass = () => {
    // hàm ẩn hoặc hiện password
    setTypePass(!typePass);
  };

  const handleSubmit = async (
    //hàm submit login
    values: { email: string; password: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    resetForm();
    setSubmitting(true); //setSubmitting true
    refreshString(); // Reset lại form sau khi submit thành công
    try {
      dispatch(loginStart()); //dispatch loginStart
      const result = await dispatch(LoginAction(values)); //dispatch LoginAction
      const payload = result.payload as {
        username?: ILogin;
        accessToken?: string;
        refreshToken?: string;
        listRoles?: string[];
      };
      console.log(payload);
      
      if (!payload || !payload.accessToken) {
        toast.error("Email or password incorrect");
      } else {
        if(payload.listRoles && payload.listRoles.length > 0 && payload.listRoles[0]!=="ADMIN") {
          navigate("/document");
        }else{
          navigate("/admin/dashboard");
        }
      }
      console.log("Saved token:", localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className={cx("main-login")}>
        <div>
          <img src={logoLogin} alt="logo" />
        </div>
        <div className={cx("form-login", clickLogin && "login-animation")}>
          {pops.map((pop, index) => (
            <Formik
              key={index}
              initialValues={{ email: "", password: "", captcha: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={cx("form-login-main")} key={index}>
                  <h3>{pop.titleHeader}</h3>
                  <div className={cx("main-border")}></div>

                  <div className={cx("main-body")}>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-user")}>
                        <div className={cx("list-user-item")}>
                          <img src={user} alt="user" />
                          <Field
                            type="email"
                            name="email"
                            placeholder={pop.titleUser}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      <div className={cx("list-item")}></div>
                    </div>
                    <div className={cx("body-list", "body-list-unlock")}>
                      <div className={cx("list-item", "list-unlock")}>
                        <div className={cx("list-unlock-item")}>
                          <img src={unlock} alt="unlock" />
                          <Field
                            type={typePass ? "text" : "password"}
                            placeholder={pop.titlePass}
                            name="password"
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      <div
                        className={cx("list-item", "list-eye")}
                        onClick={handleTypePass}
                      >
                        {typePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </div>
                    </div>

                    <div className={cx("body-list", "body-list-check")}>
                      <div className={cx("list-item", "list-check")}>
                        <div className={cx("list-check-item")}>
                          <img src={check} alt="check" />
                          <Field
                            name="captcha"
                            placeholder={pop.titleConfirm}
                          />
                        </div>
                        <ErrorMessage
                          name="captcha"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      <div className={cx("list-item", "list-reload")}>
                        <div>
                          <p>{captcha}</p>
                        </div>
                        <img
                          src={image4}
                          alt="image4"
                          onClick={refreshString}
                        />
                      </div>
                    </div>
                    <div className={cx("body-button")}>
                      <ButtonSubmit
                        titleButton={pop.titleButton}
                        isSubmitting={isSubmitting}
                        padding={10}
                        fontsize={16}
                        borderRadius={10}
                        background={"#EB2930"}
                      />
                    </div>
                  </div>
                  <div className={cx("main-forgot")}>
                    <div className={cx("forgot-password")}>
                      <div className={cx("password-line")}></div>
                      <div
                        className={cx("password-title")}
                        onClick={handleOnClickForgot}
                      >
                        {pop.titleForgot}
                      </div>
                      <div className={cx("password-line")}></div>
                    </div>
                    <div className={cx("forgot-register")}>
                      <p className={cx("register-title")}>
                        {pop.titleNoRegister}
                      </p>
                      <p
                        className={cx("register-button")}
                        onClick={handleOnClickRegister}
                      >
                        {pop.titleRegister}
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ))}
        </div>
        {loading && <Loader height={100} />}
      </div>
    </>
  );
};

export default LoginComponents;
