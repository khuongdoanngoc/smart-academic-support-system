import classnames from "classnames/bind";
import styles from "./ProfilePersonalComponents.module.scss";

import File from "../../../assets/images/File_dock.svg";
import EditIcon from "../../../assets/images/edit-05.png";
import ImportLight from "../../../assets/images/Import_light.png";
import Edit from "../../../assets/images/edit-06.png";
import Share from "../../../assets/images/fi_share-2.png";
import SearchIcon from "@mui/icons-material/Search";
import avartar from "../../../assets/images/Frame 8720.png";

// import { Button } from "../../../components/Button";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { RootState, useAppDispatch } from "../../../redux/store";
// // import { SearchFolderAction } from "../../../redux/UploadFileSlice/uploadFileSlice";
// import { SearchDocProfilePersonalAPI } from "../../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import {
  GetProFileAction,
  SearchDocPersonalAction,
} from "../../../redux/ProfilePersonalSlice/ProfilePersonalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DownloadDocumentAction,
  GetDocumentSizeAction,
  // GetDocumentStogeAction,
} from "../../../redux/DocumentSlice/documentSlice";
import { GetDocument } from "../../../services/DocumentAPI/DocumentAPI";
const cx = classnames.bind(styles);
// interface Subject {
//   id: number;
//   title: string;
// }

// const fakeSubjects: Subject[] = [
//   {
//     id: 1,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 1",
//   },
//   {
//     id: 2,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 2",
//   },
//   {
//     id: 3,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 3",
//   },
//   {
//     id: 4,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 4",
//   },
//   {
//     id: 5,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 5",
//   },
//   {
//     id: 6,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 6",
//   },
//   {
//     id: 7,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 7",
//   },
//   {
//     id: 8,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 8",
//   },
//   {
//     id: 9,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 9",
//   },
//   {
//     id: 10,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 10",
//   },
//   {
//     id: 11,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024...11",
//   },
//   {
//     id: 12,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 12",
//   },
//   {
//     id: 13,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 13",
//   },
//   {
//     id: 14,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 14",
//   },
//   {
//     id: 15,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 15",
//   },
//   {
//     id: 16,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 16",
//   },
//   {
//     id: 17,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 17",
//   },
//   {
//     id: 18,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 18",
//   },
// ];

const ProfileAuthorComponent = () => {
  const alphabet = Array.from("1234567");
  const navigate = useNavigate();
  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((name: string) => dispatch(SearchDocPersonalAction(name)), 1000),
    [dispatch]
  );
  // const filteredDataList = useCallback(
  //   (data: GetDocument[]) => {
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     return data.slice(startIndex, endIndex);
  //   },
  //   [currentPage, itemsPerPage]
  // );

  const { getUserProfile } = useSelector(
    (state: RootState) => state.profilePersonal
  );

  const [dataList, setDataList] = useState<GetDocument[]>(
    getUserProfile?.documentDtos || []
  );
  // const [filteredData, setFilteredData] = useState<GetDocument[]>([]);

  // useEffect(() => {
  //   // Lấy dữ liệu ban đầu từ getUserProfile
  //   setFilteredData(filteredDataList(dataList));
  // }, [dataList, filteredDataList]);
  // console.log("filteredData", filteredData);
  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // setCurrentPage(value);
    const data = await dispatch(GetDocumentSizeAction({ pageNum: value }));

    if (data && data.payload) {
      const newDocumentList = data.payload || [];

      setDataList(newDocumentList);
      // setFilteredData(filteredDataList(newDocumentList));
    }
  };

  const totalFile = dataList.length;

  const handleSearchDoc = async (name: string) => {
    try {
      debounceSearch(name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(GetProFileAction());
  }, [dispatch]);

  const username = `${getUserProfile?.firstName}${getUserProfile?.lastName}`;
  const handleEditClick = () => {
    navigate("/document/edit-profile", { state: { useData: getUserProfile } });
  };
  const handleDownloadDocuments = (docId: number) => {
    dispatch(DownloadDocumentAction({ username, docId }));
  };
  const handleChangeEditUpload = (data: GetDocument) => {
    console.log("n");

    navigate(`/document/upload-file`, { state: { fileData: data } });
  };
  console.log("getUserProfile", getUserProfile);

  return (
    <div className={cx("author-component")}>
      <div className={cx("author-component-information")}>
        <div className={cx("component-information-left")}>
          <div className={cx("information-left-profile")}>
            <div className={cx("left-profile-author")}>
              <div className={cx("author-name")}>
                <img src={getUserProfile?.profilePicture || avartar} />
                <div>
                  <h3>{username}</h3>
                  <p>{getUserProfile?.major}</p>
                </div>
              </div>
              <div className={cx("author-follow")}>
                <div>
                  <p>{getUserProfile?.follower}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p>{getUserProfile?.following}</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("component-information-right")}>
          <div className={cx("information-right-title")}>
            <div className={cx("right-title-text")}>
              <h4>Thông tin</h4>
              <img src={Edit} alt="edit" onClick={handleEditClick} />
            </div>
            <div className={cx("information-right-item")}>
              <div>
                <p>
                  Chức vụ :
                  {getUserProfile?.role === "LECTURER"
                    ? "Sinh viên"
                    : "Giảng viên"}
                </p>
                <p>Khoa:{getUserProfile?.facultyName}</p>
              </div>
              <div>
                <p>Chuyên ngành: {getUserProfile?.major}</p>
                <p>Khóa:K{getUserProfile?.classNumber}</p>
              </div>
            </div>
          </div>
          <div className={cx("information-right-search")}>
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu của Huy"
              onChange={(e) => handleSearchDoc(e.target.value)}
            />
            <SearchIcon className={cx("search-icon")} />
          </div>
        </div>
      </div>
      <div className={cx("author-component-file")}>
        <div className={cx("component-title-top")}>
          <div className={cx("file-top-title")}>
            <h3>THỐNG KÊ</h3>
          </div>
          <div className={cx("file-top-table")}>
            <div className={cx("top-table-name")}>
              <h4>Tài liệu của Huy</h4>
            </div>
            <div className={cx("top-table-total")}>
              <div>
                <span>{totalFile}</span>
                <p>Đã tải lên</p>
              </div>
              <div>
                <span>0</span>
                <p>Đã lưu</p>
              </div>
              <div>
                <span>0</span>
                <p>Đã gắn thẻ</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("conponent-file-bottom")}>
          <div className={cx("file-bottom-title")}>
            <h3>TÀI LIỆU ĐÃ TẢI LÊN</h3>
          </div>
          <div className={cx("file-bottom-list")}>
            <div className={cx("bottom-list-title")}>
              <p>Tiêu đề tài liệu</p>
              <p>Chức năng</p>
            </div>
            <div className={cx("bottom-list-table")}>
              {dataList.map((data) => (
                <div className={cx("bottom-list-item")} key={data.docId}>
                  <div className={cx("list-item-left")}>
                    <img src={File} alt="file" />
                    <p>{data.title}</p>
                  </div>
                  <div className={cx("list-item-right")}>
                    <img
                      src={ImportLight}
                      alt="down"
                      onClick={() => handleDownloadDocuments(data.docId)}
                    />
                    <img src={Share} alt="share" />
                    <img
                      src={EditIcon}
                      alt="EditIcon"
                      onClick={() => handleChangeEditUpload(data)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("conponent-file-slide")}>
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
    </div>
  );
};
export default ProfileAuthorComponent;
