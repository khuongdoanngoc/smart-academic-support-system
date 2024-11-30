import classnames from "classnames/bind";
import styles from "./ForgotPassWordComponents.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import user from "../../../assets/images/user.png";
import check from "../../../assets/images/Chield_check.png";
import image4 from "../../../assets/images/Return-Outline.svg";
import logoLogin from "../../../assets/images/image_main_login.jfif";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Password } from "@mui/icons-material";
import { ButtonSubmit } from "../../../components/Button/Button";
import { useGlobalContextLoin } from "../../../layouts/useContext";

const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Địa chỉ email khong hợp lệ")
    .required("Vui lòng nhập tên người dùng"),
  confirm: Yup.string().required("Vui lòng nhập mã xác nhận"),

  captcha: Yup.string().required("Vui lòng nhập mã xác minh"),
});

interface informationLogin {
  titleHeader: string;
  titleUser: string;
  titleConfirm: string;
  titleButtonAuthen: string;
  titleVerify: string;
  titleButton: string;
  titleForgot: string;
}

interface PopsInformation {
  pops: informationLogin[];
}

const LoginComponents: React.FC<PopsInformation> = ({
  pops,
}: PopsInformation) => {
  const randomString = () => Math.random().toString(36).slice(2, 6); // Tạo mã captcha
  const [captcha, setCaptcha] = useState(randomString()); //useState macaptcha
  const { clickForgotPass, setClickLogin } = useGlobalContextLoin();
  const refreshString = () => {
    //hàm refresh mã captcha
    setCaptcha(Math.random().toString(36).slice(2, 6));
  };

  const navigate = useNavigate();
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang đăng nhập
    setTimeout(() => {
      navigate("/login");
      setClickLogin(true);
    }, 600);
  };

  const handleSubmit = (
    //hàm onclick kiểm tra email,captcha
    values: { email: string; confirm: string; captcha: string },
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
      alert("Đặt mặt thành công");

      setCaptcha(randomString()); // Làm mới mã captcha sau khi đăng nhập thành công

      resetForm(); // Reset lại form sau khi submit thành công
    }

    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

  return (
    <>
      <div className={cx("main-login")}>
        <div>
          <img src={logoLogin} alt="logo" />
        </div>
        <div
          className={cx(
            "form-login-pass",
            clickForgotPass && "forgot-animation"
          )}
        >
          {pops.map((pop, index) => (
            <Formik
              key={index}
              initialValues={{ email: "", confirm: "", captcha: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={cx("form-login-main")}>
                  <h3>{pop.titleHeader}</h3>
                  <div className={cx("main-border")}></div>
                  <div className={cx("main-body")}>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-user")}>
                        <div className={cx("list-user-item")}>
                          <img src={user} alt="user" />
                          <Field
                            type="text"
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
                    </div>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-confirm")}>
                        <div className={cx("list-user-item")}>
                          <Password />
                          <Field
                            type="text"
                            name="confirm"
                            placeholder={pop.titleConfirm}
                          />
                        </div>
                        <ErrorMessage
                          name="confirm"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      <div className={cx("confirm-button")}>
                        <ButtonSubmit
                          titleButton="Gửi mã"
                          isSubmitting
                          padding={0}
                          fontsize={12}
                          borderRadius={5}
                          background={"#EB2930"}
                        />
                      </div>

                      {/* <div className={cx("button-confirm")}></div> */}
                    </div>
                    <div className={cx("body-list", "body-list-check")}>
                      <div className={cx("list-item", "list-check")}>
                        <div className={cx("list-check-item")}>
                          <img src={check} alt="check" />
                          <Field name="captcha" placeholder={pop.titleVerify} />
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
                  <div className={cx("main-forgot-pass")}>
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
