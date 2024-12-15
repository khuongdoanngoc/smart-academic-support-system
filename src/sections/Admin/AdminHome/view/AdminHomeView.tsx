import classNames from "classnames/bind";
import styles from "./AdminHomeView.module.scss";
const cx = classNames.bind(styles);
import { Statistics } from "../components/Statistics";

export default function AdminHomeView() {
    return (
        <div className={cx("admin-home-view")}>
            <Statistics />
        </div>
    );
}
