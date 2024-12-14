import classNames from "classnames/bind";
import styles from "./DocumentDetailView.module.scss";
import { Sidebar } from "../components/Sidebar";
import { Content } from "../components/Content";
const cx = classNames.bind(styles);

export default function DocumentDetailView() {
    return (
        <div className={cx("document-detail-view")}>
            <Sidebar />
            <Content />
        </div>
    );
}