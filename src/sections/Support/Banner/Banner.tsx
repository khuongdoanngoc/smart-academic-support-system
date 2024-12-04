import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
const cx = classNames.bind(styles);

import Banner2 from "../../../assets/images/support.banner2.jpeg";
import Banner1 from "../../../assets/images/support.banner.png";
import { Button } from "../../../components/Button";

export default function Banner() {

    return (
        <div className={cx("support-banner")}>
            <div>
                <div className={cx("title")}>
                    <img src={Banner1} alt="banner1" />
                    <h2>Chào mừng bạn đến với trung tâm hỗ trợ DTU SP 24/7</h2>
                </div>
                <div className={cx("banner-form")}>
                    <input
                        type="text"
                        placeholder="Chúng tôi có thể giúp gì cho bạn ?"
                    />
                    <Button
                        text="Tìm ngay"
                        fontSize={16}
                        paddingX={35}
                        paddingY={10}
                    />
                </div>
            </div>
            <img src={Banner2} alt="" />
        </div>
    );
}
