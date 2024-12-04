import { RegisterComponents } from "../components";

const homeBudgets = [
  {
    titleHeader: "ĐĂNG KÝ",
    titleGmail: "Nhập gmail của bạn",
    titleRow: "Bạn là ...?",
    titlePass: "Nhập mật khẩu",
    titleconfirmPassword: "Nhập lại mật khẩu",
    titleConfirm: "Mã xác nhận",
    titleButton: "Đăng Ký",
    titleNoRegister: "Bạn đã có tài khoản",
    titleRegister: "Đăng nhập ngay",
  },
];

const RegisterView = () => {
  return (
    <>
      <RegisterComponents pops={homeBudgets} />
    </>
  );
};

export default RegisterView;
