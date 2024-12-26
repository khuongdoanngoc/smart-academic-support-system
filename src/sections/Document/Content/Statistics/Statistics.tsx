import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { useAppSelector } from "../../../../redux/store";
import Loader from "../../../../components/Loader/Loader";
const cx = classNames.bind(styles);

const statisticsLabels: { [K in keyof StatisticsData]: string } = {
    totalStudents: "Tổng số sinh viên",
    totalLecturers: "Tổng số giảng viên",
    totalDocuments: "Tổng số tài liệu",
    totalFolders: "Tổng số thư mục",
    totalSubjects: "Tổng số môn học",
};

interface StatisticsData {
    totalStudents: number;
    totalLecturers: number;
    totalDocuments: number;
    totalFolders: number;
    totalSubjects: number;
}

interface StatisticsProps {
    data: StatisticsData;
}

export default function Statistics({ data }: StatisticsProps) {
    const { loading } = useAppSelector((state) => state.stats);

    if (loading) {
        return <Loader height={20} />;
    }

    return (
        <div className={cx("statistics")}>
            {Object.entries(data).map(([key, value], index) => {
                if (key !== "totalAdmins") {
                    return (
                        <div key={index}>
                            <p>
                                {statisticsLabels[key as keyof StatisticsData]}:
                            </p>
                            <span>{value.toLocaleString("vi-VN")}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}
