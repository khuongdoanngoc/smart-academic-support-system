import classNames from "classnames/bind";
import styles from "./SeachView.module.scss";
import DocumentIMG from "../../../assets/images/library.document.png";
const cx = classNames.bind(styles);
import FolderIcon from "@mui/icons-material/Folder";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import NotFoundIMG from "../../../assets/images/search-data-notfound.png";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
    searchDocumentByFaculty,
    searchDocumentByFolder,
    searchDocumentBySubject,
    searchDocumentByTitle,
} from "../../../redux/SearchSlice/searchSlice";
import { useLocation } from "react-router-dom";
export default function SearchView() {
    const dispatch = useAppDispatch();
    const query = new URLSearchParams(useLocation().search);
    const value: string | null = query.get("value");
    const searchValue: string = value ?? "";
    const [isNotFound, setIsNotFound] = useState<boolean>(false);

    const [searchBy, setSearchBy] = useState<string>("title");
    const searchData: any = useAppSelector((state) => state.search.data);

    console.log(searchData);
    useEffect(() => {
        switch (searchBy) {
            case "title":
                dispatch(searchDocumentByTitle(searchValue));
                break;
            case "folder":
                dispatch(searchDocumentByFolder(searchValue));
                break;
            case "subject":
                dispatch(searchDocumentBySubject(searchValue));
                break;
            case "faculty":
                dispatch(searchDocumentByFaculty(searchValue));
                break;
            default:
                setIsNotFound(true);
                break;
        }
    }, [searchBy]);

    useEffect(() => {
        if (searchData.length === 0) setIsNotFound(true);
        else setIsNotFound(false);
    }, [searchData.length]);

    return (
        <div className={cx("search-view")}>
            <div className={cx("search-container")}>
                <div className={cx("search-by")}>
                    <button
                        onClick={() => setSearchBy("title")}
                        className={cx(searchBy === "title" && "active")}>
                        Tiêu đề
                    </button>
                    <button
                        onClick={() => setSearchBy("subject")}
                        className={cx(searchBy === "subject" && "active")}>
                        Môn học
                    </button>
                    <button
                        onClick={() => setSearchBy("folder")}
                        className={cx(searchBy === "folder" && "active")}>
                        Thư mục
                    </button>
                    <button
                        onClick={() => setSearchBy("faculty")}
                        className={cx(searchBy === "faculty" && "active")}>
                        Khoa
                    </button>
                </div>
                {!isNotFound ? (
                    <div className={cx("docs-container")}>
                        {searchData.map((data: any, index: number) => {
                            if (searchBy === "title" || searchBy === "folder") {
                                return (
                                    <div key={index} className={cx("doc")}>
                                        <img src={DocumentIMG} alt="" />
                                        <div className={cx("content")}>
                                            <a className={cx("title")} href="#">
                                                {data.title}
                                            </a>
                                            <a
                                                className={cx("subject")}
                                                href="#">
                                                <FolderIcon />
                                                {data.subjectName}
                                            </a>
                                            <span className={cx("faculty")}>
                                                <SchoolIcon />
                                                {data.facultyName}
                                            </span>
                                        </div>
                                        <div className={cx("outstanding")}>
                                            <div className={cx("created-at")}>
                                                <AccessTimeFilledIcon />
                                                <span>20 / 02 / 2024</span>
                                            </div>
                                            <div className={cx("rate")}>
                                                <ThumbUpIcon />
                                                None
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (searchBy === "subject") {
                                return (
                                    <div key={index} className={cx("subject")}>
                                        <FolderIcon
                                            sx={{
                                                color: "#2cc304",
                                                width: "36px",
                                                height: "36px",
                                            }}
                                        />
                                        <a href="#">{data.subjectName}</a>
                                        <span>{data.subjectCode}</span>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className={cx("subject")}>
                                        <FolderIcon
                                            sx={{
                                                color: "#2cc304",
                                                width: "36px",
                                                height: "36px",
                                            }}
                                        />
                                        <a href="#"> {data.facultyName}</a>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : (
                    <img
                        style={{ width: "400px", height: "auto" }}
                        src={NotFoundIMG}
                        alt=""
                    />
                )}
            </div>
        </div>
    );
}
