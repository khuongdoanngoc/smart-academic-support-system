import classnames from "classnames/bind";
import styles from "./SearchUserComponents.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import UserAvatar from "../../../assets/images/avatar.png";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  clearSearchUser,
  SearchUserAction,
  setActiveLoadMore,
} from "../../../redux/SearchUserSlice/SearchUserSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import Loader from "../../../components/Loader/Loader";

const cx = classnames.bind(styles);

const SearchUserComponents = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listSearch, loading, activeLoadMore } = useAppSelector((state) => state.searchUser);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (value: string, pageSize: number, pageNum: number) =>{
        return dispatch(SearchUserAction({ name: value, pageSize, pageNum }))
      },
      1000
    ),
    [dispatch]
  );
  const handleChangeSearch = async (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);

    if (value === "" || !value.trim()) {
      dispatch(clearSearchUser());
      return;
    }
    try {
      debounceSearch(value, itemsPerPage, currentPage - 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigateUser = (email: string, userName: string) => {
    try {
      sessionStorage.setItem("userEmail", email);
      navigate(`/document/profile-author/${userName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMoreUserSearch = () => {
    if (loading || activeLoadMore) {
      return;
    }
    dispatch(setActiveLoadMore(true));
    debounceSearch(searchTerm, itemsPerPage, currentPage);
    setCurrentPage(currentPage + 1);
  };

  useEffect(()=>{
    if(searchTerm==="" && listSearch.length>0){
      dispatch(clearSearchUser());
      setCurrentPage(1);
    }
  },[dispatch, listSearch.length, searchTerm]);
  return (
    <div className={cx("search-user")}>
      <div className={cx("search-user-header")}>
        <div className={cx("user-header-title")}>TÌM KIẾM NGƯỜI DÙNG</div>
        <div className={cx("user-header-search")}>
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <SearchIcon className={cx("search-icon")} />
        </div>
      </div>
      <div className={cx("search-user-body")}>
        {loading ? (
          <Loader height={20} />
        ) : (
          listSearch.length<1?(<p className={cx("not-found")}>Không có kết quả được tìm thấy!!!</p>): (
            listSearch.map((item, index) => (
              <div
                className={cx("user-body-list")}
                key={index}
                onClick={() =>
                  handleNavigateUser(
                    item.email,
                    item.firstName.concat(item.lastName)
                  )
                }
              >
                <div className={cx("user-list-img")}>
                  <img src={UserAvatar} alt="avartar" />
                </div>
                <div className={cx("user-list-info")}>
                  <div className={cx("user-list-name")}>
                    <div
                      className={cx("list-name-text")}
                    >{`${item.lastName} ${item.firstName}`}</div>
                    <div className={cx("list-name-position")}>
                      Chức vụ: Giảng viên
                    </div>
                  </div>
                  <div className={cx("user-list-department")}>
                    <div className={cx("list-department-text")}>
                      Khoa: Đào tạo quốc tế
                    </div>
                    <div className={cx("list-department-position")}>
                      Ngành:Công nghệ phần mềm CMU
                    </div>
                  </div>
                  {/* <div className={cx("user-list-email")}>Email: {item.email}</div> */}
                </div>
                <div className={cx("user-list-button")}>
                  <button>Theo dõi</button>
                </div>
              </div>
            ))
          ))
        }
      </div>
      {listSearch.length > 0 && (
        <div className={cx("search-user-footer")}>
          <Button
            text={`${activeLoadMore?"loading...":"Xem thêm"}`}
            paddingX={18}
            paddingY={8}
            fontSize={18}
            onClick={handleLoadMoreUserSearch}
          />
        </div>
      )}
    </div>
  );
};

export default SearchUserComponents;
