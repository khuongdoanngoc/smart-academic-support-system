import classNames from "classnames/bind";
import styles from "./LibraryView.module.scss";
import { Sidebar } from "../Sidebar";
const cx = classNames.bind(styles);

export default function LibraryView() {
    return (
        <div className={cx("library-page")}>
            <Sidebar />
            <div className={cx("content")}>
                <img src="" alt="" />
                <div className={cx("popular")}></div>
                <div className={cx("subjects")}></div>
            </div>
        </div>
    );
}
