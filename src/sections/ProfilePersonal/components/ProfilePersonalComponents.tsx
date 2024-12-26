import classnames from "classnames/bind";
import styles from "./ProfilePersonalComponents.module.scss";

import File from "../../../assets/images/File_dock.svg";
import EditIcon from "../../../assets/images/edit-05.png";
import ImportLight from "../../../assets/images/Import_light.png";
import Edit from "../../../assets/images/edit-06.png";
import Share from "../../../assets/images/fi_share-2.png";
import avartar from "../../../assets/images/Frame 8720.png";

// import { Button } from "../../../components/Button";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
// // import { SearchFolderAction } from "../../../redux/UploadFileSlice/uploadFileSlice";
// import { SearchDocProfilePersonalAPI } from "../../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import {
  GetProFileAction,
  GetProFilePageAction
  // ViewProfilePersonalByEmailAction,
} from "../../../redux/ProfilePersonalSlice/ProfilePersonalSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DownloadDocumentAction } from "../../../redux/DocumentSlice/documentSlice";
import { GetDocument } from "../../../services/DocumentAPI/DocumentAPI";
import { GetProfileRequest } from "../../../services/ProfilePersonalAPI/ProfilePersonalAPI";
import Loader from "../../../components/Loader/Loader";
import { useSharingModal } from "../../../contexts/SharingModalContext";
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
  const [emailUser, setEmailUser] = useState("");
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debounceSearch = useCallback(
  //   debounce((name: string) => dispatch(SearchDocPersonalAction(name)), 1000),
  //   [dispatch]
  // );
  // const filteredDataList = useCallback(
  //   (data: GetDocument[]) => {
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     return data.slice(startIndex, endIndex);
  //   },
  //   [currentPage, itemsPerPage]
  // );

  const { getUserProfile, loading } = useSelector(
    (state: RootState) => state.profilePersonal
  );
  useEffect(() => {
    dispatch(GetProFileAction());
  }, [dispatch]);

  useEffect(() => {
    if (getUserProfile?.email) {
      sessionStorage.setItem("email", getUserProfile.email);
      setEmailUser(getUserProfile.email);
    }
  }, [getUserProfile]);


      // configs cho nút chia sẻ
      const { openSharingModal, setUrl } = useSharingModal();
      const handleOpenModal = (id: number) => {
          setUrl(`${import.meta.env.VITE_CLIENT_URL}/document/${id}`);
          openSharingModal();
      };
  

  // useEffect(() => {
  //   if (emailUser) {
  //     try {
  //       dispatch(ViewProfilePersonalByEmailAction(emailUser));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [dispatch, emailUser]);

  // const [dataList, setDataList] = useState<GetDocument[]>(
  //   getUserProfile?.documentDtos || []
  // );
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

    if (!loading) {
      value = value - 1;
      const data = {
        email: emailUser,
        pageNum: value,
        pageSize: 10,
      };
      // console.log("value", value);

      dispatch(GetProFilePageAction(data));
    }
  };

  // const totalFile = dataList.length;

  // const handleSearchDoc = async (name: string) => {
  //   try {
  //     debounceSearch(name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(getUserProfile);

  // const username = `${getUserProfile?.firstName}${getUserProfile?.lastName}`;
  const username = useAppSelector((state) => state.authentication.username);
  const handleEditClick = () => {
    navigate("/document/edit-profile", { state: { useData: getUserProfile } });
  };
  const handleDownloadDocuments = (documentId: number) => {
    dispatch(DownloadDocumentAction({ documentId, username }));
  };
  const handleChangeEditUpload = (
    data: GetDocument,
    useData: GetProfileRequest
  ) => {
    console.log("handleChangeEditUpload", data);

    navigate("/document/edit-document-file", {
      state: { fileData: data, avatar: useData },
    });
  };
  return (
    <div className={cx("author-component")}>
      <div className={cx("author-component-information")}>
        <div className={cx("component-information-left")}>
          <div className={cx("information-left-profile")}>
            <div className={cx("left-profile-author")}>
              <div className={cx("author-name")}>
                <img src={getUserProfile?.profilePicture || avartar} />
                <div>
                  <h3>
                    {getUserProfile?.firstName} {getUserProfile?.lastName}
                  </h3>
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
                    ? "Giảng viên"
                    : "Sinh viên"}
                </p>
                <p>Khoa:{getUserProfile?.facultyName || "Chưa cập nhật"} </p>
              </div>
              <div>
                <p>Chuyên ngành: {getUserProfile?.major || "Chưa cập nhật"}</p>
                <p>
                  Khóa:
                  {getUserProfile?.classNumber && getUserProfile.classNumber!=="null"
                    ? `K${getUserProfile.classNumber}`
                    : "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>
          {/* <div className={cx("information-right-search")}>
            <input
              type="text"
              placeholder={`Tìm kiếm tài liệu của ${getUserProfile?.lastName} `}
              onChange={(e) => handleSearchDoc(e.target.value)}
            />
            <SearchIcon className={cx("search-icon")} />
          </div> */}
        </div>
      </div>
      {loading ? (
        <Loader height={1} />
      ) : (
        <div className={cx("author-component-file")}>
          <div className={cx("component-title-top")}>
            <div className={cx("file-top-title")}>
              <h3>THỐNG KÊ</h3>
            </div>
            <div className={cx("file-top-table")}>
              <div className={cx("top-table-name")}>
                <h4>Tài liệu của {getUserProfile?.lastName}</h4>
              </div>
              <div className={cx("top-table-total")}>
                <div>
                  <span>{getUserProfile?.totalDocument}</span>
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
                {getUserProfile?.documentDtos.map((data) => (
                  <div className={cx("bottom-list-item")} key={data.docId}>
                    <div className={cx("list-item-left")}>
                      <img src={File} alt="file" />
                      <Link style={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#DC4342',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }} to={`/document/${data.docId}`}>{data.title}</Link>
                    </div>
                    <div className={cx("list-item-right")}>
                      <img
                        src={ImportLight}
                        alt="down"
                        onClick={() => handleDownloadDocuments(data.docId)}
                      />
                      <img onClick={() => handleOpenModal(data.docId)} src={Share} alt="share" />
                      <img
                        src={EditIcon}
                        alt="EditIcon"
                        onClick={() =>
                          handleChangeEditUpload(data, getUserProfile)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("conponent-file-slide")}>
            <Pagination
              count={getUserProfile?.totalPage}
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
      )}
    </div>
  );
};
export default ProfileAuthorComponent;
