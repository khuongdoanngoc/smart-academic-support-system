import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { formatNumber } from "../../../../../utils/formatNumber";
const cx = classNames.bind(styles);

const statisticTitle = [
    "Tổng số sinh viên",
    "Tổng số giảng viên",
    "Tổng số sách trong thư viện",
    "Tổng số thư mục",
    "Tổng số tài liệu",
    "Tổng số môn học",
    "Số lượng quản trị viên",
    "Số lượng kiểm duyệt",
];

export default function Statistics() {
    return (
        <div className={cx("statistics")}>
            {statisticTitle.map((title, index) => (
                <div className={cx("item")} key={index}>
                    <h3>{title}</h3>
                    <span>{formatNumber(5000)}</span>
                </div>
            ))}
        </div>
    );
}
