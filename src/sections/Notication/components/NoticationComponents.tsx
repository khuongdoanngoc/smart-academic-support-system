import classnames from "classnames/bind";
import styles from "./NoticationComponent.module.scss";
import notificationImg from "../../../assets/images/notification-bing.png";
import frame from "../../../assets/images/Frame 8799.png";
import frame1 from "../../../assets/images/Frame 8819.png";
import bookmark from "../../../assets/images/Bookmark.png";

import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
// import { useState } from "react";

const cx = classnames.bind(styles);
interface listNotecation {
  id: number;
  title: string;
  time: string;
}
interface listStorageNotication {
  id: number;
  title: string;
  time: string;
}
interface listTitleColor {
  number: number;
  title: string;
}
interface initialState {
  list: listNotecation[];
  listStore: listStorageNotication[];
  titleColor: listTitleColor[];
}
const NoticationComponents: React.FC<initialState> = ({
  list,
  titleColor,
  listStore,
}) => {
  const total = list.length; //tổng số lượt thông báo
  const [currentPage, setCurrentPage] = useState<number>(1); //xét trạng thái hiển thị trang hiện tại
  const [selectNumberColor, setSelectNumberColor] = useState<number | null>(0); //xet trạng thai màu khi click chuyển giữa các mục
  const [notification, setNotification] = useState(list);
  const [archived, setArchived] = useState<listStorageNotication[]>(listStore);
  const [selectAll, setSelectAll] = useState(false); //check chọn tất cả
  const [selectItem, setSelectItem] = useState(Array(total).fill(false));
  const [menuDelete, setMenuDelete] = useState(false); //xet trạng thai menu delete
  const [opacityMenu, setOpacityMenu] = useState(false); //làm mờ màn hình khi menu mở
  const alphabet = Array.from("1234567");

  const [currentPageAll, setCurrentPageAll] = useState<number>(1);
  const [currentPageArchived, setCurrentPageArchived] = useState<number>(1);
  const [currentPageTrash, setCurrentPageTrash] = useState<number>(1);

  const [trash, setTrash] = useState<
    listNotecation[] | listStorageNotication[]
  >([]);

  const itemsPerPage = 6;
  const displayedList =
    selectNumberColor === 0
      ? notification
      : selectNumberColor === 1
      ? archived
      : trash;

  const filteredDataList = (
    data: listNotecation[] | listStorageNotication[]
  ) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const dataToRender = filteredDataList(displayedList);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectItem(Array(notification.length).fill(newSelectAll));
  };

  const handleCheckBoxChange = (index: number) => {
    const updatedSelectItem = [...selectItem];
    updatedSelectItem[index] = !updatedSelectItem[index];
    setSelectItem(updatedSelectItem);
    setSelectAll(updatedSelectItem.every((item) => item === true));
  };
  const handleMoveToTrash = () => {
    const selectedItems = dataToRender.filter((_, index) => selectItem[index]);
    setTrash((prevTrash) => [...prevTrash, ...selectedItems]);

    if (selectNumberColor === 0) {
      setNotification(notification.filter((_, index) => !selectItem[index]));
    } else if (selectNumberColor === 1) {
      setArchived(archived.filter((_, index) => !selectItem[index]));
    }
    setSelectItem(Array(displayedList.length).fill(false));
    setSelectAll(false);
    setMenuDelete(false);
    setOpacityMenu(false);
  };

  const handleSelectColor = (index: number) => {
    setSelectNumberColor(index);
    setCurrentPage(1);
    setSelectAll(false);
    setSelectItem(Array(notification.length).fill(false));
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
    const isAllSelected = selectItem[value]?.every(
      (item: boolean) => item === true
    );
    setSelectAll(isAllSelected);
  };

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
            <div>
              <img src={frame} />
            </div>
          </div>
          <div className={cx("page-body-list")}>
            <div className={cx("body-list-not")}>
              <div className={cx("body-list-left")}>
                <div className={cx("list-left-item")}>
                  <span className={cx("left-item-number")}>8386</span>
                  <span className={cx("left-item-title")}>Thông báo</span>
                </div>
              </div>
              <div className={cx("body-list-right")}>
                <SearchIcon className={cx("search-icon")} />
                <input type="text" placeholder="Tìm kiếm thông báo..." />
              </div>
            </div>
            <div className={cx("body-list-item")}>
              <div className={cx("list-item-header")}>
                {titleColor.map((item, index) => {
                  return (
                    <div
                      className={cx("item-header-all", {
                        "handle-color": selectNumberColor === index,
                      })}
                      key={index}
                      onClick={() => handleSelectColor(index)}
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
                  <div className={cx("body-top-del")} onClick={handleDeletMenu}>
                    <img src={frame1} />
                  </div>
                  {menuDelete && (
                    <div className={cx("body-menu-del")}>
                      <ul>
                        <li>Chuyển tất cả vào thùng rác ?</li>
                        <li onClick={handleMoveToTrash}>Chuyển ngay</li>
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
                  {dataToRender.map((item, index) => {
                    return (
                      <div className={cx("body-bottom-notication")} key={index}>
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
                          <span></span>
                          <img src={bookmark} />
                          <p>{item.title}</p>
                        </div>
                        <div className={cx("notication-time")}>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("notication-page-slide")}>
          <div className={cx("page-slide-item")}>
            <Pagination
              count={alphabet.length}
              defaultPage={1}
              siblingCount={7}
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
                  page={item.page ? alphabet[item.page - 1] : null}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticationComponents;
