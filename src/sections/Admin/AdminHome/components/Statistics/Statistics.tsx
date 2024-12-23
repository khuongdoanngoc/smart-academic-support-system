import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { formatNumber } from "../../../../../utils/formatNumber";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { getStatsForAdmin } from "../../../../../redux/AdminDashboardSlice/AdminDashboardSlice";
const cx = classNames.bind(styles);

const statsConfig = [
    { key: "totalAdmins", title: "Số lượng quản trị viên" },
    { key: "totalDocuments", title: "Tổng số tài liệu" },
    { key: "totalFolders", title: "Tổng số thư mục" },
    { key: "totalLecturers", title: "Tổng số giảng viên" },
    { key: "totalStudents", title: "Tổng số sinh viên" },
    { key: "totalSubjects", title: "Tổng số môn học" },
];

export default function Statistics() {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.adminDashboard);

    useEffect(() => {
        dispatch(getStatsForAdmin());
    }, []);

    useEffect(() => {
        if (data) {
        }
    }, [data]);

    console.log(data);

    return (
        <div className={cx("statistics")}>
            {statsConfig.map((stat: any, index) => (
                <div className={cx("item")} key={index}>
                    <h3>{stat.title}</h3>
                    <span>{data[stat.key]?.toLocaleString() || 0}</span>
                </div>
            ))}
        </div>
    );
}
