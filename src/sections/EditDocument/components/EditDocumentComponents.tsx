import classNames from "classnames/bind";
import styles from "./EditDocumentComponents.module.scss";
import Vector1 from "../../../assets/images/Vector 9.png";
import Vector2 from "../../../assets/images/Vector 114.png";
import logoSuccess from "../../../assets/images/fa7c78e152e8e8d45fafa21dc604d937.gif";
// import arrowUp from "../../../assets/images/arrow-up-dashed-square--arrow-keyboard-button-up-square-dashes.png";
// import Delfile from "../../../assets/images//browser-delete--app-code-apps-fail-delete-window-remove-cross.png";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useRef, useState, useCallback } from "react";
import {
  ArrowBack,
  ArrowForward,
  ArrowUpward,
  // Clear,
  // DeleteForever,
  Description,
  // Info,
  // InsertDriveFile,
  KeyboardArrowDown,
  KeyboardArrowUp,
  RestoreFromTrash,
} from "@mui/icons-material";
import { HeaderUploadFile } from "../../../layouts/header/HeaderUploadFile";

import {
  clearSearchFaculty,
  clearSearchSubject,
  FileItem,
  SearchFacultyAction,
  SearchFolderAction,
  SearchSubjectAction,
  UploadFileAction,
} from "../../../redux/UploadFileSlice/uploadFileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { debounce } from "@mui/material";

const cx = classNames.bind(styles);
const EditDocumentComponents = () => {
  const wrapperRef = useRef<HTMLDivElement>(null); //use ref để kiểm tra khi kéo file vào
  const [fileList, setFileList] = useState<{ name: string; size: number }[]>(
    []
  ); //use state hiển thị list file
  const [fileSelected, setFileSelected] = useState<File | null>(null); //use state kiểm tra xem file đó đã được chọn chưa

  // const [menuDeleButton, setMenuDeleButton] = useState(false); //trạng thái ẩn hiện menu delete file
  // const [alertFile, setAlertFile] = useState(false); //trạng thái hiện thông báo nếu upload file lỗi
  // const [informationAlert, setInformationAlert] = useState(""); //use state hiển thị nội dung thông báo file lỗi
  const [defaultUploadFile, setDefaultUploadFile] = useState(false); //use state hiển thị phần chi tiết của default upload file
  const [isColorItemButton, setIsColorItemButton] = useState(1); //use state  xem đang ở trạng thái tải tài liệu,chi tiết,hay hoàn thành

  const [fileDetailLoad, setFileDetailLoad] = useState(false); //use state hiển thị mục 2 của phần chi tiết default upload file
  const [menuCheckItemRow, setmenuCheckItemRow] = useState(false); //trạng thải ẩn và hiện của nút button tn hay tl
  const [uploadFileSuccess, setUploadFileSuccess] = useState(false); //use state hiển thị component hoàn thành

  const [titleFile, setTitleFile] = useState(fileList[0]?.name || "");
  const [descriptionFile, setDescriptionFile] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [subjectFile, setSubjectFile] = useState("");
  const [facultyFile, setFacultyFile] = useState("");
  const [folderFile, setFolderFile] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isUpload = useSelector((state: RootState) => state.uploadFile.isupload);
  let isFileAlreadyUploaded = false;
  const onFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(1);

    const newFile = e.target.files?.[0]; //lấy file từ input
    console.log("newFile", newFile);
    if (newFile) {
      const originalName = newFile.name; //lấy tên file
      const sizeFile = newFile.size; //lấy kích thước file
      const fileExtension = originalName.split(".").pop()?.toLowerCase(); //lấy đuôi file
      const allowedExtensions = ["pdf"]; //đuôi file được phép upload
      if (!allowedExtensions.includes(fileExtension || "")) {
        //kiểm tra đuôi file nếu không phải pdf thì báo lỗi
        // setInformationAlert("Only docx files are allowed.");
        // setAlertFile(true);
        // setTimeout(() => {
        //   setAlertFile(false);
        // }, 3000);
        // return;
      }
      if (fileSelected === null) {
        //kiểm tra file đã được chọn chưa
        setFileSelected(newFile);
        setTitleFile(originalName);
        const shortenedName =
          originalName.length > 14
            ? `${originalName.slice(0, 13)}...${originalName.slice(-8)}`
            : originalName;
        const upDatedList = [
          ...fileList,
          { name: shortenedName, size: sizeFile },
        ];

        setFileList(upDatedList);
      } else {
        for (const file of fileList) {
          if (!file.name.includes(originalName) || file.size === sizeFile) {
            isFileAlreadyUploaded = true;
            break;
          }
        }
        // if (isFileAlreadyUploaded) {
        //   setInformationAlert(
        //     `This file seems to have been already uploaded: ${originalName}`
        //   );
        //   setAlertFile(true);
        //   setTimeout(() => {
        //     setAlertFile(false);
        //   }, 3000);
        //   return;
        // }
      }
    }

    e.target.value = "";
    return;
  };
  const formatFileSize = (size: number) => {
    return size < 1024
      ? `${size} bytes`
      : size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / (1024 * 1024)).toFixed(0)} MB`;
  };
  // const handleDeleteFile = () => {

  //   handleResetUpload();

  //   setFileSelected(null);
  //   setMenuDeleButton(false);
  //   const fileInput = document.querySelector(
  //     'input[type="file"]'
  //   ) as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = ""; // Đặt lại giá trị input file
  //   }
  // };
  // const handleCancelFile = () => {
  //   setMenuDeleButton(false);
  // };
  // const handleMenuDeleteButton = () => {
  //   setMenuDeleButton(true);
  // };
  // const handleClearAlert = () => {
  //   setAlertFile(false);
  // };
  // const handleDefaultUpload = () => {
  //   if (fileList.length >= 1) {
  //     setDefaultUploadFile(true);

  //     setIsColorItemButton(2);
  //   }
  // };
  React.useEffect(() => {
    if (isUpload) {
      setUploadFileSuccess(true);
      return;
    } else {
      setDefaultUploadFile(false);
      setUploadFileSuccess(false);
    }
  }, [isUpload]);
  React.useEffect(() => {
    if (isFileAlreadyUploaded) {
      handleResetUpload();
    }
  });
  console.log(fileList);

  const handleItemNext = () => {
    if (isColorItemButton === 2) {
      if (defaultUploadFile && !fileDetailLoad) {
        setFileDetailLoad(true);
        return;
      }

      setDefaultUploadFile(false);
      if (fileSelected !== null && facultyFile !== null) {
        const data = {
          file: fileSelected,
          title: titleFile,
          description: descriptionFile,
          type: typeFile,
          subjectName: subjectFile,
          facultyName: facultyFile,
        };
        console.log("data", data);

        dispatch(UploadFileAction(data));
      }
    }
    setIsColorItemButton((item) => Math.min(item + 1, 3));
  };
  const handleItemBack = () => {
    setIsColorItemButton((item) => Math.max(item - 1, 1));
    if (isColorItemButton === 2) {
      setDefaultUploadFile(false);
      setFileDetailLoad(false);
    }
  };
  const handleChangeItemRow = (value: string) => {
    setTypeFile(value);
    setmenuCheckItemRow(false);
  };
  const handleMenuCheckItemRow = () => {
    setmenuCheckItemRow(!menuCheckItemRow);
  };

  const searchFaculty =
    useSelector((state: RootState) => state.uploadFile.searchFaculty) || []; //use selector hiển thị kết quả tìm kiếm chuyên ngành
  const searchSubject =
    useSelector((state: RootState) => state.uploadFile.searchSubject) || []; //use selector hiển thị kết quả tìm kiếm môn học
  const searchFolder =
    useSelector((state: RootState) => state.uploadFile.searchFolder) || []; //use selector hiển thị kết quả tìm kiếm nội dung file
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSearchFaculty = async (value: string) => {
    setFacultyFile(value);
    if (!value.trim()) {
      debounceClearFaculty();
      return;
    }
    try {
      debounceSearchFaculty(value);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchTitle = (value: string) => {
    setTitleFile(value);
  };
  const handleSearchSubject = async (value: string) => {
    setSubjectFile(value);
    if (!value.trim()) {
      debounceClearSubject();
      return;
    }
    try {
      debounceSearchSubject(value);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    dispatch(SearchFolderAction());
  }, [dispatch]);

  const handleSearchFolder = (value: string) => {
    setFolderFile(value);
  };

  const handleResetUpload = () => {
    setFileList([]);
    setDefaultUploadFile(false);
    setUploadFileSuccess(false);

    setFileSelected(null); // Reset selected file
    setIsColorItemButton(1); // Reset step indicator to first step
    setTitleFile("");
    setDescriptionFile("");
    setTypeFile("");
    setSubjectFile("");
    setFacultyFile("");
    setFileDetailLoad(false);
    setmenuCheckItemRow(false);
  };
  const handleClickDefaultUpload = () => {
    handleResetUpload();
  };
  const handleDelectFileUpload = () => {
    handleResetUpload();
  };
  const handleNavigateDocument = () => {
    navigate("/document");
  };
  const isActiveTitle = (step: number) => isColorItemButton === step;
  const isActiveBorder = (step: number) => isColorItemButton >= step;

  return (
    <div className={cx("file-component-main")}>
      <HeaderUploadFile />
      <div className={cx("component-main-body")}>
        <div className={cx("main-body-top")}>
          <div className={cx("body-top-list", { active: isActiveTitle(1) })}>
            <div className={cx("list-item-title")}>
              <p className={cx("item-number")}>1</p>
              <p>Tải tài liệu</p>
            </div>
            <div
              className={cx("list-item-button", { active: isActiveBorder(1) })}
            ></div>
          </div>
          <div className={cx("body-top-list", { active: isActiveTitle(2) })}>
            <div className={cx("list-item-title")}>
              <p className={cx("item-number")}>2</p>
              <p>Chi tiết</p>
            </div>
            <div
              className={cx("list-item-button", { active: isActiveBorder(2) })}
            ></div>
          </div>
          <div className={cx("body-top-list", { active: isActiveTitle(3) })}>
            <div className={cx("list-item-title")}>
              <p className={cx("item-number")}>3</p>
              <p>Hoàn thành</p>
            </div>
            <div
              className={cx("list-item-button", { active: isActiveBorder(3) })}
            ></div>
          </div>
        </div>
        {defaultUploadFile ? (
          <form className={cx("body-center-detail")}>
            {fileList.map((file: FileItem, index: number) => (
              <div className={cx("center-detail-upload")} key={index}>
                <div className={cx("detail-upload-header")}>
                  <div className={cx("upload-header-title")}>
                    <Description />
                    <div>
                      <p className={cx("title")}>{file.name}</p>
                      <p>{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div
                    className={cx("upload-header-icon")}
                    onClick={handleDelectFileUpload}
                  >
                    <RestoreFromTrash />
                  </div>
                </div>
                <div className={cx("detail-upload-border")}></div>
                <div className={cx("detail-upload-body")}>
                  <div className={cx("upload-body-list")}>
                    <p>Chuyên ngành</p>
                    <div className={cx("list-item-search")}>
                      <input
                        type="text"
                        placeholder="Nhập mã hoặc tên chuyên ngành"
                        value={facultyFile}
                        onChange={(e) => handleSearchFaculty(e.target.value)}
                      />
                      {facultyFile.trim() && searchFaculty?.length > 0 && (
                        <div className={cx("search-results")}>
                          <ul>
                            {searchFaculty.map((result, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setFacultyFile(result.facultyName);
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
                        value={subjectFile}
                        onChange={(e) => handleSearchSubject(e.target.value)}
                      />
                      {subjectFile.trim() && searchSubject?.length > 0 && (
                        <div className={cx("search-results")}>
                          <ul>
                            {searchSubject.map((result, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setSubjectFile(result.subjectName);
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
                  <div className={cx("upload-body-list")}>
                    <p>Thư mục</p>
                    <div className={cx("list-item-search")}>
                      <FormControl>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={folderFile}
                          onChange={(e) => {
                            handleSearchFolder(e.target.value);
                          }}
                        >
                          {searchFolder.map((result, index) => (
                            <MenuItem key={index} value={result.folderName}>
                              {result.folderName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>

                {fileDetailLoad && (
                  <>
                    <div className={cx("detail-upload-border")}></div>
                    <div className={cx("detail-upload-body")}>
                      <div className={cx("upload-body-list")}>
                        <p>Loại tài liệu</p>
                        <div className={cx("body-list-item")}>
                          <input
                            type="text"
                            readOnly
                            placeholder="Trắc nghiệm hoặc tự luận"
                            value={typeFile}
                            name="row"
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
                              <li
                                onClick={() =>
                                  handleChangeItemRow("Trắc nghiệm")
                                }
                              >
                                Trắc nghiệm
                              </li>
                              <li
                                onClick={() => handleChangeItemRow("Tự luận")}
                              >
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
                          placeholder={titleFile}
                          value={titleFile}
                          onChange={(e) => handleSearchTitle(e.target.value)}
                        />
                      </div>

                      <div className={cx("upload-body-list")}>
                        <p>Mô tả</p>
                        <textarea
                          placeholder="Nhập mã hoặc tên khoá học"
                          name="description"
                          value={descriptionFile}
                          onChange={(e) => setDescriptionFile(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </form>
        ) : uploadFileSuccess ? (
          <div className={cx("upload-succsess")}>
            <div className={cx("upload-success-logo")}>
              <img src={logoSuccess} alt="logosuccess" />
            </div>
            <div className={cx("upload-success-information")}>
              <div className={cx("success-information-top")}>
                <p>Cảm ơn bạn đã chia sẽ tải liệu của mình cho mọi người </p>
              </div>
              <div className={cx("success-information-bottom")}>
                <p>
                  Tài liệu của bạn hiện đang được xử lý, quá trình này có thể
                  mất vài phút. Hãy chú ý đến <span>chuông thông báo</span> để
                  biết khi nào chúng đã sẵn sàng.
                </p>
              </div>
            </div>
            <div className={cx("upload-success-button")}>
              <button
                className={cx("success-button-upload")}
                onClick={handleClickDefaultUpload}
              >
                <div>
                  <ArrowUpward />
                </div>
                Tải lên tài liệu khác
              </button>
              <button
                className={cx("success-button-back")}
                onClick={handleNavigateDocument}
              >
                Quay lại trang tài liệu
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={wrapperRef}
            className={cx(`main-body-center`)}
            onDragOver={(e) => e.preventDefault()}
          >
            <input onChange={onFileDrop} type="file" />
            <div className={cx("body-center-list")}>
              <div className={cx("center-list-icon")}>
                <img src={Vector1} className={cx("icon-1")} />
                <img src={Vector2} className={cx("icon-2")} />
                <input type="file" />
                <div className={cx("list-title")}>
                  <p>Kéo tập tin của bạn vào đây</p>
                </div>
              </div>
              <div className={cx("center-list-buton")}>
                <div className={cx("list-button-line")}>
                  <div className={cx("list-item-border")}></div>
                  <p className={cx("list-item-title")}>Of</p>
                  <div className={cx("list-item-border")}></div>
                </div>
                <div className={cx("list-button-drop")}>
                  <input
                    type="file"
                    onChange={onFileDrop}
                    placeholder="Chọn tệp tài liệu"
                  />
                </div>
                <div className={cx("list-button-information")}>
                  <p>Hỗ trợ tài liệu pdf</p>
                  <p>Dung lượng file tải lên không quá xx mb</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {defaultUploadFile ? (
          <div className={cx("main-detail-button")}>
            <button
              className={cx("detail-button-comeback")}
              onClick={handleItemBack}
            >
              <ArrowBack />
              Quay lại
            </button>
            <button className={cx("detail-button-go")} onClick={handleItemNext}>
              Tiếp tục
              <ArrowForward />
            </button>
          </div>
        ) : uploadFileSuccess ? (
          <></>
        ) : (
          <></>
        )}
      </div>
      {/* {alertFile && (
        <div className={cx("component-main-alert")}>
          <div className={cx("main-alert-title")}>
            <Info />
            <p>{informationAlert}</p>
          </div>
          <div className={cx("main-alert-icon")} onClick={handleClearAlert}>
            <Clear />
          </div>
        </div>
      )} */}
    </div>
  );
};
export default EditDocumentComponents;
