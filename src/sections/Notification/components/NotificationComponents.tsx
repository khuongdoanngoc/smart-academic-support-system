import classnames from "classnames/bind";
import styles from "./NotificationComponent.module.scss";
import notificationImg from "../../../assets/images/notification-bing.png";
import frame from "../../../assets/images/Frame 8799.png";
// import frame1 from "../../../assets/images/Frame 8819.png";
import bookmark from "../../../assets/images/Bookmark.png";

// import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  DeleteNotificationAction,
  ListAllNotificationAction,
  ListAllNotificationDeletedAction,
  ListAllNotificationSavedAction,
  MoveNotifyToSavedAction,
  MoveNotifyToTrashdAction,
  updateNotificationList,
  updateNumberOfNotificationsAll,
  updateNumberOfNotificationsSaved,
  updateNumberOfNotificationsTrash,
  UpdateStatusNotifyAction,
  updateStatusReadNotifications,
} from "../../../redux/Notication/NoticationSlice";
import Loader from "../../../components/Loader/Loader";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
// import { useState } from "react";

const cx = classnames.bind(styles);


const NotificationComponents = () => {
  const dispatch = useAppDispatch();
  const {
    notificationList,
    numberOfNotifications,
    Loading,
    numberOfNotificationsSaved,
    numberOfNotificationsDelete,
    numberOfNotificationsUnRead,
  } = useAppSelector((state) => state.notication);
  const { isLogined } = useAppSelector((state) => state.authentication);
  const [currentPage, setCurrentPage] = useState<number>(1); //xét trạng thái hiển thị trang hiện tại
  const [selectNumberColor, setSelectNumberColor] = useState<number | null>(0); //xet trạng thai màu khi click chuyển giữa các mục
  const [selectAll, setSelectAll] = useState(false); //check chọn tất cả
  const [selectItem, setSelectItem] = useState(
    notificationList.map(() => false)
  );
  const [menuDelete, setMenuDelete] = useState(false); //xet trạng thai menu delete
  const [opacityMenu, setOpacityMenu] = useState(false); //làm mờ màn hình khi menu mở
  const [typeNotify, SetTypeNotify] = useState("all");
  const [ignoreClick, setIgnoreClick] = useState(false);
  const [currentPageAll, setCurrentPageAll] = useState<number>(1);
  const [currentPageArchived, setCurrentPageArchived] = useState<number>(1);
  const [currentPageTrash, setCurrentPageTrash] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const processedNotifications = useRef(new Set());

  const itemsPerPage = 6;

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectItem(notificationList.map(() => false));
    } else {
      setSelectAll(true);
      setSelectItem(notificationList.map(() => true));
    }
  };

  const handleCheckBoxChange = (index: number) => {
    const updatedSelectItem = [...selectItem];
    updatedSelectItem[index] = !updatedSelectItem[index];
    setSelectItem(updatedSelectItem);
    setSelectAll(updatedSelectItem.every((item) => item === true));
  };

  const handleMoveToTrash = () => {
    handleBackMenu();
    const isSelected = selectItem.reduce(
      (acc: number[], item, index: number) => {
        if (item) acc.push(index);
        return acc;
      },
      []
    );

    if (isSelected.length === 0) {
      toast.info("Chưa có thông báo nào được chọn");
      return;
    }
    const getNotificationIds = notificationList
      .map((item, index) => {
        if (isSelected.includes(index)) return item.notificationId;
        return null;
      })
      .filter((item) => item !== null);
    setSelectItem(notificationList.map(() => false));
    setSelectAll(false);
    if (typeNotify === "deleted") {
      dispatch(DeleteNotificationAction(getNotificationIds));
      dispatch(
        updateNumberOfNotificationsTrash(
          numberOfNotificationsDelete - isSelected.length
        )
      );
    } else {
      Promise.all([
        dispatch(MoveNotifyToTrashdAction(getNotificationIds)),
        dispatch(
          updateNumberOfNotificationsTrash(
            numberOfNotificationsDelete + isSelected.length
          )
        ),
        dispatch(
          updateNumberOfNotificationsAll(
            numberOfNotifications - isSelected.length
          )
        ),
      ]);
    }
    dispatch(updateNotificationList(getNotificationIds));
    handleClose();
  };

  const handleMoveToSaved = () => {
    handleBackMenu();
    const isSelected = selectItem.reduce(
      (acc: number[], item, index: number) => {
        if (item) acc.push(index);
        return acc;
      },
      []
    );

    if (isSelected.length === 0) {
      toast.info("Chưa có thông báo nào được chọn");
      return;
    }
    const getNotificationIds = notificationList
      .map((item, index) => {
        if (isSelected.includes(index)) return item.notificationId;
        return null;
      })
      .filter((item) => item !== null);
    dispatch(MoveNotifyToSavedAction(getNotificationIds));
    dispatch(updateNotificationList(getNotificationIds));
    dispatch(
      updateNumberOfNotificationsSaved(
        numberOfNotificationsSaved + isSelected.length
      )
    );
    dispatch(
      updateNumberOfNotificationsAll(numberOfNotifications - isSelected.length)
    );
  };

  const handleSelectColor = (index: number, type: string) => {
    setSelectNumberColor(index);
    setCurrentPage(1);
    setCurrentPageAll(1);
    setCurrentPageArchived(1);
    setCurrentPageTrash(1);
    setSelectAll(false);
    SetTypeNotify(type);
  };

  const handleDeletMenu = () => {
    setMenuDelete(!menuDelete);
    setOpacityMenu(!opacityMenu);
  };
  const handleBackMenu = () => {
    setMenuDelete(false);
    setOpacityMenu(false);
  };

  const handelPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (selectNumberColor === 0) setCurrentPageAll(value);
    else if (selectNumberColor === 1) setCurrentPageArchived(value);
    else setCurrentPageTrash(value);

    // Fix: Check if selectItem[value] is an array before using the 'every' method
    const isAllSelected =
      Array.isArray(selectItem[value]) &&
      selectItem[value].every((item: boolean) => item === true);

    setSelectAll(isAllSelected);
  };

  const calculateTimeDifference = (inputTime: string) => {
    const inputDate = new Date(inputTime); // Chuyển chuỗi thành Date
    const now = new Date(); // Lấy thời gian hiện tại
    const difference = Math.abs(now.getTime() - inputDate.getTime()); // Tính chênh lệch mili-giây

    const seconds = Math.floor(difference / 1000); // Mili-giây thành giây
    const minutes = Math.floor(seconds / 60); // Giây thành phút
    const hours = Math.floor(minutes / 60); // Phút thành giờ
    const days = Math.floor(hours / 24); // Giờ thành ngày

    if (days >= 1) {
      return `${days} ngày trước`;
    } else if (hours >= 1) {
      return `${hours} giờ trước`;
    } else if (minutes >= 1) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  };
  const handleClickOpen = () => {
    const isSelected = selectItem.reduce(
      (acc: number[], item, index: number) => {
        if (item) acc.push(index);
        return acc;
      },
      []
    );

    if (isSelected.length === 0) {
      toast.info("Chưa có thông báo nào được chọn");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isLogined) {
      if (typeNotify === "saved") {
        dispatch(ListAllNotificationSavedAction(currentPage - 1));
      } else if (typeNotify === "deleted") {
        dispatch(ListAllNotificationDeletedAction(currentPage - 1));
      } else {
        dispatch(ListAllNotificationAction(currentPage - 1));
      }
    }
  }, [currentPage, dispatch, isLogined, typeNotify]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuDelete &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        if (ignoreClick) {
          setIgnoreClick(false);
          return;
        }
        handleBackMenu();
      }
    }
    if (!menuDelete) {
      setIgnoreClick(true); // Bỏ qua sự kiện click đầu tiên
      document.addEventListener("click", handleClickOutside);
    } else {
      setIgnoreClick(false);
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuDelete, ignoreClick]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notificationList.length > 0) {
        const unReadNotifications = notificationList.filter(
          (notification) => !notification.isRead && !processedNotifications.current.has(notification.notificationId)
        );
  
        if (unReadNotifications.length > 0) {
          const notificationIds = unReadNotifications.map((notification) => {
            processedNotifications.current.add(notification.notificationId);
            return notification.notificationId;
          });
  
          Promise.all([
            dispatch(UpdateStatusNotifyAction(notificationIds)),
            dispatch(updateStatusReadNotifications(notificationIds)),
          ]);
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, notificationList, numberOfNotificationsUnRead]);

  return (
    <div className={cx("notication")}>
      <div className={cx("notication-page")}>
        <div className={cx("notication-page-header")}>
          <h2>THÔNG BÁO CỦA BẠN</h2>
        </div>
        <div className={cx("notication-page-body")}>
          <div className={cx("page-body-title")}>
            <div className={cx("body-title-icon")}>
              <img src={notificationImg} alt="hell" />
              <h3>Danh sách thông báo</h3>
            </div>
            {/* <div>
              <img src={frame} />
            </div> */}
          </div>
          <div className={cx("page-body-list")}>
            <div className={cx("body-list-not")}>
              <div className={cx("body-list-left")}>
                <div className={cx("list-left-item")}>
                  <span className={cx("left-item-number")}>
                    {numberOfNotifications +
                      numberOfNotificationsSaved +
                      numberOfNotificationsDelete}
                  </span>
                  <span className={cx("left-item-title")}>Thông báo</span>
                </div>
              </div>
              {/* <div className={cx("body-list-right")}>
                <SearchIcon className={cx("search-icon")} />
                <input type="text" placeholder="Tìm kiếm thông báo..." />
              </div> */}
            </div>
            <div className={cx("body-list-item")}>
              <div className={cx("list-item-header")}>
                {Array.from([
                  {
                    number: numberOfNotifications,
                    title: "Tất cả thông báo",
                    type: "all",
                  },
                  {
                    number: numberOfNotificationsSaved,
                    title: "Lưu trữ",
                    type: "saved",
                  },
                  {
                    number: numberOfNotificationsDelete,
                    title: "Thùng rác",
                    type: "deleted",
                  },
                ]).map((item, index) => {
                  return (
                    <div
                      className={cx("item-header-all", {
                        "handle-color": selectNumberColor === index,
                      })}
                      key={index}
                      onClick={() => handleSelectColor(index, item.type)}
                    >
                      <span>{item.number}</span>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
              <div className={cx("list-item-body")}>
                <div className={cx("item-body-top")}>
                  <div className={cx("body-top-all")}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <span>Chọn tất cả</span>
                  </div>
                  <div
                    className={cx("body-top-del")}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeletMenu();
                    }}
                  >
                    <img src={frame} />
                  </div>
                  {menuDelete && (
                    <div className={cx("body-menu-del")} ref={menuRef}>
                      <ul>
                        <li onClick={handleClickOpen}>
                          {typeNotify === "deleted"
                            ? "Xoá thông báo?"
                            : "Chuyển tất cả vào thùng rác?"}
                        </li>
                        {typeNotify === "all" && (
                          <li onClick={handleMoveToSaved}>
                            Lưu lại thông báo này?
                          </li>
                        )}
                        <li onClick={handleBackMenu}>Quay lại</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div
                  className={cx(
                    "item-body-bottom",
                    opacityMenu && "opacity-menu"
                  )}
                >
                  {Loading ? (
                    <Loader height={20} />
                  ) : (
                    notificationList.map((item, index) => {
                      return (
                        <div
                          className={cx("body-bottom-notication")}
                          key={index}
                        >
                          <div className={cx("notication-info")}>
                            <input
                              type="checkbox"
                              checked={
                                selectItem[
                                  (currentPage - 1) * itemsPerPage + index
                                ]
                              }
                              onChange={() =>
                                handleCheckBoxChange(
                                  (currentPage - 1) * itemsPerPage + index
                                )
                              }
                            />
                            <span
                              className={cx(`${item.isRead && "isRead"}`)}
                            ></span>
                            <img src={bookmark} />
                            <p>{item.message}</p>
                          </div>
                          <div className={cx("notication-time")}>
                            <span>
                              {calculateTimeDifference(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("notication-page-slide")}>
          {!Loading && (
            <div className={cx("page-slide-item")}>
              <Pagination
                count={Math.ceil(
                  (typeNotify === "all"
                    ? numberOfNotifications
                    : typeNotify === "saved"
                    ? numberOfNotificationsSaved
                    : numberOfNotificationsDelete) / 5
                )}
                defaultPage={0}
                siblingCount={Math.ceil(numberOfNotifications / 5)}
                onChange={handelPageChange}
                variant="outlined"
                page={
                  selectNumberColor === 0
                    ? currentPageAll
                    : selectNumberColor === 1
                    ? currentPageArchived
                    : currentPageTrash
                }
                renderItem={(item: PaginationRenderItemParams) => (
                  <PaginationItem
                    sx={{
                      margin: "0 6px",
                      fontFamily: "Inter",
                    }}
                    {...item}
                    page={item.page}
                  />
                )}
              />
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cảnh báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc là{" "}
            {typeNotify === "deleted"
              ? "xoá thông báo này vĩnh viễn"
              : "chuyển vào thùng rác"}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleMoveToTrash} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationComponents;
