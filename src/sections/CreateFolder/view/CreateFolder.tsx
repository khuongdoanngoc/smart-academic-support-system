import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import classNames from "classnames/bind";
import styles from "./CreateFolder.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Background from "../../../assets/images/create-folder-finisher.png";
import { useNavigate } from "react-router-dom";
export default function CreateFolder() {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSuccess(true);
    };

    const phase1Form = (
        <div className={cx("form")}>
            <div className={cx("item")}>
                <label>Tên thư mục</label>
                <input type="text" placeholder="Nhập tên thư mục" />
            </div>
            <div className={cx("item")}>
                <label>Mô tả</label>
                <textarea placeholder="Nhập loại thư mục" />
            </div>
        </div>
    );

    const finisher = (
        <div className={cx("finisher-container")}>
            <img src={Background} alt="bg" />
            <h2>
                Thư mục : <span>“Tiêu đề thư mục”</span> đã được tạo !
            </h2>
            <p>
                Thư mục của bạn đã được tạo, bạn có thể vào mục{" "}
                <a href="/document">Tài liệu của tôi</a> để xem và thêm tài liệu
                của bạn vào thư mục.
            </p>
            <button
                onClick={() => {
                    navigate("/document/uploadfile");
                }}>
                <DriveFolderUploadIcon /> Tải tài liệu lên thư mục
            </button>
            <a href="/document">Quay lại trang tài liệu</a>
        </div>
    );

    return (
        <div className={cx("create-folder-view")}>
            <h1>TẠO THƯ MỤC TÀI LIỆU CỦA BẠN</h1>
            <div className={cx("phases")}>
                <div className={cx("phase", "active")}>
                    <div className={cx("title")}>
                        <div>1</div>
                        <span>Tạo thư mục</span>
                    </div>
                    <div className={cx("line")}></div>
                </div>
                <div
                    className={cx("phase", {
                        active: isSuccess,
                    })}>
                    <div className={cx("title")}>
                        <div>2</div>
                        <span>Hoàn thành</span>
                    </div>
                    <div className={cx("line")}></div>
                </div>
            </div>
            {!isSuccess ? (
                <div className={cx("form-container")}>
                    {phase1Form}
                    <div className={cx("actions")}>
                        <button
                            onClick={handleSubmit}
                            className={cx("next-btn")}>
                            Hoàn thành
                            <ArrowForwardIcon />
                        </button>
                    </div>
                </div>
            ) : (
                finisher
            )}
        </div>
    );
}
