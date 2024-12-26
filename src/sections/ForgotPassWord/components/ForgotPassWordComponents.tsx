import classnames from "classnames/bind";
import styles from "./ForgotPassWordComponents.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import user from "../../../assets/images/user.png";
import check from "../../../assets/images/Chield_check.png";
import image4 from "../../../assets/images/Return-Outline.svg";
import logoLogin from "../../../assets/images/image_main_login.jfif";

import {useFormik } from "formik";
import * as Yup from "yup";
import { Password } from "@mui/icons-material";
import Button from "../../../components/Button/Button";
import { useGlobalContextLoin } from "../../../layouts/useContext";
import { GenerateAuthCode } from "../../../utils/Generate-auth-code";
import { useAppDispatch } from "../../../redux/store";
import {
  SendAuthOtpAction,
  updateOtpState,
} from "../../../redux/AuthenticationSlice/AuthenticationSlice";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";

const cx = classnames.bind(styles);

// Tạo schema kiểm tra với Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email address is not valid.")
    .required("Email is required."),
  confirm: Yup.string(),

  captcha: Yup.string(),
});

const LoginComponents = () => {
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);
  const randomString = () => Math.random().toString(36).slice(2, 6); // Tạo mã captcha
  const [captcha, setCaptcha] = useState(randomString()); //useState macaptcha
  const { clickForgotPass, setClickLogin } = useGlobalContextLoin();
  const [otp, setOtp] = useState("");
  const [otpExpires, setOtpExpires] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCountdown, setIsCountdown] = useState(false);
  const [loading,setLoading]= useState(false);

  const refreshString = () => {
    //hàm refresh mã captcha
    setCaptcha(Math.random().toString(36).slice(2, 6));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      confirm: "",
      captcha: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(otp===""&& values.email && values.confirm==="" && values.captcha ===""){
        setEmail(values.email);
        setLoading(true)
        await GenerateOTP();
      }else{
        let isCheckError = false;
        if(values.confirm==""){
          formik.errors.confirm="OTP Required";
          isCheckError = true;
        }
        if(values.captcha!=captcha){
          formik.errors.captcha="Captcha incorrect"
          isCheckError= true;
        }
        if(isCheckError) return;

        setTimeout(() => {
          navigate("/new-password");
          toast.success("Validation Success");
        }, 600);
      }
    },
  });

  const navigate = useNavigate();
  const handleOnClickForgot = () => {
    //hàm onclick để chuyển đến trang đăng nhập
    setTimeout(() => {
      navigate("/login");
      setClickLogin(true);
    }, 600);
  };

  const GenerateOTP = async () => {
    const otpString = GenerateAuthCode();
    const dateGenerate = new Date();
    dateGenerate.setMinutes(dateGenerate.getMinutes() + 5);
    setOtpExpires(dateGenerate);
    setOtp(otpString);
  };

  useEffect(() => {
    const sentEmail = async () => {
      if (otp !== "" && form.current && email!=="") {
        const payload = {
          otp: otp,
          otpExpires: otpExpires?.toISOString(),
        };
        const data = {
          otp: otp,
          email: email,
        };
        Promise.all([dispatch(updateOtpState(payload)),dispatch(SendAuthOtpAction(data))]);
        sessionStorage.setItem('email', email.toLowerCase());
        sessionStorage.setItem('otp', otp);
        if(payload.otpExpires) sessionStorage.setItem('otpExpires', payload.otpExpires);
        await emailjs
              .sendForm("service_098shcs","template_vp368y6",form.current,{
                publicKey: "qhD4YtB2w9gQKNXa_"
              })
              .then(()=>{
                setIsCountdown(true);
                setLoading(false);
                console.log("Email sent successfully!");
              },
            (error)=>{
              console.error("Failed to send email", error);
            })
      }
    };
    sentEmail();
  }, [dispatch, email, otp, otpExpires]);

  useEffect(()=>{
    if(isCountdown){
      if(timeLeft>0){
        const timer = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      }else{
        setIsCountdown(false);
        setTimeLeft(60);
        dispatch(updateOtpState({otp: null,otpExpires: null}))
        setOtp("");
        setOtpExpires(null);
      }
    }
  },[dispatch, isCountdown, timeLeft]);

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
          <form
            onSubmit={formik.handleSubmit}
            ref={form}
            className={cx("form-login-main")}
          >
            <h3>QUÊN MẬT KHẨU</h3>
            <div className={cx("main-border")}></div>
            <div className={cx("main-body")}>
              <div className={cx("body-list")}>
                <div className={cx("list-item", "list-user")}>
                  <div className={cx("list-user-item")}>
                    <img src={user} alt="user" />
                    <TextField
                      id="email"
                      type="text"
                      name="email"
                      value={formik.values.email.toLowerCase()}
                      onChange={formik.handleChange}
                      placeholder="Nhập email"
                      style={{ width: "100%" }}
                      variant="standard"
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("body-list")}>
                <div className={cx("list-item", "list-confirm")}>
                  <div className={cx("list-user-item")}>
                    <Password />
                    <TextField
                      type="text"
                      style={{ border: "none" }}
                      name="confirm"
                      placeholder="OTP"
                      value={formik.values.confirm}
                      onChange={formik.handleChange}
                      variant="standard"
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                      helperText={formik.touched.confirm && formik.errors.confirm}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  hidden
                  readOnly
                  value={otp}
                />
                <div className={cx("confirm-button", `${isCountdown && "active"}`)}>
                  {loading?<Loader height={12} />:(
                    <Button
                    paddingX={12}
                    paddingY={0}
                    fontSize={12}
                    text={isCountdown?"Gửi lại": "Gửi mã"}
                  />
                  )}
                  
                  {isCountdown && <span className={cx("time-left")}>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>}
                  

                </div>
              </div>
              <div className={cx("body-list", "body-list-check")}>
                <div className={cx("list-item", "list-check")}>
                  <div className={cx("list-check-item")}>
                    <img src={check} alt="check" />
                    <TextField
                      name="captcha"
                      placeholder="captcha"
                      variant="standard"
                      value={formik.values.captcha}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.captcha && Boolean(formik.errors.captcha)}
                      helperText={formik.touched.captcha && formik.errors.captcha}
                    />
                  </div>
                </div>
                <div className={cx("list-item", "list-reload")}>
                  <div>
                    <p>{captcha}</p>
                  </div>
                  <img src={image4} alt="image4" onClick={refreshString} />
                </div>
              </div>

              <div className={cx("body-button")}>
                <Button
                  paddingX={20}
                  paddingY={10}
                  fontSize={16}
                  text="Xác minh"
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
                  Quay lại đăng nhập
                </div>
                <div className={cx("password-line")}></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponents;
