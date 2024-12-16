/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./DocumentsView.module.scss";
const cx = classNames.bind(styles);
import { useEffect, useState } from "react";
import CensorDropdown from "../components/CensorDropdown";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { getAllDocumentsAction } from "../../../../redux/DocumentSlice/documentSlice";

const columns: any[] = [
    {
        id: "docId",
        label: "ID",
        minWidth: 50,
        align: "center",
    },
    { id: "title", label: "Tên tài liệu", minWidth: 170 },
    { id: "subject", label: "Môn học", minWidth: 100 },
    {
        id: "facultyName",
        label: "Khoa",
        minWidth: 100,
        align: "center",
    },
    {
        id: "accountId",
        label: "Tác giả",
        minWidth: 100,
        align: "center",
    },
    {
        id: "type",
        label: "Loại",
        minWidth: 100,
        align: "center",
    },
    {
        id: "isActive",
        label: "Hiển thị",
        minWidth: 100,
        align: "center",
    },
];

export default function DocumentsView() {
    const [censor, setCensor] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const documents = useAppSelector((state: any) => state.document.Documents);

    console.log(documents);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllDocumentsAction());
    }, [dispatch]);

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
                rows={filterByClassify(documents, censor, searchValue)}
            />
        </div>
    );
}
