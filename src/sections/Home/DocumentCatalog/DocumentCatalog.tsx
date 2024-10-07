import styles from "./DocumentCatalog.module.scss";
import classnames from "classnames/bind";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Line from "../../../assets/images/homepage.line.png";
import { Catalog } from "./Catalog";
const cx = classnames.bind(styles);

export default function DocumentCatalog() {
    return (
        <div className={cx("document-catalog-wrapper")}>
            <img src={Line} alt="line" />
            <div className={cx("titles")}>
                <h3>
                    <AutoStoriesIcon /> DANH MỤC TÀI LIỆU
                </h3>
                <h1>Khám phá mục tài liệu bạn có thể xem</h1>

                <button className={cx("btn-showCatalogs")}>
                    XEM TẤT CẢ CÁC DANH MỤC
                </button>
            </div>
            <div className={cx("right-content")}>
                <div className={cx("catalogs")}>
                    <Catalog />
                    <Catalog />
                    <Catalog />
                </div>
            </div>
        </div>
    );
}
