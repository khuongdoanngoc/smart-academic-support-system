import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
import FolderIcon from "@mui/icons-material/Folder";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Avatar from "../../../../assets/images/avatar.png";
import FlagIcon from "@mui/icons-material/Flag";
export default function Sidebar() {
    return (
        <div className={cx("sidebar")}>
            <h2>Thông tin tài liệu</h2>
            <h3>Câu hỏi ôn tập CDIO - CMU 2024</h3>
            <p>Môn học: CDIO 2</p>
            <div className={cx("category")}>
                <h3>
                    <FolderIcon /> Thư mục
                </h3>
                <a href="#">Tổng hợp tài liệu môn CDIO 2</a>
            </div>
            <div className={cx("category")}>
                <h3>
                    <SchoolIcon /> Chuyên ngành
                </h3>
                <a href="#">Công nghệ phần mềm CMU</a>
            </div>
            <hr />
            <div className={cx("category")}>
                <h3>
                    <CalendarMonthIcon /> Thời gian đăng tài liệu
                </h3>
                <span>24 / 10 / 2024</span>
            </div>
            <hr />
            <div className={cx("author")}>
                <h3>Tài liệu được đăng bởi:</h3>
                <div className={cx("author-detail")}>
                    <img src={Avatar} alt="avatar" />
                    <div className={cx("name")}>
                        <h3>Nguyễn Đăng Quang Huy</h3>
                        <span>Khoa Đào tạo Quốc tế CMU</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className={cx("comments")}>
                <h3>Bình luận</h3>
                <textarea name="comment"></textarea>
                <button>Gửi</button>
            </div>
            <hr />
            <div className={cx("category")}>
                <h3>
                    <FlagIcon /> Báo cáo tài liệu
                </h3>
            </div>
            <hr />
        </div>
    );
}
