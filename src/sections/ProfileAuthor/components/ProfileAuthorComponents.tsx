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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { FollowProFileAction } from "../../../redux/EditProFileSlice/EditProFileSlice";
import { DownloadDocumentAction } from "../../../redux/ProfileAuthorSlice/ProfileAuthorSlice";
import { useGlobalContextLoin } from "../../../layouts/useContext";
// import { RootState } from "@reduxjs/toolkit/query";
const cx = classnames.bind(styles);
interface Subject {
  id: number;
  title: string;
}
interface FollowButtonProps {
  userId: number;
}

const fakeSubjects: Subject[] = [
  {
    id: 1,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 1",
  },
  {
    id: 2,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 2",
  },
  {
    id: 3,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 3",
  },
  {
    id: 4,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 4",
  },
  {
    id: 5,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 5",
  },
  {
    id: 6,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 6",
  },
  {
    id: 7,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 7",
  },
  {
    id: 8,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 8",
  },
  {
    id: 9,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 9",
  },
  {
    id: 10,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 10",
  },
  {
    id: 11,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024...11",
  },
  {
    id: 12,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 12",
  },
  {
    id: 13,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 13",
  },
  {
    id: 14,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 14",
  },
  {
    id: 15,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 15",
  },
  {
    id: 16,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 16",
  },
  {
    id: 17,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 17",
  },
  {
    id: 18,
    title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 18",
  },
];

const ProfilePersonalComponents = ({ userId }: FollowButtonProps) => {
  const alphabet = Array.from("1234567");
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [shareAnimation, setShareAnimation] = useState<boolean>(false);
  const [shareCloseAnimation, setShareCloseAnimation] =
    useState<boolean>(false);
  const { isLoading } = useSelector((state: RootState) => state.editProFile);
  const dispatch = useDispatch<AppDispatch>();
  // const [listItemFile, setListItemFile] = useState(4);
  const { setIsFormLogin } = useGlobalContextLoin();
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const filteredDataList = (data: Subject[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handleFollow = () => {
    dispatch(FollowProFileAction(userId)).unwrap();
  };
  const handleDownLoad = (id: number) => {
    dispatch(DownloadDocumentAction(id)).unwrap();
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
  const totalFile = fakeSubjects.length;
  // const isShare = shareCloseAnimation && true;

  return (
    <div className={cx("author-component")}>
      <div className={cx("author-component-information")}>
        <div className={cx("component-information-left")}>
          <div className={cx("information-left-profile")}>
            <div className={cx("left-profile-author")}>
              <div className={cx("author-name")}>
                <img src={Avatar} />
                <div>
                  <h3>Nguyen Quoc Huy</h3>
                  <p>Software Technology CMU</p>
                </div>
              </div>
              <div className={cx("author-follow")}>
                <div>
                  <p>0</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p>0</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
            <div className={cx("left-profile-button")} onClick={handleFollow}>
              <Button
                text={isLoading ? "Following..." : "+ Follow"}
                paddingX={29}
                paddingY={6}
                fontSize={16}
              />
            </div>
          </div>
        </div>
        <div className={cx("component-information-right")}>
          <h4>Thông tin</h4>
          <div className={cx("information-right-item")}>
            <div>
              <p>Chức vụ :Sinh viên</p>
              <p>Khoa: Đào tạo quốc tế</p>
            </div>
            <div>
              <p>Chuyên ngành: Công nghệ Phần mềm CMU</p>
              <p>Khóa: 27</p>
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
              {filteredDataList(fakeSubjects).map((data) => (
                <div className={cx("bottom-list-item")} key={data.id}>
                  <div className={cx("list-item-left")}>
                    <img src={File} alt="file" />
                    <p>{data.title}</p>
                  </div>
                  <div className={cx("list-item-right")}>
                    <img
                      src={ImportLight}
                      alt="down"
                      onClick={() => handleDownLoad(data.id)}
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
export default ProfilePersonalComponents;
