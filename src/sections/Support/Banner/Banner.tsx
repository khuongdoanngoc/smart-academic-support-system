import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
const cx = classNames.bind(styles);

export default function Banner() {
    return (
        <div className={cx('support-banner')}>
            <div className=""></div>
        </div>
    );
}
