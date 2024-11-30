import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
const cardsData = [
    {
        icon: "/src/assets/images/icons/BoxIcon.png",
        title: "Bắt đầu",
        paragraph:
            "Hướng dẫn sử dụng trang web để tìm kiếm, xem, tải, chia sẻ tài liệu có trong trang web.",
    },
    {
        icon: "/src/assets/images/icons/UserSearchIcon.png",
        title: "Tìm kiếm nâng cao",
        paragraph:
            "Tìm các tài liệu liên quan đến môn học có trong các thư mục hoặc các mục được đánh dấu",
    },
    {
        icon: "/src/assets/images/icons/DocumentUploadIcon.png",
        title: "Tải lên tài liệu",
        paragraph:
            "Các lỗi thường gặp khi tải lên tài liệu và phạm vi nội dung tải lên cho phép của tài liệu.",
    },
    {
        icon: "/src/assets/images/icons/FolderAddIcon.png",
        title: "Tạo thư mục",
        paragraph:
            "Hướng dẫn tạo thư mục đúng cách và thêm tài liệu phù hợp với thư mục của bạn.",
    },
    {
        icon: "/src/assets/images/icons/BoxIcon.png",
        title: "Bắt đầu",
        paragraph:
            "Hướng dẫn sử dụng trang web để tìm kiếm, xem, tải, chia sẻ tài liệu có trong trang web.",
    },
    {
        icon: "/src/assets/images/icons/UserSearchIcon.png",
        title: "Tìm kiếm nâng cao",
        paragraph:
            "Tìm các tài liệu liên quan đến môn học có trong các thư mục hoặc các mục được đánh dấu",
    },
    {
        icon: "/src/assets/images/icons/DocumentUploadIcon.png",
        title: "Tải lên tài liệu",
        paragraph:
            "Các lỗi thường gặp khi tải lên tài liệu và phạm vi nội dung tải lên cho phép của tài liệu.",
    },
    {
        icon: "/src/assets/images/icons/FolderAddIcon.png",
        title: "Tạo thư mục",
        paragraph:
            "Hướng dẫn tạo thư mục đúng cách và thêm tài liệu phù hợp với thư mục của bạn.",
    },
];

export default function Content() {
    return (
        <div className={cx("support-content")}>
            <h3>Bạn cần giúp đỡ ? Chúng tôi luôn hỗ trợ bạn</h3>
            <p>
                Có lẽ bạn có thể tìm thấy câu trả lời trong những hỏi đáp thường
                gặp dưới đây của chùng tôi.
            </p>
            <div className={cx("items")}>
                {cardsData.map((data, index) => (
                    <div key={index} className={cx("item")}>
                        <img src={`${data.icon}`} alt="box" />
                        <h3>{data.title}</h3>
                        <hr style={{ width: "25%" }} />
                        <p>{data.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
