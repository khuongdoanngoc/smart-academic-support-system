import classNames from "classnames/bind";
import styles from "./LibraryView.module.scss";
const cx = classNames.bind(styles);

export default function LibraryView() {
    return (
        <div className={cx("library-page")}>
            <h1>content</h1>
        </div>
    );
}
