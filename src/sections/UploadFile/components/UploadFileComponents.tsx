import classNames from "classnames/bind";
import styles from "./UploadFileComponents.module.scss";
import Vector1 from "../../../assets/images/Vector 9.png";
import Vector2 from "../../../assets/images/Vector 114.png";
import logoSuccess from "../../../assets/images/fa7c78e152e8e8d45fafa21dc604d937.gif";
import arrowUp from "../../../assets/images/arrow-up-dashed-square--arrow-keyboard-button-up-square-dashes.png";
import Delfile from "../../../assets/images//browser-delete--app-code-apps-fail-delete-window-remove-cross.png";

import { AppDispatch } from "../../../redux/store";
import { useRef, useState } from "react";
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
  setValueRow,
  FileItem,
  UploadFileAction,
} from "../../../redux/UploadFileSlice/uploadFileSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

const UploadFileComponents = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  //  const [fileList, setFileList] = useState<{ name: string; size: number }[]>(
  //      []
  //    );

  const [isDragging, setIsDragging] = useState(false); //trạng thái kéo file để hiện component Drop It
  const [menuDeleButton, setMenuDeleButton] = useState(false); //trạng thái ẩn hiện menu delete file
  const [alertFile, setAlertFile] = useState(false); //trạng thái hiện thông báo nếu upload file lỗi
  const [informationAlert, setInformationAlert] = useState(""); //use state hiển thị nội dung thông báo file lỗi
  const [defaultUploadFile, setDefaultUploadFile] = useState(false); //use state hiển thị phần chi tiết của default upload file
  const [fileSelected, setFileSelected] = useState<File | null>(null); //use state kiểm tra xem file đó đã được chọn chưa
  const [isColorItemButton, setIsColorItemButton] = useState(1); //use state  xem đang ở trạng thái tải tài liệu,chi tiết,hay hoàn thành

  const [fileDetailLoad, setFileDetailLoad] = useState(false); //use state hiển thị mục 2 của phần chi tiết default upload file
  // const [valueRow, setValueRow] = useState(""); //use state hiển thị file là tn hay tl
  // const [valueRowYear, setvalueRowYear] = useState("");//use state hiển thị năm file
  const [menuCheckItemRow, setmenuCheckItemRow] = useState(false); //trạng thải ẩn và hiện của nút button tn hay tl
  const [menuCheckItemRowYear, setMenuCheckItemRowYear] = useState(false); //trạng thải ẩn và hiện của nút button năm file
  const [uploadFileSuccess, setUploadFileSuccess] = useState(false); //use state hiển thị component hoàn thành

  const [titleFile, setTitleFile] = useState("");

  const [descriptionFile, setDescriptionFile] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [contentFile, setContentFile] = useState("");
  const [subjectFile, setSubjectFile] = useState("");
  const [facultyIdFile, setFacultyIdFile] = useState(2024 - 2024);

  const dispatch = useDispatch<AppDispatch>();
  const fileList = useSelector(
    (state: RootState) => state.uploadFile.fileUploadState.fileList
  );

  // const {
  //   specialized,
  //   subject,
  //   folder,
  //   // documentType,
  //   title,
  //   // academicYear,
  //   description,
  // } = useSelector((state: RootState) => state.uploadFile.fileUploadState);

  // const handleSendData = async () => {
  //   const data = {
  //     specialized,
  //     subject,
  //     folder,
  //     documentType,
  //     title,
  //     academicYear,
  //     description,
  //   };

  //   try {
  //     const response = await UploadFileAPI.post("/your-api-endpoint", data);
  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // };

  // const {
  //   // isDragging,
  //   // menuDeleButton,
  //   // alertFile,
  //   // informationAlert,
  //   // defaultUploadFile,
  //   // fileSelected,
  //   // isColorItemButton,
  //   // fileDetailLoad,
  //   valueRow,
  //   valueRowYear,
  //   // menuCheckItemRow,
  //   // menuCheckItemRowYear,
  //   // uploadFileSuccess,
  // } = useSelector((state: RootState) => state.uploadFile.fileUploadState);

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
        setInformationAlert("Only docx, pdf, or xlsx files are allowed.");

        setAlertFile(true);
        setTimeout(() => {
          setAlertFile(true);
        }, 4000);
        return;
      }

      if (fileSelected === null) {
        setFileSelected(newFile);
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
          setInformationAlert(
            `This file seems to have been already uploaded: ${originalName}`
          );

          setAlertFile(true);
          setTimeout(() => {
            setAlertFile(false);
          }, 4000);
          return;
        }

        if (fileList.length >= 1) {
          setInformationAlert("Only 1 file can be uploaded.");
          setAlertFile(true);
          setTimeout(() => {
            setAlertFile(false);
          }, 4000);
          return;
        }
      }
    }

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
    setFileSelected(null);
    setMenuDeleButton(false);
  };
  const handleCancelFile = () => {
    setMenuDeleButton(false);
  };

  const handleMenuDeleteButton = () => {
    setMenuDeleButton(true);
  };

  const handleClearAlert = () => {
    setAlertFile(false);
  };
  const handleDefaultUpload = () => {
    if (fileList.length >= 1) {
      setDefaultUploadFile(true);
      setIsDragging(false);
      setIsColorItemButton(2);
    }
  };

  // const handleSubmit=()=>{

  // }
  const handleItemNext = () => {
    if (isColorItemButton === 2) {
      if (defaultUploadFile && !fileDetailLoad) {
        setFileDetailLoad(true);

        return;
      }
      setDefaultUploadFile(false);
      setUploadFileSuccess(true);
      if (fileSelected !== null) {
        const data = {
          file: fileSelected,
          title: titleFile,
          description: descriptionFile,
          content: contentFile,
          type: typeFile,
          subject: subjectFile,
          facultyId: facultyIdFile,
        };
        dispatch(UploadFileAction(data));
      }
    }
    setIsColorItemButton((item) => Math.min(item + 1, 3));
  };

  const handleItemBack = () => {
    setIsColorItemButton((item) => Math.max(item - 1, 1));
    if (isColorItemButton === 2) {
      console.log("setDefaultUploadFile");

      setDefaultUploadFile(false);
      setFileDetailLoad(false);
    }
  };

  const handleChangeItemRow = (value: string) => {
    dispatch(setValueRow(value));
    setmenuCheckItemRow(false);
  };
  const handleChangeItemRowYear = (value: number) => {
    setFacultyIdFile(value);
    // dispatch(setvalueRowYear(value));
    setMenuCheckItemRowYear(false);
  };
  const handleMenuCheckItemRow = () => {
    setmenuCheckItemRow(!menuCheckItemRow);
  };
  const handleMenuCheckItemRowYear = () => {
    setMenuCheckItemRowYear(!menuCheckItemRowYear);
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
                      // value={formData.subject}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className={cx("upload-body-list")}>
                    <p>Môn học</p>
                    <input
                      type="text"
                      placeholder="Nhập mã hoặc tên môn học"
                      // value={subject}
                      onChange={(e) => setSubjectFile(e.target.value)}
                    />
                  </div>

                  <div className={cx("upload-body-list")}>
                    <p>Thư mục</p>
                    <input
                      type="text"
                      placeholder="Tiêu đề thư mục"
                      // value={formData.content}
                      onChange={(e) => setContentFile(e.target.value)}
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
                            // value={formData.type}
                            onChange={(e) => setTypeFile(e.target.value)}
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
                          // value={formData.title}
                          onChange={(e) => setTitleFile(e.target.value)}
                        />
                      </div>
                      <div className={cx("upload-body-list")}>
                        <p>Năm học</p>
                        <div className={cx("body-list-item")}>
                          <input
                            type="text"
                            readOnly
                            placeholder="2024 - 2024"
                            // value={formData.facultyId}
                            name="row"
                            onChange={(e) =>
                              setFacultyIdFile(Number(e.target.value))
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
                                  handleChangeItemRowYear(2024 - 2024)
                                }
                              >
                                2024 - 2024
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2023 - 2023)
                                }
                              >
                                2023 - 2023
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2022 - 2022)
                                }
                              >
                                2022 - 2022
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2021 - 2021)
                                }
                              >
                                2021 - 2021
                              </li>
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2020 - 2020)
                                }
                              >
                                2020 - 2020
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2019 - 2019)
                                }
                              >
                                2019 - 2019
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2018 - 2018)
                                }
                              >
                                2018 - 2018
                              </li>{" "}
                              <li
                                onClick={() =>
                                  handleChangeItemRowYear(2017 - 2017)
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
                          name="description"
                          // value={formData.description}
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
                    // value={}
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
