import classNames from "classnames/bind";
import styles from "./Subjects.module.scss";
const cx = classNames.bind(styles);

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const fakeSubjects = [
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Anh văn chuyên ngành 1", files: 100 },
    { title: "Bóng đá sơ cấp", files: 30 },
    { title: "Bóng đá sơ cấp", files: 30 },
];

export default function Subjects() {
    const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [currentPage, setCurrentPage] = useState<string>(alphabet[0]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(alphabet[value - 1]);
    };

    const filteredDataList = (data: any[]) => {
        return data.filter((item) =>
            item.title.toLowerCase().startsWith(currentPage.toLowerCase())
        );
    };

    return (
        <div className={cx("subjects")}>
            <h2>Môn học</h2>
            <Pagination
                count={alphabet.length}
                defaultPage={1}
                siblingCount={7}
                onChange={handlePageChange}
                variant="outlined"
                renderItem={(item: any) => (
                    <PaginationItem
                        sx={{
                            margin: "0 6px",
                            fontFamily: "Inter",
                        }}
                        {...item}
                        page={alphabet[item.page - 1]}
                    />
                )}
            />
            {/* subjects */}
            <div>
                {filteredDataList(fakeSubjects).map((data, index) => (
                    <div className={cx("subject")} key={index}>
                        <DescriptionIcon
                            sx={{ width: "35px", height: "35px" }}
                        />
                        <div>
                            <h3>{data.title}</h3>
                            <span>{data.files} tệp</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
