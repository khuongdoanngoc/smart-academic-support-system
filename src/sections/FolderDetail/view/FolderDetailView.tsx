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
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
    clearError,
    clearMessage,
    deleteFolder,
    getFolderById,
    updateFolder,
} from "../../../redux/FolderSlice/folderSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { downloadFile } from "../../../utils/downloadFile";
import { useSharingModal } from "../../../contexts/SharingModalContext";

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

    const { accountId } = useAppSelector((state) => state.authentication);

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const data: any = useAppSelector((state) => state.folder.data);
    const error: any = useAppSelector((state) => state.folder.error);
    const { loading, successMessage } = useAppSelector((state) => state.folder);
    const navigate = useNavigate();

    const {profilePicture} = useAppSelector((state) => state.authentication);

    // configs cho nút chia sẻ
    const { openSharingModal, setUrl } = useSharingModal();
    const handleOpenModal = (id: number) => {
        setUrl(`${import.meta.env.VITE_CLIENT_URL}/document/${id}`);
        openSharingModal();
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (successMessage !== "") {
            toast.success(successMessage);
            dispatch(clearMessage());
            navigate("/document/directory");
        }
    }, [successMessage]);

    const handleEditFolder = () => {
        setIsUpdating(true);
    };

    const handleDeleteFolder = () => {
        if (data.accountId === accountId) {
            dispatch(deleteFolder(id));
        } else {
            toast.error("Bạn không có quyền chỉnh sửa!");
        }
    };

    useEffect(() => {
        dispatch(getFolderById(parseInt(id)));
    }, []);

    useEffect(() => {
        setFolderName(data.folderName);
        setDescription(data.description);
    }, [data]);

    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(clearError());
            toast.error("Xảy ra lỗi!");
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
        if (data.accountId === accountId) {
            dispatch(updateFolder({ folderId: id, folderName, description }));
            toast.success("Cập nhật thông tin thành công!");
        } else {
            toast.error("Bạn không có quyền chỉnh sửa!");
        }
    };

    if (loading) {
        return <Loader height={100} />;
    }

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
                    {data.accountId === accountId && (
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
                                onClick={handleDeleteFolder}
                            />
                        </div>
                    )}
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
                                            <a
                                                href={`/document/${value.docId}`}
                                                className={cx("doc-title")}>
                                                <DescriptionOutlinedIcon />
                                                {value.title}
                                            </a>
                                            <div className={cx("actions")}>
                                                <button
                                                    onClick={() =>
                                                        downloadFile(
                                                            value.filePath,
                                                            value.title
                                                        )
                                                    }>
                                                    <img
                                                        src={DownICON}
                                                        alt="down"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleOpenModal(
                                                            value.docId
                                                        )
                                                    }>
                                                    <img
                                                        src={ShareICON}
                                                        alt="share"
                                                    />
                                                </button>
                                                {data.accountId ===
                                                    accountId && (
                                                    <button
                                                        onClick={() => {
                                                            const fileData = {
                                                                docId: data.documents[index].docId,
                                                                    title: data.documents[index].title,
                                                                    description: data.documents[index].description,
                                                                    type: data.documents[index].type,
                                                                    subjectName: data.documents[index].subjectName,
                                                                    facultyName: data.documents[index].facultyName,
                                                            }
                                                            navigate("/document/edit-document-file", {
                                                                state: { fileData, avatar: profilePicture },
                                                              });
                                                        }}>
                                                        <img
                                                            src={EditICON}
                                                            alt="edit"
                                                        />
                                                    </button>
                                                )}
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
                        <button
                            onClick={() => setIsUpdating(false)}
                            style={{ backgroundColor: "#827878" }}>
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
