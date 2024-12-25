import classNames from "classnames/bind";
import styles from "./AdminHomeView.module.scss";
const cx = classNames.bind(styles);
import { Statistics } from "../components/Statistics";
import Chart from "../components/Chart/Chart";

export default function AdminHomeView() {
    return (
        <div className={cx("admin-home-view")}>
            <Statistics />
            <Chart />
        </div>
    );
}
