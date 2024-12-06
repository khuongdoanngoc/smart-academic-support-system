import classNames from "classnames/bind";
import styles from "./DocsDirectory.module.scss";
const cx = classNames.bind(styles);

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSharingModal } from "../../../../contexts/SharingModalContext";
// import { SharingModal } from "../../../../components/SharingModal";

interface IDoc {
  logo: string;
  name: string;
  img: string;
  titleDocs: string;
  folder: string;
  download: number;
}

interface IDocs {
  title: string;
  docs: IDoc[];
}
const options = ["Gắn thẻ", "Lưu tài liệu", "Tải xuống", "Chia sẻ", "Báo cáo"];

const ITEM_HEIGHT = 48;

export default function Docs({ title, docs }: IDocs) {
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

  // configs cho nút xem thêm
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const handleToggle = () => {
    if (visibleCount === 4) {
      setVisibleCount(visibleCount + 6);
    } else {
      setVisibleCount(4);
    }
  };

  return (
    <div className={cx("docs-directory")}>
      <div className={cx("directory-titles")}>
        <h2>{title}</h2>
        <span onClick={handleToggle}>
          {visibleCount === 4 ? "Xem thêm" : "Thu gọn"}
        </span>
      </div>
      <div className={cx("directory-cards")}>
        {docs.slice(0, visibleCount).map((data, index) => (
          <div key={index} className={cx("card-list")}>
            <div className={cx("list-author")}>
              <div className={cx("name")}>
                <img src={`${data.logo}`} alt="logo" />
                <p>{data.name}</p>
              </div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
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
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <img src={`${data.img}`} alt="doc" />
            <h3>{data.titleDocs}</h3>
            <span>{data.folder}</span>
            <div className={cx("actions")}>
              <span>{data.download}+ lượt tải</span>
              <div>
                <div
                  onClick={() => {
                    console.log("do download");
                  }}
                >
                  <FileDownloadOutlinedIcon sx={{ color: "#EB2930" }} />
                </div>
                <div onClick={openSharingModal}>
                  <ShareOutlinedIcon sx={{ color: "#EB2930" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
