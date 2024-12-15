import classNames from "classnames/bind";
import styles from "./UsersView.module.scss";
const cx = classNames.bind(styles);
import { useState } from "react";
import CensorDropdown from "../../Documents/components/CensorDropdown";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../Documents/components/DataTable";

const columns: any[] = [
    { id: "id", label: "Mã sinh viên", minWidth: 170 },
    { id: "firstName", label: "Họ", minWidth: 100 },
    {
        id: "lastName",
        label: "Tên",
        minWidth: 100,
        align: "center",
    },
    {
        id: "dateOfBirth",
        label: "Ngày sinh",
        minWidth: 100,
        align: "center",
    },
    {
        id: "gender",
        label: "Giới tính",
        minWidth: 100,
        align: "center",
    },
    {
        id: "hometown",
        label: "Quê quán",
        minWidth: 100,
        align: "center",
    },
    {
        id: "role",
        label: "Chức vụ",
        minWidth: 100,
        align: "center",
    },
];

interface Data {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    hometown: string;
    role: string;
}

function createData(
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    hometown: string,
    role: string
): Data {
    return {
        id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        hometown,
        role,
    };
}

const rows = [
    createData(
        27211242554,
        "Nguyễn",
        "Văn A",
        "1990-01-01",
        "Nam",
        "Hà Nội",
        "Sinh viên"
    ),
    createData(
        27211242554,
        "Trần",
        "Thị B",
        "1992-02-02",
        "Nữ",
        "Hồ Chí Minh",
        "Giảng viên"
    ),
    createData(
        27211242554,
        "Lê",
        "Văn C",
        "1994-03-03",
        "Nam",
        "Đà Nẵng",
        "Sinh viên"
    ),
];
export default function UsersView() {
    const [censor, setCensor] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const handleClassifyChange = (value: string) => {
        setCensor(value);
    };

    const filterByClassify: any = (
        rows: any[],
        censor: string,
        searchValue: string
    ) => {
        if (censor !== "") {
            return rows.filter((item) => item[censor].startsWith(searchValue));
        }
        return rows;
    };

    return (
        <div className={cx("admin-users-view")}>
            <span>DTUDASHBOARD / Người dùng</span>
            <div className={cx("actions")}>
                <CensorDropdown
                    censor={censor}
                    onDropdownChange={handleClassifyChange}
                />
                <div className={cx("search-container")}>
                    <input
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        value={searchValue}
                        placeholder="Nhập tên phân loại..."
                        type="text"
                    />
                    <SearchIcon
                        style={{
                            color: "#757575",
                            position: "absolute",
                            top: "50%",
                            right: "15px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                        }}
                    />
                </div>
                <div className={cx("rightActions")}>
                    <button className={cx("delete-btn")}>Xoá</button>
                    <button className={cx("censor-btn")}>
                        Duyệt tài liệu mới
                    </button>
                </div>
            </div>
            <DataTable
                columns={columns}
                rows={filterByClassify(rows, censor, searchValue)}
            />
        </div>
    );
}
