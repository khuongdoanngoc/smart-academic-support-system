import classNames from "classnames/bind";
import styles from "./Chart.module.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import { useAppSelector } from "../../../../../redux/store";

const cx = classNames.bind(styles);
const colors: string[] = ["#DC4342", "#E6E8EC"];
export default function Chart() {
    const { data }: any = useAppSelector((state) => state.adminDashboard);

    return (
        <div className={cx("admin-chart-container")}>
            <h3>Tổng số tài liệu</h3>
            <h2>{data.totalDocuments}</h2>
            <h4>
                <span>2.1% </span> vs last week
            </h4>
            <p>Quantity from 1-12 Dec, 2024</p>
            <BarChart
                xAxis={[
                    {
                        scaleType: "band",
                        data: [
                            "01",
                            "02",
                            "03",
                            "04",
                            "05",
                            "06",
                            "07",
                            "08",
                            "09",
                            "10",
                            "11",
                            "12",
                        ],
                    },
                ]}
                series={[
                    { data: [4, 3, 5, 7, 2, 6, 4, 8, 3, 5, 4, 6] },
                    { data: [1, 6, 3, 4, 7, 2, 5, 3, 6, 4, 5, 2] },
                ]}
                sx={{ width: "100%" }}
                height={300}
                colors={colors}
            />
            <div className={cx("symbol")}>
                <div>
                    <span className={cx("red")}></span>
                    Last 6 days
                </div>
                <div>
                    <span></span>
                    Last week
                </div>
            </div>
        </div>
    );
}
