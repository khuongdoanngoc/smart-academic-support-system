import { useState, useRef, useCallback } from "react";
// import  ButtonSubmit  from "../../../components/Button/Button";
import styles from "./EditProfileComponents.module.scss";
import classNames from "classnames/bind";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  EditProfileAction,
  // GetProFileAction,
  // resetState,
} from "../../../redux/EditProfileSlice/EditProfileSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import {
  clearSearchFaculty,
  SearchFacultyAction,
} from "../../../redux/UploadFileSlice/uploadFileSlice";
import avartar from "../../../assets/images/Frame 8720.png";

const cx = classNames.bind(styles);

const EditProfileComponents = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { useData } = location.state || { useData: null };

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    useData.profilePicture
  );

  const formatDateToYYYYMMDD = (date: string | Date): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    firstName: useData.firstName,
    lastName: useData.lastName,
    gender: useData.gender,
    birthDate: useData.birthDate ? formatDateToYYYYMMDD(useData.birthDate) : "",
    hometown: useData.hometown,
    phoneNumber: useData.phoneNumber,
    facultyId: 0,
    major: useData.major,
    enrollmentYear: new Date().getFullYear(),
    classNumber: useData.classNumber,
    profilePicture: useData.profilePicture,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (
  //     formData.profilePicture &&
  //     formData.profilePicture !== useData.profilePicture
  //   ) {
  //     const newPreview = URL.createObjectURL(formData.profilePicture);
  //     setAvatarPreview((prev) => {
  //       if (prev && prev !== useData.profilePicture) {
  //         URL.revokeObjectURL(prev); // Giải phóng URL cũ nếu cần
  //       }
  //       return newPreview;
  //     });
  //   }
  // }, [formData.profilePicture, useData.profilePicture]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      setAvatarPreview(URL.createObjectURL(file)); // Tạo ảnh xem trước
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };
  const searchFaculty =
    useAppSelector((state) => state.uploadFile.searchFaculty) || [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchFaculty = useCallback(
    debounce(
      (value: string) => dispatch(SearchFacultyAction(value)).unwrap(),
      1000
    ),
    [dispatch, SearchFacultyAction]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClearFaculty = useCallback(
    debounce(() => dispatch(clearSearchFaculty()), 1000),
    [dispatch, clearSearchFaculty]
  );

  const handleSearchFaculty = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    if (!value.trim()) {
      // Nếu giá trị rỗng, xóa danh sách tìm kiếm và cập nhật major về rỗng
      debounceClearFaculty();
      setFormData((prev) => ({
        ...prev,
        major: "", // Đảm bảo major được cập nhật thành rỗng
        facultyId: 0, // Reset facultyId nếu cần
      }));
      return;
    }
    try {
      // Thực hiện tìm kiếm với giá trị nhập vào
      debounceSearchFaculty(value);
    } catch (error) {
      console.error(error);
    }
    setFormData((prev) => ({
      ...prev,
      major: value,
    }));
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      profilePicture: formData.profilePicture || avartar,
      facultyId: formData.facultyId,
    };

    console.log("dataToSubmit", dataToSubmit);

    dispatch(EditProfileAction(dataToSubmit));
    setTimeout(() => {
      navigate("/document/profile-personal");
    }, 3000);
  };

  return (
    <div className={cx("edit-profile")}>
      <div className={cx("edit-profile-main")}>
        <div className={cx("profile-main-header")}>
          <h3>CHỈNH SỬA THÔNG TIN</h3>
        </div>
        <div className={cx("profile-main-body")}>
          <div className={cx("main-body-top")}>
            <div className={cx("main-body-avatar")}>
              <h3>Ảnh đại diện</h3>
              <img src={avatarPreview || avartar} alt="avatar" />
              <div className={cx("file-input")}>
                <input
                  type="file"
                  name="profilePicture"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button onClick={handleOpenFileDialog}>
                  {formData.profilePicture &&
                  formData.profilePicture !== useData.profilePicture
                    ? "Đổi ảnh"
                    : "Chọn ảnh"}
                </button>
              </div>
            </div>
            <div className={cx("main-body-individual")}>
              <div className={cx("body-individual-title")}>
                <h4>Thông tin cá nhân</h4>
              </div>
              <div className={cx("body-individual-input")}>
                <div className={cx("individual-input-name")}>
                  <div className={cx("input-name-firstmame")}>
                    <label>Họ</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={useData.firstName}
                    />
                  </div>
                  <div className={cx("input-name-lastmame")}>
                    <label>Tên</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={useData.lastName}
                    />
                  </div>
                  <div className={cx("input-infor-sex")}>
                    <label>Giới tính</label>
                    <select
                      className={cx("infor-sex-select")}
                      name="gender"
                      value={useData.gender}
                      onChange={handleInputChange}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                </div>
                <div className={cx("individual-input-infor")}>
                  <div className={cx("input-infor-date")}>
                    <label>Ngày sinh</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      placeholder={useData.birthDate}
                    />
                  </div>

                  <div className={cx("input-infor-country")}>
                    <label>Quê quán</label>
                    <input
                      type="text"
                      name="hometown"
                      value={formData.hometown}
                      onChange={handleInputChange}
                      placeholder={useData.hometown}
                    />
                  </div>
                </div>
                <div className={cx("individual-input-contact")}>
                  {/* <div className={cx("input-contact-email")}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nguyenquochuy@gmail.com"
                    />
                  </div> */}
                  <div className={cx("input-contact-phone")}>
                    <label>SĐT</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder={useData.phoneNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("main-body-student")}>
            <div className={cx("body-student-title")}>
              <h4>Thông tin sinh viên</h4>
            </div>
            <div className={cx("body-student-input")}>
              <div className={cx("student-input-school")}>
                <div className={cx("input-school-department")}>
                  <label>Khoa - Trường</label>
                  <div className={cx("list-item-search")}>
                    <input
                      type="text"
                      placeholder="Nhập mã hoặc tên chuyên ngành"
                      value={formData.major}
                      onChange={handleSearchFaculty}
                    />

                    {formData.major.trim() && searchFaculty?.length > 0 && (
                      <div className={cx("search-results")}>
                        <ul>
                          {searchFaculty.map((result, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  major: result.facultyName,
                                  facultyId: index,
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
                {/* <div className={cx("input-school-department")}>
                  <label>Chuyên ngành</label>
                  <div className={cx("list-item-search")}>
                    <input
                      type="text"
                      placeholder="Nhập mã hoặc tên chuyên ngành"
                      value={formData.major}
                      onChange={handleSearchMajor}
                    />

                    {majorFile.trim() && searchMajor?.length > 0 && (
                      <div className={cx("search-results")}>
                        <ul>
                          {searchMajor.map((result, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setMajorFile(result.facultyName);
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
                </div> */}
              </div>
              <div className={cx("student-input-information")}>
                <div className={cx("input-information-position")}>
                  <label>Chức vụ(Không thể chỉnh sửa)</label>
                  <input
                    type="text"
                    name="position"
                    readOnly
                    // value={formData.position}
                    // onChange={handleInputChange}
                    // min={2000}
                    // max={new Date().getFullYear()}
                    value={useData.roles}
                    // placeholder="Sinh viên"
                  />
                </div>
                <div className={cx("input-information-year")}>
                  <label>Năm nhập học</label>
                  <input
                    type="number"
                    name="enrollmentYear"
                    value={formData.enrollmentYear}
                    onChange={handleInputChange}
                    min={2000}
                    max={2030}
                    placeholder="YYYY"
                  />
                </div>
                <div className={cx("input-infor-lock")}>
                  <label>Khóa</label>
                  <select
                    className={cx("infor-lock-select")}
                    name="classNumber"
                    value={formData.classNumber}
                    onChange={handleInputChange}
                  >
                    <option value={27}>27</option>
                    <option value={26}>26</option>
                    <option value={25}>25</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className={cx("body-individual-submit")}
          >
            "Lưu thay đổi"
          </button>
          <button className={cx("body-individual-delete")}>
            Xoá tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponents;
