/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./DocumentsView.module.scss";
const cx = classNames.bind(styles);
import { useEffect, useState } from "react";
import CensorDropdown from "../components/CensorDropdown";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
    approveDocuments,
    checkDocument,
    clearError,
    clearMessage,
    deleteDocuments,
    getDocumentsForAdmin,
} from "../../../../redux/AdminDashboardSlice/AdminDashboardSlice";
import AlertDialog from "../../Users/components/AlertDialog";
import ApproveDialog from "../../Users/components/ApproveDialog";
import Loader from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";

const columns: any[] = [
    {
        id: "docId",
        label: "ID",
        minWidth: 50,
        align: "center",
    },
    { id: "title", label: "Tên tài liệu", minWidth: 170 },
    { id: "subjectName", label: "Môn học", minWidth: 100 },
    {
        id: "folderName",
        label: "Thư mục",
        minWidth: 100,
        align: "center",
    },
    {
        id: "createdAt",
        label: "Ngày tạo",
        minWidth: 120,
        align: "center",
    },
    {
        id: "authorName",
        label: "Tác giả",
        minWidth: 100,
        align: "center",
    },
    {
        id: "isActive",
        label: "Phê duyệt",
        minWidth: 100,
        align: "center",
    },
];

const censorValues: any = [
    { code: "docId", title: "ID" },
    { code: "title", title: "Tên tài liệu" },
    { code: "subjectName", title: "Môn học" },
    { code: "folderName", title: "Thư mục" },
    { code: "authorName", title: "Tác giả" },
    { code: "isActive", title: "Phê duyệt" },
];

export default function DocumentsView() {
    const [censor, setCensor] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [page, setPage] = useState(0);
    const [data, setData] = useState<any>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const documents: any[] = useAppSelector(
        (state: any) => state.adminDashboard.documents?.content
    );

    const { loading, successMessage,error } = useAppSelector(
        (state) => state.adminDashboard
    );

    useEffect(() => {
        if (documents && documents.length !== 0) {
            setData(documents);
        }
    }, [documents]);

    useEffect(() => {
        dispatch(getDocumentsForAdmin(200));
    }, [dispatch]);

    const handleClassifyChange = (value: string) => {
        setCensor(value);
    };

    const filterByClassify: any = (
        rows: any[],
        censor: string,
        searchValue: string
    ) => {
        if (censor !== "") {
            return rows.filter((item) => {
                if (typeof item[censor] === "string")
                    return item[censor]?.startsWith(searchValue);
                else if (typeof item[censor] === "boolean") {
                    console.log(item);
                    if (searchValue === "checked") {
                        return item[censor] === true;
                    } else {
                        return item[censor] === false;
                    }
                } else if (typeof item[censor] === "number") {
                    return item[censor] === parseInt(searchValue);
                }
            });
        }
        return rows;
    };

    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [openApproveDialog, setOpenApproveDialog] = useState(false);

    const handleOpenAlertDialog = () => {
        if (selectedIds.length !== 0) {
            setOpenAlertDialog(true);
        } else {
            toast.error("Phải chọn ít nhất 1 tài liệu");
        }
    };
    const handleOpenApproveDialog = () => {
        if (selectedIds.length !== 0) {
            setOpenApproveDialog(true);
        } else {
            toast.error("Phải chọn ít nhất 1 tài liệu");
        }
    };
    const handleCloseAlertDialog = () => setOpenAlertDialog(false);
    const handleCloseApproveDialog = () => setOpenApproveDialog(false);

    const handleDeleteUsers = () => {
        try {
            dispatch(deleteDocuments(selectedIds));
        } catch (error:any) {
            toast.error("Xảy ra lỗi, vui lòng thử lại sau");
        }
    };

    const handleApproveDocuments = () => {
        try {
            dispatch(approveDocuments(selectedIds));
        } catch (error:any) {
            toast.error("Xảy ra lỗi, vui lòng thử lại sau");
        }
    };

    const handleReloadTable = () => {
        try {
            dispatch(getDocumentsForAdmin(200));
        } catch (error) {
            console.log(error);
            toast.error("Xảy ra lỗi, vui lòng thử lại sau");
        }
    };

    const handleCheckDocument = () => {
        try {
            if (selectedIds.length !== 1) {
                toast.error("Chọn duy nhất 1 tài liệu để kiểm tra");
                return;
            }
            dispatch(checkDocument(selectedIds[0]));
        } catch (error) {
            console.log(error);
            toast.error("Xảy ra lỗi, vui lòng thử lại sau");
        }
    };

    useEffect(() => {
        if (successMessage !== "") {
            if (openAlertDialog) {
                setOpenAlertDialog(false);
            } else {
                setOpenApproveDialog(false);
            }
            toast.success(successMessage);
            dispatch(clearMessage());
            setSelectedIds([]);
            handleReloadTable();
        }
    }, [successMessage]);

    useEffect(() => {
        if (error !== "") {
            if (openAlertDialog) {
                setOpenAlertDialog(false);
            } else {
                setOpenApproveDialog(false);
            }
            toast.error(error);
            dispatch(clearError());
            setSelectedIds([]);
            handleReloadTable();
        }
    }, [error]);

    const activeFilter = (
        <div className={cx("search-container")}>
            <select
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}>
                <option defaultChecked value="unchecked">
                    Chưa phê duyệt
                </option>
                <option value="checked">Đã phê duyệt</option>
            </select>
        </div>
    );


    return (
        <div className={cx("admin-documents-view")}>
            <span>DTUDASHBOARD / Tài liệu</span>
            <div className={cx("actions")}>
                <CensorDropdown
                    censor={censor}
                    onDropdownChange={handleClassifyChange}
                    values={censorValues}
                />
                {censor === "isActive" ? (
                    activeFilter
                ) : (
                    <div className={cx("search-container")}>
                        <input
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            value={searchValue}
                            placeholder={`Lọc dữ liệu...`}
                            disabled={censor === ""}
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
                    <button
                        onClick={handleCheckDocument}
                        className={cx("reload-btn")}>
                        Kiểm tra
                    </button>
                    <button
                        onClick={handleOpenAlertDialog}
                        className={cx("delete-btn")}>
                        Xoá
                    </button>
                    <button
                        onClick={handleOpenApproveDialog}
                        className={cx("censor-btn")}>
                        Duyệt tài liệu mới
                    </button>
                </div>
            </div>

            {loading ? (
                <Loader height={1} />
            ) : (
                <DataTable
                    page={page}
                    setPage={setPage}
                    columns={columns}
                    rows={filterByClassify(data, censor, searchValue)}
                    topic="document"
                    selectedDocuments={selectedIds}
                    setSelectedDocuments={setSelectedIds}
                />
            )}
            <AlertDialog
                open={openAlertDialog}
                onClose={handleCloseAlertDialog}
                onDelete={handleDeleteUsers}
                ids={selectedIds}
                title="tài liệu"
            />
            <ApproveDialog
                open={openApproveDialog}
                onClose={handleCloseApproveDialog}
                onApprove={handleApproveDocuments}
                ids={selectedIds}
                title="tài liệu"
            />
        </div>
    );
}
