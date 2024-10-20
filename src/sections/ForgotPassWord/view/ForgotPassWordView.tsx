import { ForgotPassWordComponents } from "../components";

const forgotBudgets = [
  {
    titleHeader: "QUÊN MẬT KHẨU",
    titleUser: "Nhập tên đăng nhập hoặc Gmail DTU của bạn",
    titleConfirm: "Nhập mã xác nhận",
    titleButtonAuthen: "Gửi mã",
    titleVerify: "Mã xác minh",
    titleButton: "Đặt lại mật khẩu",
    titleForgot: "Quay lại Đăng nhập",
  },
];
const ForgotPassWordView = () => {
  return (
    <>
      <ForgotPassWordComponents pops={forgotBudgets} />
    </>
  );
};

export default ForgotPassWordView;
