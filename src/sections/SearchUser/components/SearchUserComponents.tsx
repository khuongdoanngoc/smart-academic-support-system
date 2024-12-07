import classnames from "classnames/bind";
import styles from "./SearchUserComponents.module.scss";
import SearchIcon from "@mui/icons-material/Search";

import UserAvatar from "../../../assets/images/avatar.png";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import {  RootState, useAppDispatch } from "../../../redux/store";
import {
  clearSearchUser,
  SearchUserAction,
} from "../../../redux/SearchUserSlice/SearchUserSlice";
import { useSelector } from "react-redux";
const cx = classnames.bind(styles);
interface Subject {
  id: number;
  name: string;
  position: string;
  department: string;
  major: string;
  email: string;
}
const fakeSubjects: Subject[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Giảng Viên",
    department: "Đào tạo Quốc tế",
    major: "Công nghệ phần mềm CMU",
    email: "Enguyenvana@gmail.com",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    position: "Giảng Viên",
    department: "Đào tạo Quốc tế",
    major: "Công nghệ phần mềm CMU",
    email: "Enguyenvana@gmail.com",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    position: "Giảng Viên",
    department: "Đào tạo Quốc tế",
    major: "Công nghệ phần mềm CMU",
    email: "Enguyenvana@gmail.com",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    position: "Giảng Viên",
    department: "Đào tạo Quốc tế",
    major: "Công nghệ phần mềm CMU",
    email: "Enguyenvana@gmail.com",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
    position: "Giảng Viên",
    department: "Đào tạo Quốc tế",
    major: "Công nghệ phần mềm CMU",
    email: "Enguyenvana@gmail.com",
  },
];
const SearchUserComponents = () => {
  const alphabet = Array.from("1234567");
  const dispatch = useAppDispatch();
  const {listSearch} =useSelector((state:RootState) => state.searchUser);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredDataList = (data: Subject[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  console.log(listSearch);
  
  const handleChangeSearch = async (value: string) => {
    if (!value.trim()) {
      dispatch(clearSearchUser());
      return;
    }
    try {
      await dispatch(SearchUserAction(value)).unwrap();
    } catch (error) {
      console.log(error);
    }

    dispatch(SearchUserAction(value));
  };
  return (
    <div className={cx("search-user")}>
      <div className={cx("search-user-header")}>
        <div className={cx("user-header-title")}>TÌM KIẾM NGƯỜI DÙNG</div>
        <div className={cx("user-header-search")}>
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <SearchIcon className={cx("search-icon")} />
        </div>
      </div>
      <div className={cx("search-user-body")}>
        <div className={cx("user-body-list")}>
          <div className={cx("user-list-img")}>
            <img src={UserAvatar} alt="avartar" />
          </div>
          <div className={cx("user-list-info")}>
            <div className={cx("user-list-name")}>
              <div className={cx("list-name-text")}>Nguyễn Văn A</div>
              <div className={cx("list-name-position")}>Chức vụ:Giảng Viên</div>
            </div>
            <div className={cx("user-list-department")}>
              <div className={cx("list-department-text")}>
                Khoa: Đào tạo Quốc tế
              </div>
              <div className={cx("list-department-position")}>
                Ngành: Công nghệ phần mềm CMU
              </div>
            </div>
            <div className={cx("user-list-email")}>
              Email: Enguyenvana@gmail.com
            </div>
          </div>
          <div className={cx("user-list-button")}>
            <button>Theo dõi</button>
          </div>
        </div>
        {filteredDataList(fakeSubjects).map((item,index) => (
          <div className={cx("user-body-list")}  key={index}>
            <div className={cx("user-list-img")}>
              <img src={UserAvatar} alt="avartar" />
            </div>
            <div className={cx("user-list-info")}>
              <div className={cx("user-list-name")}>
                <div className={cx("list-name-text")}>{item.name}</div>
                <div className={cx("list-name-position")}>
                  Chức vụ: {item.position}
                </div>
              </div>
              <div className={cx("user-list-department")}>
                <div className={cx("list-department-text")}>
                  Khoa: {item.department}
                </div>
                <div className={cx("list-department-position")}>
                  Ngành: {item.major}
                </div>
              </div>
              <div className={cx("user-list-email")}>Email: {item.email}</div>
            </div>
            <div className={cx("user-list-button")}>
              <button>Theo dõi</button>
            </div>
          </div>
        ))}
        {/* <div className={cx("user-body-list")}>
          <div className={cx("user-list-img")}>
            <img src={UserAvatar} alt="avartar" />
          </div>
          <div className={cx("user-list-info")}>
            <div className={cx("user-list-name")}>
              <div className={cx("list-name-text")}>Nguyễn Văn A</div>
              <div className={cx("list-name-position")}>Chức vụ:Giảng Viên</div>
            </div>
            <div className={cx("user-list-department")}>
              <div className={cx("list-department-text")}>
                Khoa: Đào tạo Quốc tế
              </div>
              <div className={cx("list-department-position")}>
                Ngành: Công nghệ phần mềm CMU
              </div>
            </div>
            <div className={cx("user-list-email")}>
              Email: Enguyenvana@gmail.com
            </div>
          </div>
          <div className={cx("user-list-button")}>
            <button>Theo dõi</button>
          </div>
        </div>
        <div className={cx("user-body-list")}>
          <div className={cx("user-list-img")}>
            <img src={UserAvatar} alt="avartar" />
          </div>
          <div className={cx("user-list-info")}>
            <div className={cx("user-list-name")}>
              <div className={cx("list-name-text")}>Nguyễn Văn A</div>
              <div className={cx("list-name-position")}>Chức vụ:Giảng Viên</div>
            </div>
            <div className={cx("user-list-department")}>
              <div className={cx("list-department-text")}>
                Khoa: Đào tạo Quốc tế
              </div>
              <div className={cx("list-department-position")}>
                Ngành: Công nghệ phần mềm CMU
              </div>
            </div>
            <div className={cx("user-list-email")}>
              Email: Enguyenvana@gmail.com
            </div>
          </div>
          <div className={cx("user-list-button")}>
            <button>Theo dõi</button>
          </div>
        </div> */}
      </div>
      <div className={cx("search-user-footer")}>
        <Pagination
          count={alphabet.length}
          defaultPage={1}
          siblingCount={7}
          onChange={handlePageChange}
          variant="outlined"
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
  );
};

export default SearchUserComponents;
