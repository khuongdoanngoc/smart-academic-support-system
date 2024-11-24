import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import  ButtonSubmit  from "../../../components/Button/Button";
import styles from "./EditProfileComponents.module.scss";
import classNames from "classnames/bind";
import EditProfileAPI from "../../../services/EditProfileAPI/EditProfileAPI";
import { RootState, AppDispatch } from "../../../redux/store";
import { resetState } from "../../../redux/EditProfileSlice/EditProfileSlice";

const cx = classNames.bind(styles);

const EditProfileComponents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isloading, error, success } = useSelector(
    (state: RootState) => state.editProfile
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Nam",
    hometown: "",
    phoneNumber: "",
    facultyId: 1,
    major: "Software Technology CMU",
    enrollmentYear: new Date().getFullYear(),
    classNumber: "27",
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

  const handleSubmit = () => {
    dispatch(EditProfileAPI(formData));
  };

  useEffect(() => {
    if (success) {
      alert("Cập nhật thông tin thành công!");
      dispatch(resetState());
    }
    if (error) {
      alert("Có lỗi xảy ra: " + error);
      dispatch(resetState());
    }
  }, [success, error, dispatch]);

  return (
    <div className={cx("edit-profile")}>
      <div className={cx("edit-profile-main")}>
        <div className={cx("profile-main-header")}>
          <h3>CHỈNH SỬA THÔNG TIN</h3>
        </div>
        <div className={cx("profile-main-body")}>
          <div className={cx("main-body-individual")}>
            <div className={cx("body-individual-title")}>
              <h4>Thông tin cá nhân</h4>
            </div>
            <div className={cx("body-individual-input")}>
              <div className={cx("individual-input-name")}>
                <div className={cx("input-name-lastname")}>
                  <label>Họ</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn"
                  />
                </div>
                <div className={cx("input-name-firstname")}>
                  <label>Tên</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Quốc Huy"
                  />
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
                  />
                </div>
                <div className={cx("input-infor-sex")}>
                  <label>Giới tính</label>
                  <select
                    className={cx("infor-sex-select")}
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
                <div className={cx("input-infor-country")}>
                  <label>Quê quán</label>
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleInputChange}
                    placeholder="Phong Bình - Gio Linh - Quảng Trị"
                  />
                </div>
              </div>
              <div className={cx("individual-input-contact")}>
                <div className={cx("input-contact-phone")}>
                  <label>SĐT</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+84 353940610"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("main-body-student")}>
            <div className={cx("body-student-title")}>
              <h4>Thông tin học tập</h4>
            </div>
            <div className={cx("body-student-input")}>
              <div className={cx("student-input-school")}>
                <div className={cx("input-school-department")}>
                  <label>Khoa - Trường</label>
                  <select
                    name="facultyId"
                    value={formData.facultyId}
                    onChange={handleInputChange}
                  >
                    <option value={1}>Đào tạo Quốc Tế 1</option>
                    <option value={2}>Đào tạo Quốc Tế 2</option>
                  </select>
                </div>
                <div className={cx("input-school-specialized")}>
                  <label>Chuyên ngành</label>
                  <select
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                  >
                    <option>Software Technology CMU</option>
                    <option>Software Technology CMU 2</option>
                  </select>
                </div>
              </div>
              <div className={cx("student-input-information")}>
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
                    <option>27</option>
                    <option>26</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={cx("body-individual-submit")}>
              {/* <ButtonSubmit
                titleButton="Lưu thay đổi"
                isSubmitting={isLoading}
               
                fontsize={16}
                borderRadius={20}
                background={"#0A75E6"}
                onClick={handleSubmit}
                
              /> */}
              <button onClick={handleSubmit} disabled={isloading}>
                {isloading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponents;
