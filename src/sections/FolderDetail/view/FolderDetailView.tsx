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
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
    getFolderById,
    updateFolder,
} from "../../../redux/FolderSlice/folderSlice";
import { toast } from "react-toastify";

const filterDocuments = (docs: any[] | undefined, searchValue: string) => {
    if (!docs) return [];
    return docs.filter((doc) => {
        if (searchValue !== "") {
            return doc.title
                .toLowerCase()
                .startsWith(searchValue.toLowerCase());
        } else {
            return doc;
        }
    });
};

export default function FolderDetailView() {
    const { id }: any = useParams();
    const [folderName, setFolderName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const data: any = useAppSelector((state) => state.folder.data);
    const error: any = useAppSelector((state) => state.folder.error);

    const dispatch = useAppDispatch();

    const handleEditFolder = () => {
        setIsUpdating(true);
    };

    useEffect(() => {
        dispatch(getFolderById(parseInt(id)));
    }, []);

    useEffect(() => {
        setFolderName(data.folderName);
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error("Xảy ra lỗi trong quá trình cập nhật");
        }
    }, [error]);

    const [filterDoc, setFilterDoc] = useState<string>("");

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
                    placeholder="Nhập mô tả thư mục"
                />
            </div>
        </div>
    );

    const handleUpdateFolder = (e: any) => {
        e.preventDefault();
        dispatch(updateFolder({ folderId: id, folderName, description }));
        toast.success("Cập nhật thông tin thành công!");
    };

    return (
        <div className={cx("folder-detail-view")}>
            <div className={cx("header")}>
                <div className={cx("information")}>
                    <div className={cx("title")}>
                        DTUDOCUMENT / <span>TÀI LIỆU/ “{data.folderName}”</span>
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
                            <h3>“{data.folderName}”</h3>
                            <div className={cx("outstanding")}>
                                <div>
                                    <DescriptionOutlinedIcon />
                                    <span>{data.numberDoc} tài liệu</span>
                                </div>
                                <div>
                                    <PersonOutlineOutlinedIcon />
                                    <span>{data.authorName}</span>
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
                            value={filterDoc}
                            onChange={(e) => setFilterDoc(e.target.value)}
                            placeholder={`Tìm tài liệu trong “${data.folderName}”`}
                        />
                        <SearchOutlinedIcon className={cx("search-icon")} />
                    </div>
                </div>
            </div>
            {!isUpdating ? (
                <div className={cx("body")}>
                    <h3>TÀI LIỆU TRONG THƯ MỤC : “{data.folderName}”</h3>
                    <div className={cx("docs-list")}>
                        <div className={cx("list-head")}>
                            <h3>Tiêu đề tài liệu</h3>
                            <h3>Chức năng</h3>
                        </div>
                        <div className={cx("list-body")}>
                            {filterDocuments(data.documents, filterDoc).length >
                            0 ? (
                                filterDocuments(data.documents, filterDoc).map(
                                    (value: any, index: number) => (
                                        <div key={index} className={cx("doc")}>
                                            <div className={cx("doc-title")}>
                                                <DescriptionOutlinedIcon />
                                                {value.title}
                                            </div>
                                            <div className={cx("actions")}>
                                                <button>
                                                    <img
                                                        src={DownICON}
                                                        alt="down"
                                                    />
                                                </button>
                                                <button>
                                                    <img
                                                        src={ShareICON}
                                                        alt="share"
                                                    />
                                                </button>
                                                <button>
                                                    <img
                                                        src={EditICON}
                                                        alt="edit"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className={cx("not-found")}>
                                    Not Found!
                                </div>
                            )}
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
                        <button
                            onClick={handleUpdateFolder}
                            style={{ backgroundColor: "#62d07a" }}>
                            Xác nhận chỉnh sửa
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
