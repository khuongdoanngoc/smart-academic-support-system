import classNames from "classnames/bind";
import styles from "./DocumentHeader.module.scss";
const cx = classNames.bind(styles);
import SearchIcon from "@mui/icons-material/Search";
import VietnameseIcon from "../../../assets/images/vietnamese.icon.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { LogoutAction } from "../../../redux/AuthenticationSlice/AuthenticationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DocumentHeader() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLogined } = useAppSelector((state) => state.authentication);

    const location = useLocation();
    const query = new URLSearchParams(useLocation().search);
    const value: string | null = query.get("value");
    const [searchValue, setSearchValue] = useState<string>(value || "");
    const handleClickLogout = () => {
        if (isLogined) {
            dispatch(LogoutAction());
        } else {
            navigate("/login");
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (location.pathname === "/search") {
            window.location.replace(`/search?value=${searchValue}`);
        } else {
            navigate(`/search?value=${searchValue}`);
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
                <form onSubmit={handleSubmit}>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="Tìm kiếm tài liệu..."
                    />

                    <button>
                        <SearchIcon className={cx("search-icon")} />
                    </button>
                </form>
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
