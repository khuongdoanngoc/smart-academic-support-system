import classNames from "classnames/bind";
import styles from "./DocumentView.module.scss";
import { Sidebar } from "../Sidebar";
import { Content } from "../Content";
const cx = classNames.bind(styles);

export default function DocumentView() {
    return (
        <div className={cx("document-page")}>
            <Sidebar />
            <Content />
        </div>
    );
}
