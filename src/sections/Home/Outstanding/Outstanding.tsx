import classNames from "classnames/bind";
import styles from "./Outstanding.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/homepage.outstandingbg.png";
export default function Outstanding() {
    return (
        <div className={cx("outstanding")}>
            <div className={cx("head")}>
                <h3>
                    Các thành phần chính nổi bật của Hệ thống Hỗ trợ Học tập Đại
                    học Duy Tân
                </h3>
            </div>
            <div className={cx("content")}>
                <div>
                    <div className={cx("search")}>
                        <h3>Tìm kiếm tài liệu</h3>
                        <p>
                            Hệ thống của chúng tôi cho phép sinh viên dễ dàng
                            tìm kiếm tài liệu học tập cần thiết. Với giao diện
                            thân thiện và dễ sử dụng, sinh viên có thể nhanh
                            chóng truy cập vào các tài liệu liên quan đến môn
                            học của mình.
                        </p>
                    </div>
                    <div className={cx("support")}>
                        <h3>Hệ thống hỗ trợ AI</h3>
                        <p>
                            Hệ thống AI của chúng tôi không chỉ giúp sinh viên
                            tìm kiếm tài liệu mà còn hỗ trợ trong việc phân chia
                            lịch học. AI sẽ đề xuất các tài liệu phù hợp dựa
                            trên nhu cầu và thói quen học tập của từng sinh
                            viên, từ đó giúp cải thiện điểm số và nâng cao khả
                            năng tự học.
                        </p>
                    </div>
                </div>
                <div>
                    <img src={Background} alt="bg" />
                    <div className={cx("propose")}>
                        <h3>Đề xuất tài liệu</h3>
                        <p>
                            Hệ thống AI sẽ phân tích hồ sơ và hành vi người dùng
                            để có thể đề xuất đưa ra các tài liệu phù hợp với
                            từng sinh viên, giúp sinh viên tiết kiệm thời gian
                            hơn trong việc tìm kiếm tài liệu phù hợp, đảm bảo
                            được thời gian học tập của từng sinh viên.
                        </p>
                    </div>
                </div>
                <div>
                    <div className={cx("list-filter")}>
                        <h3>Danh sách tài liệu chọn lọc</h3>
                        <p>
                            Chúng tôi đã tiến hành chọn lọc các tài liệu phù hợp
                            với từng môn học trong chương trình học của trường.
                            Điều này giúp sinh viên tiết kiệm thời gian tìm kiếm
                            và tập trung vào việc học tập hiệu quả hơn.
                        </p>
                    </div>
                    <div className={cx("calendar")}>
                        <h3>Phân chia lịch học</h3>
                        <p>
                            Lịch học sẽ được công cụ AI hỗ trợ để phân tích lịch
                            học ở trường và thời gian biểu hoạt động khác của
                            bạn để đưa ra thời gian học hợp lý, giúp cải thiện
                            và tăng khả năng tiếp thu kiến thức học tập trở nên
                            dễ dàng hơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
