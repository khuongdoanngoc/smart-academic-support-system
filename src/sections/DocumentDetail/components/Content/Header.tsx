import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShortcutIcon from "@mui/icons-material/Shortcut";
export default function Header() {
    return (
        <div className={cx("document-detail-header")}>
            <button>
                <CloudDownloadIcon /> Tải xuống
            </button>
            <div className={cx("actions")}>
                <button>
                    <BookmarkBorderIcon /> Lưu
                </button>
                <button>
                    <ShortcutIcon /> Chia sẻ
                </button>
            </div>
        </div>
    );
}
