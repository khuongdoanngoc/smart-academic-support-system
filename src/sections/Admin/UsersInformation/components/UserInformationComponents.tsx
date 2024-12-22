import { useEffect } from "react";

import styles from "./UserInformationComponent.module.scss";
import classNames from "classnames/bind";

import { RootState, useAppDispatch } from "../../../../redux/store";
import {
  DelectProfilePictureAction,
  GetProFileDashAction,
} from "../../../../redux/DashBoardSlice/DashBoardSlice";
import { useSelector } from "react-redux";
import avartar from "../../../../assets/images/Frame 8720.png";

const cx = classNames.bind(styles);

const UserInformationComponents = () => {
  const dispatch = useAppDispatch();

  const handleOpenFileDialog = () => {
    dispatch(DelectProfilePictureAction());
  };
  useEffect(() => {
    dispatch(GetProFileDashAction());
  }, [dispatch]);
  const { getProfileDash } = useSelector(
    (state: RootState) => state.profileDashBoard
  );

  return (
    <div className={cx("edit-profile")}>
      <div className={cx("edit-profile-main")}>
        <div className={cx("profile-main-title")}>
          <span>DTUDASHBOARD / Người dùng / Thông tin chi tiết</span>
        </div>

        <div className={cx("profile-main-body")}>
          <div className={cx("main-body-top")}>
            <div className={cx("main-body-avatar")}>
              <h3>Ảnh đại diện</h3>
              <img
                src={getProfileDash?.profilePicture || avartar}
                alt="avatar"
              />
              <div className={cx("file-input")}>
                {/* <input type="file" name="avatar" style={{ display: "none" }} /> */}
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
                    <input
                      type="text"
                      name="lastName"
                      readOnly
                      value={getProfileDash?.lastName || ""}
                    />
                  </div>
                  <div className={cx("input-name-firstname")}>
                    <label>Tên</label>
                    <input
                      type="text"
                      name="firstName"
                      readOnly
                      value={getProfileDash?.firstName || ""}
                    />
                  </div>
                  <div className={cx("input-infor-sex")}>
                    <label>Giới tính</label>
                    <input
                      type="text"
                      name="firstName"
                      readOnly
                      className={cx("infor-sex-select")}
                      value={getProfileDash?.gender || ""}
                    />
                  </div>
                </div>
                <div className={cx("individual-input-infor")}>
                  <div className={cx("input-infor-date")}>
                    <label>Ngày sinh</label>
                    <input
                      type="date"
                      name="birthDate"
                      readOnly
                      value={getProfileDash?.birthDate || ""}
                    />
                  </div>

                  <div className={cx("input-infor-country")}>
                    <label>Quê quán</label>
                    <input
                      type="text"
                      name="hometown"
                      readOnly
                      value={getProfileDash?.hometown || ""}
                      placeholder={getProfileDash?.hometown}
                    />
                  </div>
                </div>
                <div className={cx("individual-input-contact")}>
                  <div className={cx("input-contact-email")}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      value={getProfileDash?.email || ""}
                    />
                  </div>
                  <div className={cx("input-contact-phone")}>
                    <label>SĐT</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      readOnly
                      value={getProfileDash?.phoneNumber || ""}
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
                  <input
                    type="text"
                    readOnly
                    placeholder="Nhập mã hoặc tên chuyên ngành"
                    value={getProfileDash?.major || ""}
                  />
                </div>
                <div className={cx("input-school-specialized")}>
                  <label>Chuyên ngành</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Nhập mã hoặc tên chuyên ngành"
                    value={getProfileDash?.facultyName || ""}
                  />
                </div>
              </div>
            </div>
            <div className={cx("student-input-information")}>
              <div className={cx("input-information-position")}>
                <label>Chức vụ</label>
                <input
                  type="text"
                  name="position"
                  readOnly
                  value={getProfileDash?.roles || ""}
                  placeholder="role"
                />
              </div>
              <div className={cx("input-information-year")}>
                <label>Năm nhập học</label>
                <input
                  type="number"
                  readOnly
                  name="enrollmentYear"
                  value={getProfileDash?.enrollmentYear || ""}
                />
              </div>
              <div className={cx("input-infor-lock")}>
                <label>Khóa</label>
                <input
                  type="number"
                  readOnly
                  name="enrollmentYear"
                  value={getProfileDash?.classNumber || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationComponents;
