import styles from "./Footer.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
export default function Footer() {
    return (
        <footer>
            <div className={cx("footer-content")}>
                <div className={cx("footer-top")}>
                    <div className={cx("document")}>
                        <h1>DUY TAN</h1>
                        <h2>DOCUMENT</h2>
                        <p>
                            Chúng tôi là một kho tàng tài liệu trực tuyến cung
                            cấp một loạt các tài liệu, bải giảng đa dạng và chất
                            lượng, từ marketing, kinh doanh, CNTT, thiết kế đến
                            kỹ năng sống và nhiều ngành, lĩnh vực khác. Với
                            lượng tài liệu phong phú từ các nguồn uy tín, chúng
                            tôi cam kết mang đến cho bạn những tài liệu chất
                            lượng cao và mang tính thực tiễn, giúp bạn đạt hiệu
                            quả cao trong học tập hơn.
                        </p>
                    </div>
                    <div className={cx("list-items")}>
                        <h2>DANH MỤC</h2>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                        <a href="#">Sub content 1</a>
                    </div>
                    <div className={cx("list-items")}>
                        <h2>LIÊN KẾT</h2>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                        <a href="#">Liên kết web 1</a>
                    </div>
                </div>
                <hr />
                <div className={cx("footer-bottom")}>
                    <p>
                        Copyright © 2024 - Bản quyền thuộc về nhóm đồ án
                        Capstone1 C1SE.07
                    </p>
                    <p>
                        Địa chỉ: 254 Nguyễn Văn Linh, Quận Thanh Khê - Tp. Đà
                        Nẵng
                    </p>
                    <p>Điện thoại: (+84) xxx.xxxxxx - (+84) xxx.xxxxxx</p>
                </div>
            </div>
        </footer>
    );
}
