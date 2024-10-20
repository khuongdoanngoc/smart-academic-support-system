import classNames from "classnames/bind";
import styles from "./FooterComponent.module.scss";
import logoDtu from "../../../assets/images/97d9dfefafe8c066d1de2977ce16f9b9.png";
import iconFooter from "../../../assets/images/58a832cde7388cbc714d6cf00f961eee.png";
const cx = classNames.bind(styles);

const FooterComponent = () => {
  return (
    <div className={cx("footer-component")}>
      <div className={cx("footer-component-main")}>
        <div className={cx("component-main-left")}>
          <img src={logoDtu} alt="logo" />
        </div>
        <div className={cx("component-main-right")}>
          <div className={cx("icon-right-top")}>
            <img src={iconFooter} alt="logo" />
          </div>
          <div className={cx("main-right-information")}>
            <p>
              Đào tạo, nghiên cứu gắn liền với khoa học và công nghệ nhằm tạo ra
              những sinh viên và học viên có lòng yêu nước, có phẩm chất Nhân
              văn mang đậm bản sắc Việt Nam, có ý thức sinh hoạt cộng đồng, có
              sức khỏe, tự tin, năng động, sáng tạo, có năng lực và kỹ năng toàn
              diện để trở thành công dân toàn cầu.
            </p>
          </div>
          <div className={cx("icon-right-bottom")}>
            <img src={iconFooter} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
