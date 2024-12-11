import classnames from "classnames/bind";
import styles from "./NewPasswordComponents.module.scss";
import { useNavigate } from "react-router-dom";

import logoLogin from "../../../assets/images/image_main_login.jfif";
import HeaderTop from "../../../layouts/header/HeaderTop/HeaderTop";
import { HeaderCenter } from "../../../layouts/header/HeaderCenter";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Button } from "../../../components/Button";
import { Key } from "@mui/icons-material";
import { ButtonSubmit } from "../../../components/Button/Button";

const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup
const validationSchema = Yup.object({
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
});

interface informationLogin {
  titleHeader: string;
  titleNewPass: string;
  titleConfirmNewPass: string;
  titleButton: string;
  titleForgot: string;
}

interface PopsInformation {
  pops: informationLogin[];
}

const NewPasswordComponents: React.FC<PopsInformation> = ({
  pops,
}: PopsInformation) => {
  //useState macaptcha

  const navigate = useNavigate();
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang đăng nhập
    navigate("/login");
  };

  const handleSubmit = (
    //hàm onclick kiểm tra email,captcha
    values: { password: string; confirmPass: string },
    {
      setSubmitting,
      resetForm,
    }: // resetForm,
    { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    console.log("Form submitted", values);

    if (values.password !== values.confirmPass) {
      alert("Mã mật khẩu xác nhận không đúng");
    } else {
      // alert("Đăng nhập thành công");

      // navigate("/login", {
      //   state: { message: "Mật khẩu đã được thay đổi, vui lòng đăng nhập" },
      // });
      sessionStorage.setItem(
        "passwordChangedMessage",
        "Mật khẩu đã được thay đổi, vui lòng đăng nhập"
      );
      navigate("/login");
    }
    resetForm(); // Reset lại form sau khi submit thành công

    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

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
        <div className={cx("form-login-pass")}>
          {pops.map((pop, index) => (
            <Formik
              key={index}
              initialValues={{ password: "", confirmPass: "" }}
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
                          <Key />
                          <Field
                            type="password"
                            name="password"
                            placeholder={pop.titleNewPass}
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
                            placeholder={pop.titleNewPass}
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
                        titleButton={pop.titleButton}
                        isSubmitting={isSubmitting}
                        padding={10}
                        fontsize={16}
                        borderRadius={10}
                        background={"red"}
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

export default NewPasswordComponents;
