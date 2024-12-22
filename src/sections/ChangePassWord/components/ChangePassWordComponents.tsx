import { Formik, Form, Field, ErrorMessage } from "formik";
import { ButtonSubmit } from "../../../components/Button/Button";
import styles from "./ChangePassWordComponents.module.scss";
import classNames from "classnames/bind";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/store";
import { ChangePasswordAction } from "../../../redux/AuthenticationSlice/AuthenticationSlice";

const cx = classNames.bind(styles);

const validationSchema = Yup.object({
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  newpassword: Yup.string()
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
    .oneOf([Yup.ref("newpassword")], "Password nhập lại không khớp"),
  checkPass: Yup.boolean().oneOf([true], "Vui lòng xác nhận đổi mật khẩu"),
});

const ChangePassWordViewComponents = () => {
  const dispath = useAppDispatch();
  const handleSubmit = (
    //hàm onclick kiểm tra email,captcha
    _values: { password: string; newpassword: string; confirmPass: string },
    {
      setSubmitting,
      resetForm,
    }: // resetForm,
    { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    const data = {
      newPassword: _values.newpassword,
      oldPassword: _values.password,
    };

    dispath(ChangePasswordAction(data));
    resetForm();
    setSubmitting(false); // Đặt lại isSubmitting để nút submit hoạt động lại
  };

  return (
    <div className={cx("change-password")}>
      <Formik
        initialValues={{
          password: "",
          newpassword: "",
          confirmPass: "",
          checkPass: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={cx("change-password-main")}>
            <div className={cx("password-main-header")}>
              <h3>THAY ĐỔI MẬT KHẨU</h3>
            </div>
            <div className={cx("password-main-body")}>
              <div className={cx("main-body-list")}>
                <div className={cx("body-list-title")}>
                  <h4>Mật khẩu</h4>
                </div>
                <div className={cx("body-list-input")}>
                  <div className={cx("list-input-old")}>
                    <div className={cx("input-old-item")}>
                      <label>Nhập lại mật khẩu cũ</label>
                      <Field type="password" name="password" />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={cx("error-message")}
                    />
                  </div>
                  <div className={cx("list-input-new")}>
                    <div className={cx("input-new-item")}>
                      <label>Nhập mật khẩu mới</label>
                      <Field type="password" name="newpassword" />
                    </div>
                    <ErrorMessage
                      name="newpassword"
                      component="div"
                      className={cx("error-message")}
                    />
                  </div>
                  <div className={cx("list-input-re")}>
                    <div className={cx("input-old-item")}>
                      <label>Nhập lại mật khẩu mới</label>
                      <Field type="password" name="confirmPass" />
                    </div>
                    <ErrorMessage
                      name="confirmPass"
                      component="div"
                      className={cx("error-message")}
                    />
                  </div>
                  <div className={cx("list-input-check")}>
                    <div className={cx("input-check-item")}>
                      <Field type="checkbox" name="checkPass" />
                      <label>Xác nhận đổi mật khẩu</label>
                    </div>
                    <ErrorMessage
                      name="checkPass"
                      component="div"
                      className={cx("error-message")}
                    />
                  </div>
                </div>
                <div className={cx("body-individual-submit")}>
                  <ButtonSubmit
                    titleButton="Đổi mật khẩu"
                    isSubmitting={isSubmitting}
                    padding={10}
                    fontsize={16}
                    borderRadius={20}
                    background={"#0A75E6"}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassWordViewComponents;
