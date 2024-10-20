import LoginComponents from "../components/LoginComponents";

const homeBudgets = [
  {
    titleHeader: "ĐĂNG NHẬP",
    titleUser: "Tên đăng nhập",
    titlePass: "Mật khẩu",
    titleConfirm: "Mã xác nhận",
    titleButton: "Đăng nhập",
    titleForgot: "Quên mật khẩu ?",
    titleNoRegister: "Bạn chưa có tài khoản ?",
    titleRegister: "Đăng ký ngay",
  },
];

const LoginView = () => {
  return (
    <>
      <LoginComponents pops={homeBudgets} />
    </>
  );
};

export default LoginView;
