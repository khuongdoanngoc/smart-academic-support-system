import styles from "./RegisterComponents.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MailOutline,
  SensorOccupied,
} from "@mui/icons-material";
const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Địa chỉ email khong hợp lệ")
    .required("Vui lòng nhập email của bạn"),
  row: Yup.string().required("Vui lòng xác nhận bạn là ?"),
  password: Yup.string()
    .required("Vui lòng nhập password")
    .min(8, "Password phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Password phải chứa ít nhất 1 chữ cái viết hoa")
    .matches(/[0-9]/, "Password phải chứa ít nhất 1 số")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password phải chứa ít nhất 1 ký tự đặc biệt"
    ),

  confirmPass: Yup.string()
    .required("Vui lòng nhập lại password")
    .oneOf([Yup.ref("password")], "Password nhập lại không khớp"),
  captcha: Yup.string().required("Vui lòng nhập mã xác nhận"),
});

interface informationLogin {
  titleHeader: string;
  titleGmail: string;
  titleRow: string;
  titlePass: string;
  titleConfirmPass: string;
  titleConfirm: string;
  titleButton: string;
  titleNoRegister: string;
  titleRegister: string;
}
interface PopsInformation {
  pops: informationLogin[];
}

const REgisterComponents: React.FC<PopsInformation> = ({
  pops,
}: PopsInformation) => {
  const [typePass, setTypePass] = useState(false); //useState xem hoặc ẩn password
  const [typeConfirmPass, setTypeConfirmPass] = useState(false); //useState xem hoặc ẩn password

  const randomString = () => Math.random().toString(36).slice(2, 6); // Tạo mã captcha
  const [captcha, setCaptcha] = useState(randomString()); //useState macaptcha

  const [rowRegister, setRowRegister] = useState(false);
  const [valueRow, setValueRow] = useState("");
  const refreshString = () => {
    //hàm refresh mã captcha
    setCaptcha(Math.random().toString(36).slice(2, 6));
  };

  const navigate = useNavigate();
  const handleOnClickLogin = () => {
    //hàm onclick để chuyển đến trang login
    navigate("/login");
  };

  const handleTypePass = () => {
    // hàm ẩn hoặc hiện password
    setTypePass(!typePass);
  };
  const handleTypeConfirmPass = () => {
    // hàm ẩn hoặc hiện password
    setTypeConfirmPass(!typeConfirmPass);
  };

  const handleSubmit = (
    //hàm onclick kiểm tra username,password,captcha
    values: { password: string; confirmPass: string; captcha: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    console.log("Form submitted", values);

    // if (values.captcha !== captcha) {
    //   alert("Mã xác nhận không đúng");
    //   setCaptcha(randomString());
    // } else {
    //   alert("Đăng nhập thành công");

    //   setCaptcha(randomString()); // Làm mới mã captcha sau khi đăng nhập thành công

    //   resetForm(); // Reset lại form sau khi submit thành công
    // }
    if (values.password !== values.confirmPass) {
      alert("Mật khẩu xác nhận không đúng");
    } else {
      if (values.captcha === captcha) {
        alert("Đăng ký thành công");
        setCaptcha(randomString()); // Làm mới mã captcha sau khi đăng nhập thành công

        resetForm(); // Reset lại form sau khi submit thành công
      }
    }

    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

  const handleRowItem = () => {
    setRowRegister(!rowRegister);
  };
  // const handleValueItem = (value: string) => {
  //   setValueRow(value);
  //   setRowRegister(false);
  // };

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
        <div className={cx("form-login")}>
          {pops.map((pop, index) => (
            <Formik
              key={index}
              initialValues={{
                email: "",
                row: "",
                password: "",
                confirmPass: "",
                captcha: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                setFieldTouched,
                setFieldValue,
                validateField,
              }) => (
                <Form className={cx("form-login-main")} key={index}>
                  <h3>{pop.titleHeader}</h3>
                  <div className={cx("main-border")}></div>
                  <div className={cx("main-body")}>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-gmail")}>
                        <div className={cx("list-gmail-item")}>
                          <MailOutline />
                          <Field
                            type="text"
                            name="email"
                            placeholder={pop.titleGmail}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      {/* <div className={cx("list-item")}></div> */}
                    </div>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-row")}>
                        <div className={cx("list-row-item")}>
                          <SensorOccupied />
                          <Field
                            type="text"
                            name="row"
                            value={valueRow}
                            placeholder={pop.titleRow}
                          />
                        </div>
                        <ErrorMessage
                          name="row"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                      <div className={cx("list-row-button")}>
                        <div
                          className={cx("row-button-item")}
                          onClick={handleRowItem}
                        >
                          {rowRegister ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </div>
                      </div>
                      {rowRegister && (
                        <div className={cx("list-row-item")}>
                          <ul>
                            <li
                              onClick={() => {
                                const selectedValue = "Sinh Viên";
                                setFieldValue("row", selectedValue);
                                setFieldTouched("row", true);
                                setValueRow(selectedValue);
                                validateField("row"); // Kiểm tra lại trường "row"
                                setRowRegister(false);
                              }}
                            >
                              Sinh Viên
                            </li>
                            <li
                              // value="Sinh Viên"
                              onClick={() => {
                                const selectedValue = "Giảng Viên";
                                setFieldValue("row", selectedValue);
                                setFieldTouched("row", true);
                                setValueRow(selectedValue);
                                validateField("row"); // Kiểm tra lại trường "row"
                                setRowRegister(false);
                              }}
                            >
                              Giảng Viên
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* <div className={cx("list-item")}></div> */}
                    </div>

                    <div className={cx("body-list", "body-list-pass")}>
                      <div className={cx("list-item", "list-pass")}>
                        <div className={cx("list-pass-item")}>
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
                    <div className={cx("body-list", "body-list-cofirmpass")}>
                      <div className={cx("list-item", "list-pass")}>
                        <div className={cx("list-pass-item")}>
                          <img src={unlock} alt="unlock" />
                          <Field
                            type={typeConfirmPass ? "text" : "password"}
                            placeholder={pop.titleConfirmPass}
                            name="confirmPass"
                          />
                        </div>
                        <ErrorMessage
                          name="confirmPass"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>

                      <div
                        className={cx("list-item", "list-eye")}
                        onClick={handleTypeConfirmPass}
                      >
                        {typeConfirmPass ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
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
                    <div className={cx("forgot-register")}>
                      <p className={cx("register-title")}>
                        {pop.titleNoRegister}
                      </p>
                      <p
                        className={cx("register-button")}
                        onClick={handleOnClickLogin}
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

export default REgisterComponents;
