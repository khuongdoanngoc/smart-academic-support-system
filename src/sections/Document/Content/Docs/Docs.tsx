/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./Docs.module.scss";
const cx = classNames.bind(styles);
import avartar from "../../../../assets/images/Frame 8720.png";

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
// import { downloadFile } from "../../../../utils/downloadFile";
import { useAppDispatch } from "../../../../redux/store";
import {
  DownloadDocumentAction,
  SaveDocumentStogeAction,
} from "../../../../redux/DocumentSlice/documentSlice";
import { useAppSelector } from "../../../../redux/store";
import Loader from "../../../../components/Loader/Loader";
// import { SharingModal } from "../../../../components/SharingModal"

const options = ["Lưu tài liệu", "Tải xuống", "Chia sẻ"];

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
  const [anchorEls, setAnchorEls] = React.useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const open = (docId: number) => Boolean(anchorEls[docId]);
  const handleClick = (event: React.MouseEvent<HTMLElement>, docId: number) => {
    setAnchorEls((prev) => ({ ...prev, [docId]: event.currentTarget }));
  };

  const dispatch = useAppDispatch();
  const handleClose = (option: string, docId: number) => {
    if (option === "Lưu tài liệu") {
      dispatch(SaveDocumentStogeAction(docId));
    }
    if (option === "Chia sẻ") {
      handleOpenModal(docId);
    }
    console.log(option);
    setAnchorEls((prev) => ({ ...prev, [docId]: null }));
  };
  const handleClickClose = (docId: number) => {
    setAnchorEls((prev) => ({ ...prev, [docId]: null }));
  };

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.authentication.username);

  const handleDownloadDocuments = (documentId: number) => {
    dispatch(DownloadDocumentAction({ documentId, username }));
  };
  console.log(docs)
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
          }}
        >
          {!isLoadingMore ? "Xem thêm" : "Thu gọn"}
        </span>
      </div>
      {loading ? (
        <Loader height={1} />
      ) : (
        <div className={cx("cards")}>
          {docs?.map((data: any, index: number) => {
            return (
              <div key={index} className={cx("card")}>
                <div className={cx("author")}>
                  <div className={cx("name")}>
                    <img src={data.profilePicture || avartar} alt="avt" />
                    <p>{data.authorName}</p>
                  </div>
                  <IconButton
                    aria-label="more"
                    id={`long-button-${data.docId}`}
                    aria-controls={
                      open(data.docId) ? `long-menu-${data.docId}` : undefined
                    }
                    aria-expanded={open(data.docId) ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, data.docId)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id={`long-menu-${data.docId}`}
                    anchorEl={anchorEls[data.docId]}
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    open={open(data.docId)}
                    onClose={() => handleClickClose(data.docId)}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "13ch",
                        },
                      },
                    }}
                  >
                    {options.map((option) => {
                      const docIdCopy = data.docId;

                      return (
                        <MenuItem
                          key={option}
                          onClick={() => {
                            handleClose(option, docIdCopy);
                          }}
                        >
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
                <img
                  onClick={() => navigate(`/document/${data.docId}`)}
                  src={`src/assets/images/library.document.png`}
                  alt="doc"
                />
                <h3 onClick={() => navigate(`/document/${data.docId}`)}>
                  {truncateTextWithLength(data.title, 45)}
                </h3>
                <span>{data.subject}</span>
                <span>{data.facultyName}</span>
                <div className={cx("actions")}>
                  <span>{data.downloadCount}+ lượt tải</span>
                  <div>
                    <div onClick={() => handleDownloadDocuments(data.docId)}>
                      <FileDownloadOutlinedIcon sx={{ color: "#EB2930" }} />
                    </div>
                    <div onClick={() => handleOpenModal(data.docId)}>
                      <ShareOutlinedIcon sx={{ color: "#EB2930" }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
