import classNames from "classnames/bind";
import styles from "./SupportView.module.scss";
import { Banner } from "../Banner";
const cx = classNames.bind(styles);

export default function SupportView() {
    return (
        <div className={cx("support-view")}>
            <Banner />
        </div>
    );
}
