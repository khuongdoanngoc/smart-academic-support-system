import Button, { ButtonSubmit } from "../../../components/Button/Button";
import styles from "./EditProfileComponents.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const EditProfileComponents = () => {
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
                  <input type="text" placeholder="Nguyễn" />
                </div>
                <div className={cx("input-name-firstname")}>
                  <label>Tên</label>
                  <input type="text" placeholder="Quốc Huy" />
                </div>
              </div>
              <div className={cx("individual-input-infor")}>
                <div className={cx("input-infor-date")}>
                  <label>Ngày sinh</label>
                  <input type="date" />
                </div>
                <div className={cx("input-infor-sex")}>
                  <label>Giới tính</label>
                  <select className={cx("infor-sex-select")}>
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
                <div className={cx("input-infor-country")}>
                  <label>Quê quán</label>
                  <input
                    type="text"
                    placeholder="Phong Bình - Gio Linh - Quảng Trị"
                  />
                </div>
              </div>
              <div className={cx("individual-input-contact")}>
                <div className={cx("input-contact-email")}>
                  <label>Email</label>
                  <input type="email" placeholder="caovanan3k@gmail.com" />
                </div>
                <div className={cx("input-contact-phone")}>
                  <label>SĐT</label>
                  <input type="text" placeholder="+84 353940610" />
                </div>
              </div>
            </div>
            <div className={cx("body-individual-submit")}>
              <ButtonSubmit
                titleButton="Lưu thay đổi"
                isSubmitting
                padding={10}
                fontsize={16}
                borderRadius={20}
                background={"#0A75E6"}
              />
            </div>
          </div>
          <div className={cx("main-body-student")}>
            <div className={cx("body-student-title")}>
              <h4>Thông tin cá nhân</h4>
            </div>
            <div className={cx("body-student-input")}>
              <div className={cx("student-input-school")}>
                <div className={cx("input-school-department")}>
                  <label>Khoa - Trường</label>
                  <select>
                    <option>Đào tạo Quốc Tế 1</option>
                    <option>Đào tạo Quốc Tế 2</option>
                  </select>
                </div>
                <div className={cx("input-school-specialized")}>
                  <label>Chuyên ngành</label>
                  <select>
                    <option>Software Technology CMU</option>
                    <option>Software Technology CMU 2</option>
                  </select>
                </div>
              </div>
              <div className={cx("student-input-information")}>
                <div className={cx("input-information-position")}>
                  <label>Chức vụ (Không thể chỉnh sửa)</label>
                  <input type="text" placeholder="Sinh viên" disabled />
                </div>
                <div className={cx("input-information-year")}>
                  <label>Năm nhập học</label>
                  <input
                    type="number"
                    min={2000}
                    max={2030}
                    placeholder="YYYY"
                  />
                </div>
                <div className={cx("input-infor-lock")}>
                  <label>Khóa</label>
                  <select className={cx("infor-lock-select")}>
                    <option>27</option>
                    <option>26</option>
                    <option>25</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={cx("body-individual-submit")}>
              <ButtonSubmit
                titleButton="Lưu thay đổi"
                isSubmitting
                padding={10}
                fontsize={16}
                borderRadius={20}
                background={"#0A75E6"}
              />
            </div>
          </div>
        </div>
        <div className={cx("profile-main-footer")}>
          <Button
            text="Xoá tài khoản"
            paddingX={90}
            paddingY={13}
            fontSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponents;
