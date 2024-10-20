import { NewPasswordComponents } from "../components";

const forgotBudgets = [
  {
    titleHeader: "QUÊN MẬT KHẨU",
    titleNewPass: "Nhập mật khẩu mới",
    titleConfirmNewPass: "Nhập lại mật khẩu mới",
    titleButton: "Đặt lại mật khẩu",
    titleForgot: "Quay lại Đăng nhập",
  },
];
const NewPasswordView = () => {
  return (
    <>
      <NewPasswordComponents pops={forgotBudgets} />
    </>
  );
};

export default NewPasswordView;
