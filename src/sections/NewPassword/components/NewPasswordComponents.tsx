import classnames from "classnames/bind";
import styles from "./NewPasswordComponents.module.scss";
import { useNavigate } from "react-router-dom";

import logoLogin from "../../../assets/images/image_main_login.jfif";
// import HeaderTop from "../../../layouts/header/HeaderTop/HeaderTop";
// import { HeaderCenter } from "../../../layouts/header/HeaderCenter";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Key } from "@mui/icons-material";
import { ButtonSubmit } from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { UpdatePasswordAction } from "../../../redux/AuthenticationSlice/AuthenticationSlice";

const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup
const validationSchema = Yup.object({
  password: Yup.string()
    .required("New password is required.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least 1 capital letter.")
    .matches(/[0-9]/, "Password must contain at least 1 number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least 1 special character."
    ),

  confirmPass: Yup.string()
    .required("Confirm Password required. ")
    .oneOf([Yup.ref("password")], "Confirm password not match."),
});

const NewPasswordComponents = () => {
  const dispatch= useAppDispatch();
  //useState macaptcha
  const [email,setEmail]= useState("");
  const [otp, setOtp]= useState("");

  const navigate = useNavigate();
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang đăng nhập
    navigate("/login");
  };

  const handleSubmit = (
    values: { password: string; confirmPass: string },
    {
      setSubmitting,
      resetForm,
    }: // resetForm,
    { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {

    const data= {
      password: values.password,
      email: email,
      otp: otp,
    }
    dispatch(UpdatePasswordAction(data));
    
    resetForm(); // Reset lại form sau khi submit thành công

    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

  useEffect(()=>{
    const email= sessionStorage.getItem("email");
    const otp= sessionStorage.getItem("otp");
    if(email) setEmail(email);
    if(otp) setOtp(otp);
  },[]);

  return (
    <>
      <div className={cx("main-login")}>
        <div>
          <img src={logoLogin} alt="logo" />
        </div>
        <div className={cx("form-login-pass")}>
            <Formik
              initialValues={{ password: "", confirmPass: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={cx("form-login-main")}>
                  <h3>Forgot Password</h3>
                  <div className={cx("main-border")}></div>
                  <div className={cx("main-body")}>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-user")}>
                        <div className={cx("list-user-item")}>
                          <Key />
                          <Field
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                    </div>
                    <div className={cx("body-list")}>
                      <div className={cx("list-item", "list-user")}>
                        <div className={cx("list-user-item")}>
                          <Key />
                          <Field
                            type="password"
                            name="confirmPass"
                            placeholder="Enter confirmation password"
                          />
                        </div>
                        <ErrorMessage
                          name="confirmPass"
                          component="div"
                          className={cx("error-message")}
                        />
                      </div>
                    </div>
                    <div className={cx("body-button")}>
                      <ButtonSubmit
                        titleButton="Reset password"
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
                        Back to login
                      </div>
                      <div className={cx("password-line")}></div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
        </div>
      </div>
    </>
  );
};

export default NewPasswordComponents;
