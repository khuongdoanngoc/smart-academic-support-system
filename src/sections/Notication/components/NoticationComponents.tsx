import classnames from "classnames/bind";
import styles from "./NoticationComponent.module.scss";
import notification from "../../../assets/images/notification-bing.png";
import frame from "../../../assets/images/Frame 8799.png";
import frame1 from "../../../assets/images/Frame 8819.png";
import bookmark from "../../../assets/images/Bookmark.png";

import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
// import { useState } from "react";

const cx = classnames.bind(styles);
interface listNotecation {
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
  titleColor: listTitleColor[];
}
const NoticationComponents = ({ list, titleColor }: initialState) => {
  const total = list.length;
  const [selectAll, setSelectAll] = useState(false);
  const [selectItem, setSelectItem] = useState(Array(total).fill(false));
  const [selectNumberColor, setSelectNumberColor] = useState<number | null>(
    null
  );
  const [menuDelete, setMenuDelete] = useState(false);
  const [opacityMenu, setOpacityMenu] = useState(false);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectItem(Array(total).fill(!selectAll));
  };
  const handleCheckBoxChange = (index: number) => {
    const updatedItems = [...selectItem];
    updatedItems[index] = !updatedItems[index];
    setSelectItem(updatedItems);
    if (updatedItems.every((item) => item === true)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };
  const handleSelectColor = (index: number) => {
    setSelectNumberColor(index);
  };
  const handleDeletMenu = () => {
    setMenuDelete(!menuDelete);
    setOpacityMenu(!opacityMenu);
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
              <img src={notification} alt="hell" />
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
                        <li>Chuyển ngay</li>
                        <li>Quay lại</li>
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
                  {list.map((item, index) => {
                    return (
                      <div className={cx("body-bottom-notication")} key={index}>
                        <div className={cx("notication-info")}>
                          <input
                            type="checkbox"
                            checked={selectItem[index]}
                            onChange={() => handleCheckBoxChange(index)}
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
        <div className={cx("notication-page-")}></div>
      </div>
    </div>
  );
};

export default NoticationComponents;
