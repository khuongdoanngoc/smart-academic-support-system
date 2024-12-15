import classnames from "classnames/bind";
import styles from "./SearchUserComponents.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import UserAvatar from "../../../assets/images/avatar.png";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  clearSearchUser,
  SearchUserAction,
} from "../../../redux/SearchUserSlice/SearchUserSlice";
import { SearchInterface } from "../../../services/SearchUserAPI/SearchUserApi";
import { useNavigate } from "react-router-dom";


const cx = classnames.bind(styles);
//   id: number;
//   name: string;
//   position: string;
//   department: string;
//   major: string;
//   email: string;
// }
// const fakeSubjects: Subject[] = [
//   {
//     id: 1,
//     name: "Nguyễn Văn A",
//     position: "Giảng Viên",
//     department: "Đào tạo Quốc tế",
//     major: "Công nghệ phần mềm CMU",
//     email: "Enguyenvana@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Nguyễn Văn A",
//     position: "Giảng Viên",
//     department: "Đào tạo Quốc tế",
//     major: "Công nghệ phần mềm CMU",
//     email: "Enguyenvana@gmail.com",
//   },
//   {
//     id: 3,
//     name: "Nguyễn Văn A",
//     position: "Giảng Viên",
//     department: "Đào tạo Quốc tế",
//     major: "Công nghệ phần mềm CMU",
//     email: "Enguyenvana@gmail.com",
//   },
//   {
//     id: 4,
//     name: "Nguyễn Văn A",
//     position: "Giảng Viên",
//     department: "Đào tạo Quốc tế",
//     major: "Công nghệ phần mềm CMU",
//     email: "Enguyenvana@gmail.com",
//   },
//   {
//     id: 5,
//     name: "Nguyễn Văn A",
//     position: "Giảng Viên",
//     department: "Đào tạo Quốc tế",
//     major: "Công nghệ phần mềm CMU",
//     email: "Enguyenvana@gmail.com",
//   },
// ];
const SearchUserComponents = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const alphabet = Array.from("1234567");
  const dispatch = useAppDispatch();
  const navigate =useNavigate();
  const {listSearch}:{listSearch:SearchInterface[]} =useAppSelector((state) => state.searchUser);


  console.log(listSearch);
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    debounceSearch(searchTerm, itemsPerPage, value); 
  };

  const filteredDataList = (data: SearchInterface[]) => {
    if (!Array.isArray(data)) {
      return [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch=useCallback(debounce((value:string,pageSize:number,pageNum:number)=>dispatch(SearchUserAction({name:value,pageSize,pageNum})),1000),[dispatch])
  const handleChangeSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      dispatch(clearSearchUser());
      return;
    }
    try {
      debounceSearch(value,itemsPerPage,currentPage)
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigateUser = (email: string, userName:string) => {
    try {
      sessionStorage.setItem("userEmail",email)
      navigate(`/document/profile-author/${userName}`) 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("search-user")}>
      <div className={cx("search-user-header")}>
        <div className={cx("user-header-title")}>TÌM KIẾM NGƯỜI DÙNG</div>
        <div className={cx("user-header-search")}>
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <SearchIcon className={cx("search-icon")} />
        </div>
      </div>
      <div className={cx("search-user-body")}>
        {filteredDataList(listSearch).map((item,index) => (
          <div className={cx("user-body-list")}  key={index} onClick={() => handleNavigateUser(item.email,item.firstName.concat(item.lastName))} >
            <div className={cx("user-list-img")}>
              <img src={UserAvatar} alt="avartar" />
            </div>
            <div className={cx("user-list-info")}>
              <div className={cx("user-list-name")}>
                <div className={cx("list-name-text")}>{`${item.lastName} ${item.firstName}`}</div>
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
        ))}
        
      </div>
      {
        listSearch.length >0 && 
      <div className={cx("search-user-footer")}>
        <Pagination
         count={alphabet.length}
          page={currentPage}
          siblingCount={1}
         
          onChange={handlePageChange}
          variant="outlined"
          renderItem={(item: PaginationRenderItemParams) => (
            <PaginationItem
              sx={{
                margin: "0 6px",
                fontFamily: "Inter",
              }}
              {...item}
              // page={item.page ? alphabet[item.page - 1] : null}
            />
          )}
        />
      </div>
      }
    </div>
  );
};

export default SearchUserComponents;
