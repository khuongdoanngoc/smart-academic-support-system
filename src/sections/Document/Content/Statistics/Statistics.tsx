import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
const cx = classNames.bind(styles);

const fakeStatistics: { [key: string]: number } = {
    "Tổng số sinh viên": 5000,
    "Tổng số giảng viên": 300,
    "Tổng số sách trong thư viện": 1200,
    "Tổng số khoá học": 500,
    "Tổng số tài liệu": 30000,
    "Tổng số môn học": 365,
};

export default function Statistics() {
    return (
        <div className={cx("statistics")}>
            {Object.entries(fakeStatistics).map(([key, value], index) => (
                <div key={index}>
                    <p>{key}:</p>
                    <span>{value.toLocaleString("vi-VN")}</span>
                </div>
            ))}
            <hr />
            <div>
                <p>Tổng số tài liệu đã đọc:</p>
                <span>...</span>
            </div>
            <div>
                <p>Tổng số sách đã thuê:</p>
                <span>...</span>
            </div>
        </div>
    );
}
