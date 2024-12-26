import classNames from "classnames/bind";
import styles from "./EditDocumentComponents.module.scss";

// import arrowUp from "../../../assets/images/arrow-up-dashed-square--arrow-keyboard-button-up-square-dashes.png";
// import Delfile from "../../../assets/images//browser-delete--app-code-apps-fail-delete-window-remove-cross.png";
import * as React from "react";
import arrowUp from "../../../assets/images/arrow-up-dashed-square--arrow-keyboard-button-up-square-dashes.png";
import { useState, useCallback, useEffect } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { HeaderUploadFile } from "../../../layouts/header/HeaderUploadFile";

import {
  clearSearchFaculty,
  clearSearchSubject,
  SearchFacultyAction,
  SearchSubjectAction,
} from "../../../redux/UploadFileSlice/uploadFileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../../redux/store";
import { debounce } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EditDocumentAction,
  ResetEditDocumentSuccess,
} from "../../../redux/EditDocumentSlice/EditDocumentSlice";

const cx = classNames.bind(styles);
const EditDocumentComponents = () => {
  const [menuCheckItemRow, setmenuCheckItemRow] = useState(false); //trạng thải ẩn và hiện của nút button tn hay tl

  // const [descriptionFile, setDescriptionFile] = useState("");
  // const [subjectFile, setSubjectFile] = useState("");
  // const [facultyFile, setFacultyFile] = useState("");
  // const [folderFile, setFolderFile] = useState("");
  // const [titleFile, setTitleFile] = useState(fileList[0]?.name || "");

  const dispatch = useDispatch<AppDispatch>();

  // const handleSearchTitle = (value: string) => {
  //   setTitleFile(value);
  // };

  const searchFaculty =
    useAppSelector((state: RootState) => state.uploadFile.searchFaculty) || []; //use selector hiển thị kết quả tìm kiếm chuyên ngành
  const searchSubject =
    useSelector((state: RootState) => state.uploadFile.searchSubject) || []; //use selector hiển thị kết quả tìm kiếm môn học

  const debounceSearchFaculty = useCallback(
    debounce(
      (value: string) => dispatch(SearchFacultyAction(value)).unwrap(),
      1000
    ),
    [dispatch, SearchFacultyAction]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchSubject = useCallback(
    debounce(
      (value: string) => dispatch(SearchSubjectAction(value)).unwrap(),
      1000
    ),
    [dispatch, SearchSubjectAction]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClearFaculty = useCallback(
    debounce(() => dispatch(clearSearchFaculty()), 1000),
    [dispatch, clearSearchFaculty]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClearSubject = useCallback(
    debounce(() => dispatch(clearSearchSubject()), 1000),
    [dispatch, clearSearchSubject]
  );
  // const { editDocument } = useAppSelector(
  //   (state: RootState) => state.editDocument
  // );
  const location = useLocation();
  const navigate = useNavigate();

  const { fileData, avatar } = location.state || {
    fileData: null,
    avatar: null,
  };

  const [formData, setFormData] = useState({
    docId: fileData?.docId,
    title: fileData?.title,
    description: fileData?.description || "",
    type: fileData?.type || "",
    subjectName: fileData?.subjectName || "",
    facultyName: fileData?.facultyName || "",
  });

  console.log("fileData", fileData);

  const handleSearchFaculty = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    if (!value.trim()) {
      debounceClearFaculty();
      setFormData((prev) => ({
        ...prev,
        facultyName: "",
      }));
      return;
    }
    try {
      debounceSearchFaculty(value);
    } catch (error) {
      console.error(error);
    }
    setFormData((prev) => ({
      ...prev,
      facultyName: value,
    }));
  };
  const handleSearchSubject = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    if (!value.trim()) {
      debounceClearSubject();
      setFormData((prev) => ({
        ...prev,
        subjectName: "",
      }));
      return;
    }
    try {
      debounceSearchSubject(value);
    } catch (error) {
      console.error(error);
    }
    setFormData((prev) => ({
      ...prev,
      subjectName: value,
    }));
  };
  // console.log("fi", fileData);

  // console.log("formData.facultyName", formData.facultyName);
  // console.log("formData.subjectName", formData.subjectName);
  // console.log("formData.title", formData.title);
  // console.log("formData.type", formData.type);
  // console.log("formData.type", formData.type);
  // console.log("formData.description", formData.description);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeItemRow = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));

    setmenuCheckItemRow(false);
  };
  const handleMenuCheckItemRow = () => {
    setmenuCheckItemRow(!menuCheckItemRow);
  };
  const { success, loading } = useAppSelector(
    (state: RootState) => state.editDocument
  );
  const handleDefaultUpload = () => {
    // console.log("formData handleDefaultUpload ", formData);
    dispatch(EditDocumentAction(formData));
  };
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        navigate("/document/profile-personal");
        dispatch(ResetEditDocumentSuccess());
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [success, navigate, dispatch]);
  return (
    <div className={cx("file-component-main")}>
      <HeaderUploadFile avatar={avatar} />
      <div className={cx("component-main-body")}>
        <form className={cx("body-center-detail")}>
          <div className={cx("center-detail-upload")}>
            <div className={cx("detail-upload-border")}></div>
            <div className={cx("detail-upload-body")}>
              <div className={cx("upload-body-list")}>
                <p>Chuyên ngành</p>
                <div className={cx("list-item-search")}>
                  <input
                    type="text"
                    placeholder="Nhập mã hoặc tên chuyên ngành"
                    name="facultyName"
                    value={formData?.facultyName}
                    onChange={handleSearchFaculty}
                  />
                  {formData?.facultyName && searchFaculty?.length > 0 && (
                    <div className={cx("search-results")}>
                      <ul>
                        {searchFaculty.map((result, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                facultyName: result.facultyName,
                              }));
                              dispatch(clearSearchFaculty());
                            }}
                          >
                            {result.facultyName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className={cx("upload-body-list")}>
                <p>Môn học</p>
                <div className={cx("list-item-search")}>
                  <input
                    type="text"
                    placeholder="Nhập mã hoặc tên môn học"
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleSearchSubject}
                  />
                  {formData?.subjectName && searchSubject?.length > 0 && (
                    <div className={cx("search-results")}>
                      <ul>
                        {searchSubject.map((result, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                subjectName: result.subjectName,
                              }));
                              dispatch(clearSearchSubject());
                            }}
                          >
                            {result.subjectName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={cx("detail-upload-border")}></div>
            <div className={cx("detail-upload-body")}>
              <div className={cx("upload-body-list")}>
                <p>Loại tài liệu</p>
                <div className={cx("body-list-item")}>
                  <input
                    type="text"
                    readOnly
                    placeholder="Trắc nghiệm hoặc tự luận"
                    value={
                      formData?.type === "tự luận" ? "Tự luận" : "Trắc nghiệm"
                    }
                    name="type"
                  />

                  <p onClick={handleMenuCheckItemRow}>
                    {menuCheckItemRow ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </p>
                </div>
                {menuCheckItemRow && (
                  <div className={cx("list-item-row")}>
                    <ul>
                      <li onClick={() => handleChangeItemRow("trắc nghiệm")}>
                        Trắc nghiệm
                      </li>
                      <li onClick={() => handleChangeItemRow("tự luận")}>
                        Tự luận
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className={cx("upload-body-list")}>
                <p>Tiêu đề</p>
                <input
                  type="text"
                  // placeholder={fileData?.title}
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className={cx("upload-body-list")}>
                <p>Mô tả</p>
                <textarea
                  // placeholder={fileData.description}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className={cx("main-body-button")}
                onClick={handleDefaultUpload}
                type="button"
              >
                <div>
                  <img src={arrowUp} />
                  <span>{loading ? "Đang cập nhật" : "Cập nhật tài liệu"}</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditDocumentComponents;
