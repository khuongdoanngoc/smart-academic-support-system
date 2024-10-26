import classNames from "classnames/bind";
import styles from "./ProposalDocs.module.scss";
const cx = classNames.bind(styles);
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AnalystICON from "../../../assets/images/icons/analystICON.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Button } from "../../../components/Button";
const options = ["Gắn thẻ", "Lưu tài liệu", "Tải xuống", "Chia sẻ", "Báo cáo"];
const ITEM_HEIGHT = 48;
export default function ProposalDocs() {
    // config cho popover ...
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);

    const notifyBox = (
        <div className={cx("notify-box")}>
            <div className={cx("title")}>
                <NotificationsOutlinedIcon />
                <h3>THÔNG BÁO</h3>
            </div>
            <p>
                Hiện tại chúng tôi chưa có thông tin về thói quen sử dụng tài
                liệu của bạn, hãy giúp chúng tôi cung cấp thông tin cấn thiết để
                chúng tôi có thể phân tích và lựa chọn tài liệu phù hợp nhất
                dành cho bạn nhé.
            </p>
            <div className={cx("analyse-btn")}>
                <Button
                    text="Phân tích ngay"
                    fontSize={16}
                    paddingX={14}
                    paddingY={9}
                />
            </div>
        </div>
    );

    return (
        <div className={cx("proposal-docs")}>
            <div className={cx("head")}>
                <h2>Tài liệu đề xuất</h2>
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
            {isAnalysing ? (
                <div className={cx("analyst")}>
                    <div className={cx("title")}>
                        <img src={AnalystICON} alt="analyst" />
                        <h3>Phân tích </h3>
                    </div>
                    <hr />
                    <div className={cx("content")}></div>
                    <div className={cx("actions")}></div>
                </div>
            ) : (
                notifyBox
            )}
        </div>
    );
}
