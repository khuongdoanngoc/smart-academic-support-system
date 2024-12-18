import { useState, useRef } from "react";

import styles from "./UserInformationComponent.module.scss";
import classNames from "classnames/bind";

// import {
//   EditProfileAction,
//   // resetState,
// } from "../../../redux/EditProfileSlice/EditProfileSlice";
import avatarImg from "../../../../assets/images/User.png";

const cx = classNames.bind(styles);

const UserInformationComponents = () => {
  // const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [department, setDepartment] = useState("Đào tạo quốc tế 1");

  // useEffect(() => {
  //   if (success) {
  //     toast.success("Cập nhật thông tin thành công!");
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       gender: "",
  //       birthDate: "",
  //       hometown: "",
  //       email: "",
  //       phoneNumber: "",
  //       facultyId: "",
  //       major: "Software Technology CMU",
  //       enrollmentYear: new Date().getFullYear(),
  //       classNumber: "27",
  //       avatar: null,
  //     });
  //     dispatch(resetState());
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [success, error, dispatch]);

  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Khi avatar thay đổi, tạo URL mới và giải phóng URL cũ
  // useEffect(() => {
  //   if (formData.avatar) {
  //     const newPreview = URL.createObjectURL(formData.avatar);
  //     setAvatarPreview((prev) => {
  //       if (prev) {
  //         URL.revokeObjectURL(prev); // Giải phóng URL cũ
  //       }
  //       return newPreview;
  //     });
  //   }
  // }, [formData.avatar]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const fileUrl = URL.createObjectURL(file); // Tạo URL cho ảnh
  //     setFormData((prev) => ({
  //       ...prev,
  //       avatar: file, // Lưu file vào formData
  //     }));
  //     // setAvatarPreview(fileUrl); // Hiển thị ảnh xem trước
  //   }
  // };

  const handleDepartment = (e: string) => {
    setDepartment(e);
  };
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cx("edit-profile")}>
      <div className={cx("edit-profile-main")}>
        <div className={cx("profile-main-title")}>
          <span>DTUDASHBOARD / Người dùng / Thông tin chi tiết</span>
        </div>
        {/* <div className={cx("profile-main-header")}>
          <h3>CHỈNH SỬA THÔNG TIN</h3>
        </div> */}
        <div className={cx("profile-main-body")}>
          <div className={cx("main-body-top")}>
            <div className={cx("main-body-avatar")}>
              <h3>Ảnh đại diện</h3>
              <img src={avatarImg} alt="avatar" />
              <div className={cx("file-input")}>
                <input
                  type="file"
                  name="avatar"
                  ref={fileInputRef}
                  // onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button onClick={handleOpenFileDialog}>Xoá ảnh</button>
              </div>
            </div>
            <div className={cx("main-body-individual")}>
              <div className={cx("body-individual-title")}>
                <h4>Thông tin cá nhân</h4>
              </div>
              <div className={cx("body-individual-input")}>
                <div className={cx("individual-input-name")}>
                  <div className={cx("input-name-lastname")}>
                    <label>Họ</label>
                    <input type="text" name="lastName" placeholder="Nguyễn" />
                  </div>
                  <div className={cx("input-name-firstname")}>
                    <label>Tên</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Quốc Huy"
                    />
                  </div>
                  <div className={cx("input-infor-sex")}>
                    <label>Giới tính</label>
                    <select className={cx("infor-sex-select")} name="gender">
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                </div>
                <div className={cx("individual-input-infor")}>
                  <div className={cx("input-infor-date")}>
                    <label>Ngày sinh</label>
                    <input type="date" name="birthDate" />
                  </div>

                  <div className={cx("input-infor-country")}>
                    <label>Quê quán</label>
                    <input
                      type="text"
                      name="hometown"
                      placeholder="Phong Bình - Gio Linh - Quảng Trị"
                    />
                  </div>
                </div>
                <div className={cx("individual-input-contact")}>
                  <div className={cx("input-contact-email")}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="nguyenquochuy@gmail.com"
                    />
                  </div>
                  <div className={cx("input-contact-phone")}>
                    <label>SĐT</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="+84 353940610"
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
                  <select
                    name="department"
                    value={department}
                    onChange={() => handleDepartment}
                  >
                    <option value={"Đào tạo Quốc Tế 1"}>
                      Đào tạo Quốc Tế 1
                    </option>
                    <option value={"Đào tạo Quốc Tế 2"}>
                      Đào tạo Quốc Tế 2
                    </option>
                  </select>
                </div>
                <div className={cx("input-school-specialized")}>
                  <label>Chuyên ngành</label>
                  <select name="major">
                    <option value={"Software Technology CMU"}>
                      Software Technology CMU
                    </option>
                    <option value={"Software Technology CMU 2"}>
                      Software Technology CMU 2
                    </option>
                  </select>
                </div>
              </div>
              <div className={cx("student-input-information")}>
                <div className={cx("input-information-position")}>
                  <label>Chức vụ(Không thể chỉnh sửa)</label>
                  <input
                    type="text"
                    name="position"
                    readOnly
                    placeholder="Sinh viên"
                  />
                </div>
                <div className={cx("input-information-year")}>
                  <label>Năm nhập học</label>
                  <input
                    type="number"
                    name="enrollmentYear"
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
                  >
                    <option value={27}>27</option>
                    <option value={26}>26</option>
                    <option value={25}>25</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationComponents;
