/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./DocumentHeader.module.scss";
const cx = classNames.bind(styles);
import SearchIcon from "@mui/icons-material/Search";
import VietnameseIcon from "../../../assets/images/vietnamese.icon.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { LogoutAction } from "../../../redux/AuthenticationSlice/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { clearDocumentSearch, getDocumentByTitle } from "../../../redux/DocumentSlice/documentSlice";
import { DocumentResponse } from "../../../redux/DocumentSlice/InterfaceResponse";

export default function DocumentHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLogined } = useAppSelector((state) => state.authentication);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { DocumentsSearch, isSearching } = useAppSelector(
    (state) => state.document
  );
  const searchRef= useRef<HTMLDivElement>(null);

  const handleClickLogout = () => {
    if (isLogined) {
      dispatch(LogoutAction());
    } else {
      navigate("/login");
    }
  };
  const debounceSearch = useCallback(
    debounce((value: string) => {
      return dispatch(getDocumentByTitle(value));
    }, 1000),
    [dispatch]
  );

  // Xử lý tìm kiếm
  const handleSearching = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
    setIsModalOpen(true);
  };
  
  const handleClickSearchItem= (item: DocumentResponse)=>{
    setSearchTerm("");
    setIsModalOpen(false);
    dispatch(clearDocumentSearch());
    console.log(item);
    
  }

  useEffect(()=>{
    function handleClickOutside(event: any) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
        setIsModalOpen(false);
        dispatch(clearDocumentSearch());
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[dispatch]);
  return (
    <div className={cx("document-header")}>
      <a href="/document">
        <h1 className={cx("logo")}>
          DTU<span>DOCUMENT</span>
        </h1>
      </a>
      <div className={cx("search")}>
        <form>
          <input
            value={searchTerm}
            onChange={handleSearching}
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
      {isModalOpen && (
        <div className={cx("modal")} ref={searchRef}>
          <div
            className={cx("modal__content")}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Kết quả tìm kiếm:</h2>

            {isSearching ? (
              <div className={cx("loader")}></div>
            ) : DocumentsSearch && DocumentsSearch.length > 0 ? (
              <ul>
                {DocumentsSearch.map((item, index) => (
                  <li key={index} onClick={()=>handleClickSearchItem(item)}>{item.title}</li>
                ))}
              </ul>
            ) : (
              <p>Không tìm thấy kết quả phù hợp.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
