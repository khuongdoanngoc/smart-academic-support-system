import classnames from "classnames/bind";
import styles from "./ProfileAuthorComponents.module.scss";
import Avatar from "../../../assets/images/avatar.png";
import File from "../../../assets/images/File_dock.svg";
import EditIcon from "../../../assets/images/edit-05.png";
import ImportLight from "../../../assets/images/Import_light.png";
import Share from "../../../assets/images/fi_share-2.png";
import Delect from "../../../assets/images/plus-01.png";
import { Button } from "../../../components/Button";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  DocumentDtos,
  FollowAuthorAction,
  getAllDocumentsByAccountAction,
  UnFollowAuthorAction,
  ViewProfileAuthorByEmailAction,
} from "../../../redux/ProfileAuthorSlice/ProfileAuthorSlice";
import { useGlobalContextLoin } from "../../../layouts/useContext";
import { DownloadDocumentAction } from "../../../redux/DocumentSlice/documentSlice";
import Loader from "../../../components/Loader/Loader";

const cx = classnames.bind(styles);

const ProfilePersonalComponents = () => {
  const alphabet = Array.from("1234567");
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [shareAnimation, setShareAnimation] = useState<boolean>(false);
  const [shareCloseAnimation, setShareCloseAnimation] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { viewProfile, isloading } = useAppSelector(
    (state) => state.profileAuthor
  );
  const fullname = useAppSelector((state) => state.authentication.username);
  const [emailUser, setEmailUser] = useState("");

  useEffect(() => {
    const stogeEmail = sessionStorage.getItem("userEmail");
    if (stogeEmail) {
      try {
        dispatch(ViewProfileAuthorByEmailAction(stogeEmail));
        setEmailUser(stogeEmail);
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);

  const { setIsFormLogin } = useGlobalContextLoin();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if(!isloading){ 
      const data= {
        email: emailUser,
        pageNum: value,
        pageSize: 10
      }
      dispatch(getAllDocumentsByAccountAction(data));
    }
  };
  const filteredDataList = (data: DocumentDtos[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const handleFollow = () => {
    if(viewProfile){
      if ( viewProfile.isFollow) {
        dispatch(UnFollowAuthorAction(emailUser));
      } else {
        dispatch(FollowAuthorAction(emailUser));
      }
    }
  };

  const handleDownLoad = async (docId: number) => {
    await dispatch(DownloadDocumentAction({ fullname, docId })).unwrap();
  };
  const handleOpenShare = () => {
    setIsOpenShare(!isOpenShare);
    setIsFormLogin(true);
    setShareAnimation(!shareAnimation);
    setShareCloseAnimation(false);
  };
  // console.log(shareCloseAnimation);

  const handleCloseShare = () => {
    setShareCloseAnimation(true);
    setTimeout(() => {
      setIsOpenShare(false);
    }, 1000);
    setShareAnimation(false);
  };

  return (
    <div className={cx("author-component")}>
      {viewProfile == null ? (
        <Loader height={20} />
      ) : (
        <>
          <div className={cx("author-component-information")}>
            <div className={cx("component-information-left")}>
              <div className={cx("information-left-profile")}>
                <div className={cx("left-profile-author")}>
                  <div className={cx("author-name")}>
                    <img src={Avatar} />
                    <div>
                      <h3>
                        {viewProfile.firstName} {viewProfile.lastName}
                      </h3>
                      <p>
                        {viewProfile.major
                          ? viewProfile.major
                          : "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                  <div className={cx("author-follow")}>
                    <div>
                      <p>{viewProfile.follower}</p>
                      <p>Followers</p>
                    </div>
                    <div>
                      <p>{viewProfile.following}</p>
                      <p>Following</p>
                    </div>
                  </div>
                </div>
                <div className={cx("left-profile-button")}>
                  {isloading ? (
                    <div className={cx("loader")}></div>
                  ) : (
                    <Button
                      text={viewProfile.isFollow ? "Un following" : "+ Follow"}
                      paddingX={29}
                      paddingY={6}
                      fontSize={16}
                      onClick={handleFollow}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={cx("component-information-right")}>
              <h4>Thông tin</h4>
              <div className={cx("information-right-item")}>
                <div>
                  <p>
                    Chức vụ :{" "}
                    {viewProfile.roles[0] === "LECTURER"
                      ? "Giảng viên"
                      : "Sinh viên"}
                  </p>
                  <p>
                    Khoa:{" "}
                    {viewProfile.facultyName
                      ? viewProfile.facultyName
                      : "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <p>
                    Chuyên ngành:{" "}
                    {viewProfile.major ? viewProfile.major : "Chưa cập nhật"}
                  </p>
                  {viewProfile.enrollmentYear !== null ? <p>Khóa: 27</p> : ""}
                </div>
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
                  <h4>Tài liệu của {viewProfile.lastName}</h4>
                </div>
                <div className={cx("top-table-total")}>
                  <div>
                    <span>{viewProfile.totalDocument}</span>
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
                  {filteredDataList(viewProfile.documentDtos).map((data) => (
                    <div className={cx("bottom-list-item")} key={data.docId}>
                      <div className={cx("list-item-left")}>
                        <img src={File} alt="file" />
                        <p>{data.title}</p>
                      </div>
                      <div className={cx("list-item-right")}>
                        <img
                          src={ImportLight}
                          alt="down"
                          onClick={() => handleDownLoad(data.docId)}
                        />
                        <img
                          src={Share}
                          alt="share"
                          onClick={() => handleOpenShare()}
                        />
                        <img src={EditIcon} alt="EditIcon" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {isOpenShare && (
                <div
                  className={cx(
                    "file-bottom-share",
                    shareCloseAnimation && "home-close-animation",
                    shareAnimation && "home-animation"
                  )}
                >
                  <div className={cx("bottom-share-title")}>
                    <div className={cx("share-title-header")}>
                      <h3>Chia sẻ tài liệu này</h3>
                      {/* <div> */}
                      <img
                        src={Delect}
                        alt="Delect"
                        onClick={() => handleCloseShare()}
                      />
                      {/* </div> */}
                    </div>
                    <div className={cx("share-title-content")}>
                      <div className={cx("title-content-email")}>
                        <div>
                          <p>Chia sẻ liên kết qua email</p>
                        </div>
                        <button className={cx("content-email-button")}>
                          Gửi Email
                        </button>
                      </div>
                      <div className={cx("title-content-url")}>
                        <h4>URL tài liệu</h4>
                        <p>
                          http://duytanforyou.com/vn/12345678/do-an-cdio-2024/...
                        </p>
                      </div>
                      <div className={cx("title-content-copy")}>
                        <button className={cx("button-coppy")}>
                          Sao chép đường liên kết
                        </button>
                        <button className={cx("button-finished")}>Xong</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={cx("conponent-file-slide")}>
              <Pagination
                count={viewProfile.totalPage}
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
        </>
      )}
    </div>
  );
};
export default ProfilePersonalComponents;
