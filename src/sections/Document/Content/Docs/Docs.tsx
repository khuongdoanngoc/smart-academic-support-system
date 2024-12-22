import classNames from "classnames/bind";
import styles from "./Docs.module.scss";
const cx = classNames.bind(styles);

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSharingModal } from "../../../../contexts/SharingModalContext";
import { useNavigate } from "react-router-dom";
import { truncateTextWithLength } from "../../../../utils/truncateText";
import { downloadFile } from "../../../../utils/downloadFile";
import { useAppSelector } from "../../../../redux/store";
import Loader from "../../../../components/Loader/Loader";
// import { SharingModal } from "../../../../components/SharingModal"

const options = ["Gắn thẻ", "Lưu tài liệu", "Tải xuống", "Chia sẻ", "Báo cáo"];

const ITEM_HEIGHT = 48;

export default function Docs({ title, docs, onLoadMore }: any) {
    // configs cho nút chia sẻ
    const { openSharingModal, setUrl } = useSharingModal();
    const handleOpenModal = (id: number) => {
        setUrl(`${import.meta.env.VITE_CLIENT_URL}/document/${id}`);
        openSharingModal();
    };

    const { loading } = useAppSelector((state) => state.document);

    // configs cho nút ... trên tài liệu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className={cx("docs")}>
            <div className={cx("titles")}>
                <h2>{title}</h2>
                <span
                    onClick={() => {
                        setIsLoadingMore(!isLoadingMore);
                        if (isLoadingMore) {
                            onLoadMore("shorten");
                        } else {
                            onLoadMore("loadmore");
                        }
                    }}>
                    {!isLoadingMore ? "Xem thêm" : "Thu gọn"}
                </span>
            </div>
            {loading ? (
                <Loader height={1} />
            ) : (
                <div className={cx("cards")}>
                    {docs?.map((data: any, index: number) => (
                        <div key={index} className={cx("card")}>
                            <div className={cx("author")}>
                                <div className={cx("name")}>
                                    <img
                                        src={`src/assets/images/avatar.png`}
                                        alt="avt"
                                    />
                                    <p>{data.authorName}</p>
                                </div>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={
                                        open ? "long-menu" : undefined
                                    }
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}>
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        paper: {
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: "13ch",
                                            },
                                        },
                                    }}>
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === "Pyxis"}
                                            onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <img
                                onClick={() =>
                                    navigate(`/document/${data.docId}`)
                                }
                                src={`src/assets/images/library.document.png`}
                                alt="doc"
                            />
                            <h3
                                onClick={() =>
                                    navigate(`/document/${data.docId}`)
                                }>
                                {truncateTextWithLength(data.title, 45)}
                            </h3>
                            <span>{data.subject}</span>
                            <span>{data.facultyName}</span>
                            <div className={cx("actions")}>
                                <span>{data.downloadCount}+ lượt tải</span>
                                <div>
                                    <div
                                        onClick={() => {
                                            downloadFile(
                                                data.filePath,
                                                data.title
                                            );
                                        }}>
                                        <FileDownloadOutlinedIcon
                                            sx={{ color: "#EB2930" }}
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleOpenModal(data.docId)
                                        }>
                                        <ShareOutlinedIcon
                                            sx={{ color: "#EB2930" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
