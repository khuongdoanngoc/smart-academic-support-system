import classNames from "classnames/bind";
import styles from "./UploadFileComponents.module.scss";
// import Avatar from "../../../assets/images/avatar.png";
import Vector1 from "../../../assets/images/Vector 9.png";
import Vector2 from "../../../assets/images/Vector 114.png";
import logoSuccess from "../../../assets/images/fa7c78e152e8e8d45fafa21dc604d937.gif";
import arrowUp from "../../../assets/images/arrow-up-dashed-square--arrow-keyboard-button-up-square-dashes.png";
import Delfile from "../../../assets/images//browser-delete--app-code-apps-fail-delete-window-remove-cross.png";

import { useRef } from "react";
import {
  ArrowBack,
  ArrowForward,
  ArrowUpward,
  Clear,
  DeleteForever,
  Description,
  Info,
  InsertDriveFile,
  KeyboardArrowDown,
  KeyboardArrowUp,
  RestoreFromTrash,
  TextSnippet,
} from "@mui/icons-material";
import { HeaderUploadFile } from "../../../layouts/header/HeaderUploadFile";
// import axios from "axios";
import { RootState } from "../../../redux/store";

import {
  setFileList,
  setIsDragging,
  setMenuDeleButton,
  setAlertFile,
  setInformationAlert,
  setDefaultUploadFile,
  setFileSelected,
  setIsColorItemButton,
  setFileDetailLoad,
  setValueRow,
  setvalueRowYear,
  setmenuCheckItemRow,
  setMenuCheckItemRowYear,
  setUploadFileSuccess,
  FileItem,
  setSpecialized,
  setSubject,
  setFolder,
  // setDocumentType,
  setTitle,
  // setAcademicYear,
  setDescription,
} from "../../../redux/UploadFileSlice/uploadFileSlice";
import { useDispatch, useSelector } from "react-redux";
import UploadFileAPI from "../../../services/UploadFileAPI/UploadFileAPI";

const cx = classNames.bind(styles);
const UploadFileComponents = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  //  const [fileList, setFileList] = useState<{ name: string; size: number }[]>(
  //      []
  //    );

  // const [isDragging, setIsDragging] = useState(false); //trạng thái kéo file để hiện component Drop It
  // const [menuDeleButton, setMenuDeleButton] = useState(false); //trạng thái ẩn hiện menu delete file
  // const [alertFile, setAlertFile] = useState(false); //trạng thái hiện thông báo nếu upload file lỗi
  // const [informationAlert, setInformationAlert] = useState(""); //use state hiển thị nội dung thông báo file lỗi
  // const [defaultUploadFile, setDefaultUploadFile] = useState(false); //use state hiển thị phần chi tiết của default upload file
  // const [fileSelected, setFileSelected] = useState<File | null>(null); //use state kiểm tra xem file đó đã được chọn chưa
  // const [isColorItemButton, setIsColorItemButton] = useState(1); //use state  xem đang ở trạng thái tải tài liệu,chi tiết,hay hoàn thành

  // const [fileDetailLoad, setFileDetailLoad] = useState(false); //use state hiển thị mục 2 của phần chi tiết default upload file
  // const [valueRow, setValueRow] = useState(""); //use state hiển thị file là tn hay tl
  // const [valueRowYear, setvalueRowYear] = useState("");//use state hiển thị năm file
  // const [menuCheckItemRow, setmenuCheckItemRow] = useState(false); //trạng thải ẩn và hiện của nút button tn hay tl
  // const [menuCheckItemRowYear, setMenuCheckItemRowYear] = useState(false);//trạng thải ẩn và hiện của nút button năm file
  // const [uploadFileSuccess, setUploadFileSuccess] = useState(false); //use state hiển thị component hoàn thành

  const dispatch = useDispatch();
  const fileList = useSelector((state: RootState) => state.uploadFile.fileList);

  const {
    specialized,
    subject,
    folder,
    documentType,
    title,
    academicYear,
    description,
  } = useSelector((state: RootState) => state.uploadFile);

  const handleSendData = async () => {
    const data = {
      specialized,
      subject,
      folder,
      documentType,
      title,
      academicYear,
      description,
    };

    try {
      const response = await UploadFileAPI.post("/your-api-endpoint", data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const {
    isDragging,
    menuDeleButton,
    alertFile,
    informationAlert,
    defaultUploadFile,
    fileSelected,
    isColorItemButton,
    fileDetailLoad,
    valueRow,
    valueRowYear,
    menuCheckItemRow,
    menuCheckItemRowYear,
    uploadFileSuccess,
  } = useSelector((state: RootState) => state.uploadFile);

  // const onDragEnter = () => {
  //   if (wrapperRef.current) {
  //     wrapperRef.current.classList.add("dragover");
  //   }
  //   setIsDragging(true);
  // };
  // const onDrapLeave = () => {
  //   if (wrapperRef.current) {
  //     wrapperRef.current.classList.remove("dragover");
  //   }
  //   setIsDragging(false);
  // };
  // const onDrop = () => {
  //   if (wrapperRef.current) {
  //     wrapperRef.current.classList.remove("dragover");
  //   }
  //   setIsDragging(false);
  // };

  const onFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    if (newFile) {
      const originalName = newFile.name;
      const sizeFile = newFile.size;

      const fileExtension = originalName.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["docx", "pdf", "xlsx"];

      if (!allowedExtensions.includes(fileExtension || "")) {
        dispatch(
          setInformationAlert("Only docx, pdf, or xlsx files are allowed.")
        );
        dispatch(setAlertFile(true));
        setTimeout(() => {
          dispatch(setAlertFile(true));
        }, 4000);
        return;
      }

      if (fileSelected === null) {
        dispatch(setFileSelected(newFile));
        const shortenedName =
          originalName.length > 14
            ? `${originalName.slice(0, 13)}...${originalName.slice(-8)}`
            : originalName;

        const upDatedList = [
          ...fileList,
          { name: shortenedName, size: sizeFile },
        ];

        dispatch(setFileList(upDatedList));
      } else {
        let isFileAlreadyUploaded = false;

        for (const file of fileList) {
          if (!file.name.includes(originalName) && file.size === sizeFile) {
            isFileAlreadyUploaded = true;
            break;
          }
        }

        if (isFileAlreadyUploaded) {
          dispatch(
            setInformationAlert(
              `This file seems to have been already uploaded: ${originalName}`
            )
          );
          dispatch(setAlertFile(true));
          setTimeout(() => {
            dispatch(setAlertFile(false));
          }, 4000);
          return;
        }

        if (fileList.length >= 1) {
          dispatch(setInformationAlert("Only 1 file can be uploaded."));
          dispatch(setAlertFile(true));
          setTimeout(() => {
            dispatch(setAlertFile(false));
          }, 4000);
          return;
        }
      }
    }
    // console.log("new File 2", newFile);

    //   if (fileList.length === 0) return;
    //   const formData = new FormData();
    //   filesForUpload.forEach((file) => formData.append("file", file));

    //   try {
    //     const response = await axios.post(
    //       "https://your-api-endpoint.com/uploads",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer YOUR_API_KEY`,
    //         },
    //         onUploadProgress: (progressEvent) => {
    //           console.log(1);

    //           const total = progressEvent.total ? progressEvent.total : 1;
    //           const percentCompleted = Math.round(
    //             (progressEvent.loaded * 100) / total
    //           );
    //           setFileLoad(percentCompleted); // Cập nhật % tiến trình upload
    //         },
    //       }
    //     );
    //     console.log(response.data); // Xử lý phản hồi sau khi upload thành công
    //   } catch (error) {
    //     console.error("Upload error:", error); // Xử lý lỗi nếu có
    //   }

    e.target.value = "";
  };

  const formatFileSize = (size: number) => {
    return size < 1024
      ? `${size} bytes`
      : size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / (1024 * 1024)).toFixed(0)} MB`;
  };

  const handleDeleteFile = () => {
    dispatch(setFileList([]));
    dispatch(setFileSelected(null));
    dispatch(setMenuDeleButton(false));
  };
  const handleCancelFile = () => {
    dispatch(setMenuDeleButton(false));
  };

  const handleMenuDeleteButton = () => {
    dispatch(setMenuDeleButton(true));
  };

  const handleClearAlert = () => {
    dispatch(setAlertFile(false));
  };
  const handleDefaultUpload = () => {
    if (fileList.length >= 1) {
      dispatch(setDefaultUploadFile(true));
      dispatch(setIsDragging(false));
      dispatch(setIsColorItemButton(2));
    }
    console.log(isColorItemButton);
  };

  const handleItemNext = () => {
    console.log("isColorItemButton 1", isColorItemButton);
    console.log("isActiveTitle", isActiveTitle);

    if (isColorItemButton === 2) {
      if (defaultUploadFile && !fileDetailLoad) {
        dispatch(setFileDetailLoad(true));

        return;
      }
      dispatch(setDefaultUploadFile(false));
      dispatch(setUploadFileSuccess(true));
    }
    dispatch(setIsColorItemButton((item) => Math.min(item + 1, 3)));
  };
  console.log("isColorItemButton 1", isColorItemButton);

  const handleItemBack = () => {
    dispatch(setIsColorItemButton((item) => Math.max(item - 1, 1)));
    if (isColorItemButton === 2) {
      console.log("setDefaultUploadFile");

      dispatch(setDefaultUploadFile(false));
      dispatch(setFileDetailLoad(false));
    }
  };

  const handleChangeItemRow = (value: string) => {
    dispatch(setValueRow(value));
    dispatch(setmenuCheckItemRow(false));
  };
  const handleChangeItemRowYear = (value: string) => {
    dispatch(setvalueRowYear(value));
    dispatch(setMenuCheckItemRowYear(false));
  };
  const handleMenuCheckItemRow = () => {
    dispatch(setmenuCheckItemRow(!menuCheckItemRow));
  };
  const handleMenuCheckItemRowYear = () => {
    dispatch(setMenuCheckItemRowYear(!menuCheckItemRowYear));
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

        {isDragging ? (
          <div
            className={cx("main-body-center")}
            // onDragEnter={onDragEnter}
            // onDragLeave={onDrapLeave}
            // onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input onChange={onFileDrop} type="file" />

            <div className={cx("main-body-hover")}>
              <div>
                <TextSnippet />
                <p>Drop It</p>
              </div>
            </div>
          </div>
        ) : defaultUploadFile ? (
          <form className={cx("body-center-detail")} onSubmit={handleSendData}>
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
                  <div className={cx("upload-header-icon")}>
                    <RestoreFromTrash />
                  </div>
                </div>
                <div className={cx("detail-upload-border")}></div>
                <div className={cx("detail-upload-body")}>
                  <div className={cx("upload-body-list")}>
                    <p>Chuyên ngành</p>
                    <input
                      type="text"
                      placeholder="Nhập mã hoặc tên chuyên ngành"
                      value={specialized}
                      onChange={(e) => dispatch(setSpecialized(e.target.value))}
                    />
                  </div>
                  <div className={cx("upload-body-list")}>
                    <p>Môn học</p>
                    <input
                      type="text"
                      placeholder="Nhập mã hoặc tên môn học"
                      value={subject}
                      onChange={(e) => dispatch(setSubject(e.target.value))}
                    />
                  </div>

                  <div className={cx("upload-body-list")}>
                    <p>Thư mục</p>
                    <input
                      type="text"
                      placeholder="Tiêu đề thư mục"
                      value={folder}
                      onChange={(e) => dispatch(setFolder(e.target.value))}
                    />
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
                            value={valueRow}
                            onChange={(e) =>
                              dispatch(setValueRow(e.target.value))
                            }
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
                          placeholder={file.name}
                          value={title}
                          onChange={(e) => dispatch(setTitle(e.target.value))}
                        />
                      </div>
                      <div className={cx("upload-body-list")}>
                        <p>Năm học</p>
                        <div className={cx("body-list-item")}>
                          <input
                            type="text"
                            readOnly
                            placeholder="2024 - 2024"
                            value={valueRowYear}
                            name="row"
                            onChange={(e) =>
                              dispatch(setvalueRowYear(e.target.value))
                            }
                          />
                          <p onClick={handleMenuCheckItemRowYear}>
                            {menuCheckItemRowYear ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </p>
                        </div>

                        {menuCheckItemRowYear && (
                          <div className={cx("list-item-row")}>
                            <ul>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2024 - 2024")
                                }
                              >
                                2024 - 2024
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2023 - 2023")
                                }
                              >
                                2023 - 2023
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2022 - 2022")
                                }
                              >
                                2022 - 2022
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2021 - 2021")
                                }
                              >
                                2021 - 2021
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2020 - 2020")
                                }
                              >
                                2020 - 2020
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2019 - 2019")
                                }
                              >
                                2019 - 2019
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2018 - 2018")
                                }
                              >
                                2018 - 2018
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear("2017 - 2017")
                                }
                              >
                                2017 - 2017
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className={cx("upload-body-list")}>
                        <p>Mô tả</p>
                        <textarea
                          placeholder="Nhập mã hoặc tên khoá học"
                          value={description}
                          onChange={(e) =>
                            dispatch(setDescription(e.target.value))
                          }
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
              <button className={cx("success-button-upload")}>
                <div>
                  <ArrowUpward />
                </div>
                Tải lên tài liệu khác
              </button>
              <button className={cx("success-button-back")}>
                Quay lại trang tài liệu
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={wrapperRef}
            className={cx(`main-body-center`)}
            // onDragEnter={onDragEnter}
            // onDragLeave={onDrapLeave}
            // onDrop={onDrop}
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
                  <p>Hỗ trợ tài liệu:docx, pdf, xlss,...</p>
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
              // disabled={isColorItemButton == 1}
            >
              <ArrowBack />
              Quay lại
            </button>
            <button
              className={cx("detail-button-go")}
              onClick={handleItemNext}
              // disabled={isColorItemButton == 3}
            >
              Tiếp tục
              <ArrowForward />
            </button>
          </div>
        ) : uploadFileSuccess ? (
          <></>
        ) : (
          <div
            className={cx("main-body-bottom")}
            // style={{ display: defaultUploadFile ? "none" : "block" }}
          >
            <div className={cx("body-bottom-file")}>
              {fileList.map((item: FileItem, index) => (
                <div className={cx("bottom-file-list")} key={index}>
                  <div className={cx("bottom-file-icon")}>
                    <div className={cx("file-icon-img")}>
                      <InsertDriveFile />
                    </div>
                    <div className={cx("file-icon-size")}>
                      <p>{formatFileSize(item.size)}</p>
                    </div>
                  </div>
                  <div className={cx("bottom-file-title")}>
                    <p>{item.name}</p>
                    <div className={cx("file-title-bar")}>
                      <div
                        className={cx("bar-list")}
                        // style={{ width: `${fileLoad}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={cx("bottom-file-del")}>
                    <img src={Delfile} onClick={handleMenuDeleteButton} />
                    <p>100%</p>
                  </div>
                  {menuDeleButton && (
                    <ul className={cx("bottom-menu-dell")}>
                      <li onClick={handleDeleteFile}>
                        <button>
                          <DeleteForever />
                          Delete document
                        </button>
                      </li>
                      <li onClick={handleCancelFile}>
                        <button>
                          <Clear />
                          Cancel
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className={cx("main-body-button")}>
              <button onClick={handleDefaultUpload}>
                <div>
                  <img src={arrowUp} />
                  <span>Gửi tài liệu</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      {alertFile && (
        <div className={cx("component-main-alert")}>
          <div className={cx("main-alert-title")}>
            <Info />
            <p>{informationAlert}</p>
          </div>
          <div className={cx("main-alert-icon")} onClick={handleClearAlert}>
            <Clear />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileComponents;
