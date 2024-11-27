import classNames from "classnames/bind";
import styles from "./DocumentHeader.module.scss";
const cx = classNames.bind(styles);
import SearchIcon from "@mui/icons-material/Search";
import VietnameseIcon from "../../../assets/images/vietnamese.icon.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { LogoutAction } from "../../../redux/AuthenticationSlice/AuthenticationSlice";
import { useNavigate } from "react-router-dom";

export default function DocumentHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogined = useAppSelector((state) => state.authentication);

  const handleClickLogout = () => {
    if (isLogined) {
      dispatch(LogoutAction());
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={cx("document-header")}>
      <a href="/document">
        <h1 className={cx("logo")}>
          DTU<span>DOCUMENT</span>
        </h1>
      </a>
      <div className={cx("search")}>
        <input type="text" placeholder="Tìm kiếm tài liệu..." />
        <SearchIcon className={cx("search-icon")} />
      </div>
      <div className={cx("items")}>
        <div className={cx("language")}>
          <img src={VietnameseIcon} alt="" />
          <h3>Vietnamese</h3>
        </div>
        <button onClick={handleClickLogout}>
          {isLogined ? "SIGN OUT" : "SIGN IN"}
        </button>
      </div>
    </div>
  );
}
