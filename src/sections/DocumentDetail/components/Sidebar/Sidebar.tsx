import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
import FolderIcon from "@mui/icons-material/Folder";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Avatar from "../../../../assets/images/Frame 8720.png";
import FlagIcon from "@mui/icons-material/Flag";
import { formatDate } from "../../../../utils/formatDate";
import { toast } from "react-toastify";

interface IDoc {
    doc: {
        authorName: string;
        createdAt: string;
        docId: number;
        facultyName: string;
        filePath: string;
        folderName: string | null;
        subjectName: string;
        title: string;
        profilePicture: string | null;
    };
}

export default function Sidebar({ doc }: IDoc) {

    return (
        <div className={cx("sidebar")}>
            <h2>Thông tin tài liệu</h2>
            <h3>{doc?.title}</h3>
            <p>Môn học: {doc?.subjectName}</p>
            <div className={cx("category")}>
                <h3>
                    <FolderIcon /> Thư mục
                </h3>
                <a href="#">{doc?.folderName}</a>
            </div>
            <div className={cx("category")}>
                <h3>
                    <SchoolIcon /> Chuyên ngành
                </h3>
                <a href="#">{doc?.facultyName}</a>
            </div>
            <hr />
            <div className={cx("category")}>
                <h3>
                    <CalendarMonthIcon /> Thời gian đăng tài liệu
                </h3>

                <span>{formatDate(doc?.createdAt)}</span>
            </div>
            <hr />
            <div className={cx("author")}>
                <h3>Tài liệu được đăng bởi:</h3>
                <div className={cx("author-detail")}>
                    <img src={doc?.profilePicture ? doc.profilePicture : Avatar} alt="avatar" />
                    <div className={cx("name")}>
                        <h3>{doc?.authorName}</h3>
                        <span>Khoa {doc?.facultyName}</span>
                    </div>
                </div>
            </div>
            <hr />

            <div className={cx("category")}>
                <h3
                    onClick={() =>
                        toast("🦄 Coming soon!", {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }>
                    <FlagIcon /> Báo cáo tài liệu
                </h3>
            </div>
            <hr />
        </div>
    );
}
