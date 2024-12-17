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
// import { SharingModal } from "../../../../components/SharingModal"

interface IDoc {
    title: string;
    author: string;
    content: string;
    subject: string;
    downloads: number;
    image: string;
    facultyName: string;
}

interface IDocs {
    title: string;
    docs: IDoc[];
}
const options = ["Gắn thẻ", "Lưu tài liệu", "Tải xuống", "Chia sẻ", "Báo cáo"];

const ITEM_HEIGHT = 48;

export default function Docs({ title, docs, onLoadMore }: any) {
    // configs cho nút chia sẻ
    const { openSharingModal } = useSharingModal();

    // configs cho nút ... trên tài liệu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
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
                            onLoadMore("expand");
                        }
                    }}>
                    {!isLoadingMore ? "Xem thêm" : "Thu gọn"}
                </span>
            </div>
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
                                aria-controls={open ? "long-menu" : undefined}
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
                            onClick={() => navigate(`/view-doc/${data.docId}`)}
                            src={`src/assets/images/library.document.png`}
                            alt="doc"
                        />
                        <h3 onClick={() => navigate(`/view-doc/${data.docId}`)}>
                            {data.title}
                        </h3>
                        <span>{data.subject}</span>
                        <span>{data.facultyName}</span>
                        <div className={cx("actions")}>
                            <span>500+ lượt tải</span>
                            <div>
                                <div
                                    onClick={() => {
                                        console.log("do download");
                                    }}>
                                    <FileDownloadOutlinedIcon
                                        sx={{ color: "#EB2930" }}
                                    />
                                </div>
                                <div onClick={openSharingModal}>
                                    <ShareOutlinedIcon
                                        sx={{ color: "#EB2930" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
