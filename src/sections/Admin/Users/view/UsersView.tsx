import classNames from "classnames/bind";
import styles from "./UsersView.module.scss";
const cx = classNames.bind(styles);
import { useEffect, useState } from "react";
import CensorDropdown from "../../Documents/components/CensorDropdown";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../Documents/components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
    approveUsers,
    clearError,
    deleteUsers,
    getUsersForAdmin,
} from "../../../../redux/AdminDashboardSlice/AdminDashboardSlice";
import AlertDialog from "../components/AlertDialog";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader/Loader";
import ApproveDialog from "../components/ApproveDialog";

const columns: any[] = [
    { id: "accountId", label: "ID", width: 50 },
    { id: "firstName", label: "Họ", minWidth: 100 },
    {
        id: "lastName",
        label: "Tên",
        minWidth: 100,
        align: "center",
    },
    {
        id: "email",
        label: "Email",
        minWidth: 100,
        align: "center",
    },
    {
        id: "birthDate",
        label: "Ngày sinh",
        minWidth: 120,
        align: "center",
    },
    {
        id: "gender",
        label: "Giới tính",
        minWidth: 90,
        align: "center",
    },
    // {
    //     id: "hometown",
    //     label: "Quê quán",
    //     minWidth: 100,
    //     align: "center",
    // },
    {
        id: "role",
        label: "Chức vụ",
        minWidth: 50,
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
    { code: "accountId", title: "ID" },
    { code: "firstName", title: "Họ" },
    { code: "lastName", title: "Tên" },
    { code: "email", title: "Email" },
    { code: "role", title: "Chức vụ" },
    { code: "isActive", title: "Phê duyệt" },
];

export default function UsersView() {
    const [censor, setCensor] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [page, setPage] = useState(0);
    const [data, setData] = useState<any>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    const users: any[] = useAppSelector(
        (state: any) => state.adminDashboard.users?.content
    );

    const { loading, successMessage, error } = useAppSelector(
        (state) => state.adminDashboard
    );

    useEffect(() => {
        if (users && users.length !== 0) {
            setData(users);
        }
    }, [users]);

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

    useEffect(() => {
        dispatch(getUsersForAdmin(100));
    }, [dispatch]);

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

    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [openApproveDialog, setOpenApproveDialog] = useState(false);

    const handleOpenAlertDialog = () => {
        if (selectedIds.length !== 0) {
            setOpenAlertDialog(true);
        } else {
            toast.error("Phải chọn ít nhất 1 tài khoản");
        }
    };
    const handleOpenApproveDialog = () => {
        if (selectedIds.length !== 0) {
            setOpenApproveDialog(true);
        } else {
            toast.error("Phải chọn ít nhất 1 tài khoản");
        }
    };
    const handleCloseAlertDialog = () => setOpenAlertDialog(false);
    const handleCloseApproveDialog = () => setOpenApproveDialog(false);

    const handleDeleteUsers = () => {
        dispatch(deleteUsers(selectedIds));
    };

    const handleApproveUsers = () => {
        dispatch(approveUsers(selectedIds));
    };

    const handleReloadTable = () => {
        try {
            dispatch(getUsersForAdmin(100));
        } catch (error) {
            console.log(error);
            toast.error("Xảy ra lỗi, vui lòng thử lại sau");
        }
    };

    useEffect(() => {
        if (successMessage !== "") {
            if (openAlertDialog) {
                setOpenAlertDialog(false);
            }
            if (openApproveDialog) {
                setOpenApproveDialog(false);
            }
            setSelectedIds([]);
            handleReloadTable();
            toast.success(successMessage);
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


    return (
        <div className={cx("admin-users-view")}>
            <span>DTUDASHBOARD / Người dùng</span>
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
                        onClick={handleReloadTable}
                        className={cx("reload-btn")}>
                        Tải lại
                    </button>
                    <button
                        onClick={handleOpenAlertDialog}
                        className={cx("delete-btn")}>
                        Xoá
                    </button>
                    <button
                        onClick={handleOpenApproveDialog}
                        className={cx("censor-btn")}>
                        Duyệt người dùng mới
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
                    topic="user"
                    selectedDocuments={selectedIds}
                    setSelectedDocuments={setSelectedIds}
                />
            )}
            <AlertDialog
                open={openAlertDialog}
                onClose={handleCloseAlertDialog}
                onDelete={handleDeleteUsers}
                ids={selectedIds}
                title="tài khoản"
            />
            <ApproveDialog
                open={openApproveDialog}
                onClose={handleCloseApproveDialog}
                onApprove={handleApproveUsers}
                ids={selectedIds}
                title="tài khoản"
            />
        </div>
    );
}
