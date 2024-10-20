import styles from "./LoginComponents.module.scss";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import user from "../../../assets/images/user.png";
import unlock from "../../../assets/images/Unlock.png";
import check from "../../../assets/images/Chield_check.png";
import image4 from "../../../assets/images/Return-Outline.svg";
import logoLogin from "../../../assets/images/image_main_login.jfif";
import HeaderTop from "../../../layouts/header/HeaderTop/HeaderTop";
import { HeaderCenter } from "../../../layouts/header/HeaderCenter";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Button";
const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup

const validationSchema = Yup.object({
  username: Yup.string().required("Vui lòng nhập username"),
  password: Yup.string().required("Vui lòng nhập password"),
  captcha: Yup.string().required("Vui lòng nhập mã xác nhận"),
});

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
interface PopsInformation {
  pops: informationLogin[];
}

const LoginComponents: React.FC<PopsInformation> = ({
  pops,
}: PopsInformation) => {
  const [typePass, setTypePass] = useState(false); //useState xem hoặc ẩn password

  const randomString = () => Math.random().toString(36).slice(2, 6); // Tạo mã captcha
  const [captcha, setCaptcha] = useState(randomString()); //useState macaptcha

  const refreshString = () => {
    //hàm refresh mã captcha
    setCaptcha(Math.random().toString(36).slice(2, 6));
  };

  const navigate = useNavigate();
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang quên mật khẩu
    navigate("/forgotpass");
  };
  const handleOnClickRegister = () => {
    //hàm onclick để chuyển đến trang quên mật khẩu
    navigate("/register");
  };

  const handleTypePass = () => {
    // hàm ẩn hoặc hiện password
    setTypePass(!typePass);
  };

  const handleSubmit = (
    //hàm onclick kiểm tra username,password,captcha
    values: { username: string; password: string; captcha: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    console.log("Form submitted", values);

    if (values.captcha !== captcha) {
      alert("Mã xác nhận không đúng");
      setCaptcha(randomString()); // Làm mới mã captcha sau khi đăng nhập thành công
    } else {
      alert("Đăng nhập thành công");

      setCaptcha(randomString()); // Làm mới mã captcha sau khi đăng nhập thành công

      resetForm(); // Reset lại form sau khi submit thành công
    }

    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

  // const location = useLocation();
  // const message = location.state?.message || "";
  // useEffect(() => {
  //   if (location.state?.message) {
  //     // Sử dụng setTimeout để đảm bảo thông báo hiển thị trước khi reset state
  //     setTimeout(() => {
  //       navigate("/login", { replace: true, state: {} });
  //     }, 100); // Đợi 100ms trước khi reset state
  //   }
  // }, [location.state, navigate]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Lấy message từ sessionStorage khi trang đăng nhập load
    const storedMessage = sessionStorage.getItem("passwordChangedMessage");
    console.log("Stored message:", storedMessage);

    if (storedMessage) {
      console.log("Message exists, setting state");
      setMessage(storedMessage);

      // Xóa message sau khi hiển thị để tránh hiện lại khi reload trang
      // sessionStorage.removeItem("passwordChangedMessage");
      const timer = setTimeout(() => {
        console.log("Clearing message after 5 seconds");

        setMessage(""); // Xóa thông báo sau 5 giây
        console.log("thoi gian");
      }, 5000);

      // Cleanup để tránh lỗi khi component bị unmount trước khi timeout kết thúc
      return () => {
        clearTimeout(timer);
        console.log(2);
      };
    }
  }, []);

  return (
    <>
      <div className="header-login">
        <HeaderTop />
        <HeaderCenter />
      </div>
      <div className={cx("main-login")}>
        <div>
          <img src={logoLogin} alt="logo" />
        </div>
        <div
          className={cx("form-login")}
          style={message ? { width: "534px" } : { width: "500px" }}
        >
          {pops.map((pop, index) => (
            <Formik
              key={index}
              initialValues={{ username: "", password: "", captcha: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={cx("form-login-main")} key={index}>
                  <h3>{pop.titleHeader}</h3>
                  <div className={cx("main-border")}></div>
                  {message && (
                    <div className={cx("login-main-message")}>
                      <p>{message}</p>
                    </div>
                  )}
                  <div className={cx("main-body")}>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-user")}>
                        <div className={cx("list-user-item")}>
                          <img src={user} alt="user" />
                          <Field
                            type="text"
                            name="username"
                            placeholder={pop.titleUser}
                          />
                        </div>
                        <ErrorMessage
                          name="username"
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
                      <Button
                        titleButton={pop.titleButton}
                        isSubmitting={isSubmitting}
                        padding={10}
                        fontsize={16}
                        borderRadius={10}
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
      </div>
    </>
  );
};

export default LoginComponents;
