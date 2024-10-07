import classNames from "classnames/bind";
import styles from "./Head.module.scss";
const cx = classNames.bind(styles);
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LightIcon from "@mui/icons-material/Light";

export default function Head() {
    return (
        <div className={cx("aisection-head")}>
            <div>
                <TaskAltIcon sx={{ width: "50px", height: "50px" }} />
                <h3>
                    Các tài liệu đã được kiểm duyệt từ đội ngũ Admin và bot AI
                </h3>
            </div>
            <div>
                <FormatListNumberedIcon
                    sx={{ width: "50px", height: "50px" }}
                />
                <h3>
                    Các công cụ tìm kiếm chuyên dụng, giúp hỗ trợ tìm tài liệu
                    tốt hơn
                </h3>
            </div>
            <div>
                <LightIcon sx={{ width: "50px", height: "50px" }} />
                <h3>
                    Thiết kế công cụ dễ sử dụng, hỗ trợ việc học tập trở nên dễ
                    dàng hơn
                </h3>
            </div>
        </div>
    );
}
