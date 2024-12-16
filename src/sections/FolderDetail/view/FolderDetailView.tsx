import classNames from "classnames/bind";
import styles from "./FolderDetailView.module.scss";
const cx = classNames.bind(styles);
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditICON from "../../../assets/images/icons/Editicon2.png";
import DownICON from "../../../assets/images/icons/DownloadICON.png";
import ShareICON from "../../../assets/images/icons/ShareICON.png";
import { useState } from "react";
import { Button } from "../../../components/Button";
export default function FolderDetailView() {
    const [folderName, setFolderName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const handleEditFolder = () => {
        setIsUpdating(true);
    };

    const phase1Form = (
        <div className={cx("form")}>
            <div className={cx("item")}>
                <label>Tên thư mục</label>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Nhập tên thư mục"
                />
            </div>
            <div className={cx("item")}>
                <label>Mô tả</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập loại thư mục"
                />
            </div>
        </div>
    );

    return (
        <div className={cx("folder-detail-view")}>
            <div className={cx("header")}>
                <div className={cx("information")}>
                    <div className={cx("title")}>
                        DTUDOCUMENT / <span>TÀI LIỆU/ “TÊN THƯ MỤC”</span>
                    </div>
                    <div className={cx("content-container")}>
                        <FolderIcon
                            sx={{
                                width: "55px",
                                height: "55px",
                                color: "#E4504F",
                            }}
                        />
                        <div className={cx("content")}>
                            <h3>“Tên thư mục tài liệu..........”</h3>
                            <div className={cx("outstanding")}>
                                <div>
                                    <DescriptionOutlinedIcon />
                                    <span>123 tài liệu</span>
                                </div>
                                <div>
                                    <PersonOutlineOutlinedIcon />
                                    <span>Tên tác giả</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("functions")}>
                    <div className={cx("actions")}>
                        <Button
                            text="Chỉnh sửa"
                            paddingX={15}
                            paddingY={4}
                            fontSize={14}
                            onClick={handleEditFolder}
                        />
                        <Button
                            text="Xoá thư mục"
                            paddingX={15}
                            paddingY={4}
                            fontSize={14}
                        />
                    </div>
                    <div className={cx("search-container")}>
                        <input
                            type="text"
                            placeholder="Tìm tài liệu trong “Tên thư mục...”"
                        />
                        <SearchOutlinedIcon className={cx("search-icon")} />
                    </div>
                </div>
            </div>
            {!isUpdating ? (
                <div className={cx("body")}>
                    <h3>TÀI LIỆU TRONG THƯ MỤC : “TÊN THƯ MỤC”</h3>
                    <div className={cx("docs-list")}>
                        <div className={cx("list-head")}>
                            <h3>Tiêu đề tài liệu</h3>
                            <h3>Chức năng</h3>
                        </div>
                        <div className={cx("list-body")}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                                <div key={value} className={cx("doc")}>
                                    <div className={cx("doc-title")}>
                                        <DescriptionOutlinedIcon />
                                        Tiêu đề của tài liệu...Câu hỏi ôn tập -
                                        CDIO CMU-2024...
                                    </div>
                                    <div className={cx("actions")}>
                                        <button>
                                            <img src={DownICON} alt="down" />
                                        </button>
                                        <button>
                                            <img src={ShareICON} alt="share" />
                                        </button>
                                        <button>
                                            <img src={EditICON} alt="edit" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx("form-container")}>
                    {phase1Form}
                    <div className={cx("actions")}>
                        <button style={{ backgroundColor: "#827878" }}>
                            Quay lại
                        </button>
                        <button style={{ backgroundColor: "#62d07a" }}>
                            Xác nhận chỉnh sửa
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
