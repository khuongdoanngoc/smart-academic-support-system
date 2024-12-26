import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { Worker } from "@react-pdf-viewer/core";
import { useSharingModal } from "../../../../contexts/SharingModalContext";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
    DownloadDocumentAction,
    SaveDocumentStogeAction,
} from "../../../../redux/DocumentSlice/documentSlice";

interface IDetailDoc {
    url: string | undefined;
    id: number;
}

function Content({ url, id }: IDetailDoc) {
    // configs cho nút chia sẻ
    const { openSharingModal, setUrl } = useSharingModal();
    const handleOpenModal = (id: number) => {
        setUrl(`${import.meta.env.VITE_CLIENT_URL}/document/${id}`);
        openSharingModal();
    };
    const { username } = useAppSelector((state) => state.authentication);

    const dispatch = useAppDispatch();

    const handleDownload = () => {
        dispatch(DownloadDocumentAction({ documentId: id, username }));
    };

    const handleSave = () => {
        dispatch(SaveDocumentStogeAction(id));
    };

    return (
        <div
            className={cx("content")}
            style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
            }}>
            <div className={cx("actions")}>
                <button onClick={handleDownload}>
                    <FileDownloadOutlinedIcon /> Tải xuống
                </button>
                <div className={cx("right-actions")}>
                    <button onClick={handleSave}>
                        <BookmarkBorderOutlinedIcon />
                        Lưu
                    </button>
                    <button onClick={() => handleOpenModal(id)}>
                        <ShortcutOutlinedIcon sx={{ color: "black" }} />
                        Chia sẻ
                    </button>
                </div>
            </div>
            <hr />
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {url && <Viewer fileUrl={url} />}
            </Worker>
        </div>
    );
}

export default Content;
