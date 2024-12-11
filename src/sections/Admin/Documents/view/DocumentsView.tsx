import classNames from "classnames/bind";
import styles from "./DocumentsView.module.scss";
const cx = classNames.bind(styles);
import { useEffect, useState } from "react";
import CensorDropdown from "../components/CensorDropdown";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { getAllDocuments } from "../../../../redux/DocumentSlice/documentSlice";

const columns: any[] = [
    { id: "name", label: "Tên tài liệu", minWidth: 170 },
    { id: "subject", label: "Môn học", minWidth: 100 },
    {
        id: "folder",
        label: "Thư mục",
        minWidth: 100,
        align: "center",
    },
    {
        id: "author",
        label: "Tác giả",
        minWidth: 100,
        align: "center",
    },
    {
        id: "createdAt",
        label: "Ngày đăng",
        minWidth: 100,
        align: "center",
    },
    {
        id: "isDisplayed",
        label: "Hiển thị",
        minWidth: 100,
        align: "center",
    },
    {
        id: "reviewer",
        label: "Người duyệt",
        minWidth: 100,
        align: "center",
    },
];

interface Data {
    id: number;
    name: string;
    subject: string;
    folder: string;
    author: string;
    createdAt: string;
    isDisplayed: boolean;
    reviewer: string;
}

function createData(
    id: number,
    name: string,
    subject: string,
    folder: string,
    author: string,
    createdAt: string,
    isDisplayed: boolean,
    reviewer: string
): Data {
    return {
        id,
        name,
        subject,
        folder,
        author,
        createdAt,
        isDisplayed,
        reviewer,
    };
}

const rows = [
    createData(
        1,
        "Tài liệu 1",
        "Toán",
        "Thư mục 1",
        "Tác giả 1",
        "2024-01-01",
        true,
        "Người duyệt 1"
    ),
    createData(
        2,
        "Tài liệu 2",
        "Văn",
        "Thư mục 2",
        "Tác giả 2",
        "2024-01-02",
        false,
        "Người duyệt 2"
    ),
    createData(
        3,
        "Tài liệu 3",
        "Lý",
        "Thư mục 3",
        "Tác giả 3",
        "2024-01-03",
        true,
        "Người duyệt 3"
    ),
];

export default function DocumentsView() {
    const [censor, setCensor] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    // const documents = useSelector((state: any) => state.document.Documents);

    // console.log(documents);

    // const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //     dispatch(getAllDocuments());
    // }, []);

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

    const handleClassifyChange = (value: string) => {
        setCensor(value);
    };

    return (
        <div className={cx("admin-documents-view")}>
            <span>DTUDASHBOARD / Tài liệu</span>
            <div className={cx("actions")}>
                <CensorDropdown
                    censor={censor}
                    onDropdownChange={handleClassifyChange}
                />
                {censor !== "" && (
                    <div className={cx("search-container")}>
                        <input
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            value={searchValue}
                            placeholder={`Nhập tên ${censor}...`}
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
                )}
                <div className={cx("rightActions")}>
                    <button className={cx("delete-btn")}>Xoá</button>
                    <button className={cx("censor-btn")}>
                        Duyệt người dùng mới
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
