import styles from "./Introduction.module.scss";
import classnames from "classnames/bind";
import Background from "../../../assets/images/homepage.introduction.jpeg";
import ShapeBackground from "../../../assets/images/homepage.shape.png";
import HomeAvatar from "../../../assets/images/homepage.avatar.jpeg";
import Pattern from "../../../assets/images/homepage.pattern.png";
const cx = classnames.bind(styles);

export default function IntroductionSection() {
    return (
        <div className={cx("introduction-section")}>
            <div className={cx("background")}>
                <div className={cx("background-color-cover")}>
                    <img
                        className={cx("background-img")}
                        src={Background}
                        alt="bg"
                    />
                </div>
                <img
                    className={cx("background-shape")}
                    src={ShapeBackground}
                    alt="bg"
                />
                <img
                    className={cx("pattern-img")}
                    src={Pattern}
                    alt="pattern"
                />
            </div>
            <div className={cx("content-wrapper")}>
                <div className={cx("content")}>
                    <div className={cx("titles")}>
                        <h2>
                            TRƯỜNG ĐẠI HỌC <span>DUY TÂN</span>
                        </h2>
                        <div>
                            <h1>Trường Đại học tư thục</h1>
                            <h1>Đầu tiên</h1>
                            <h1>Tại miền Trung</h1>
                        </div>
                        <p>
                            Mang đến cho sinh viên một môi trường học tập hiện
                            đại và năng động.
                        </p>
                        <button>TÌM HIỂU THÊM</button>
                    </div>
                    <div className={cx("avatar")}>
                        <img src={HomeAvatar} alt="avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
}
