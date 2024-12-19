import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import { Statistics } from "./Statistics";
import { Docs } from "./Docs";

import staticDocs from "./static-docs.json";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Subjects } from "./Subjects";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getAllDocumentsAction } from "../../../redux/DocumentSlice/documentSlice";

export default function Content() {
    const dispatch = useAppDispatch();
    const documents = useAppSelector((state) => state.document.Documents);

    useEffect(() => {
        dispatch(getAllDocumentsAction(3));
    }, [dispatch]);

    const handleLoadMore = (status: string) => {
        if (status === "loadmore") {
            dispatch(getAllDocumentsAction(9));
        } else {
            dispatch(getAllDocumentsAction(3));
        }
    };

    // configs for pagination
    const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [currentPage, setCurrentPage] = useState<string>(alphabet[-1]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(alphabet[value - 1]);
    };

    const filteredDataList = (data: any[]) => {
        const newListDocuments = [...data];
        if (newListDocuments) {
            return newListDocuments.filter((item) =>
                item.title.toLowerCase().startsWith(currentPage.toLowerCase())
            );
        }
        return [];
    };

    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    {staticDocs.map((data, index) => (
                        <Docs
                            key={index}
                            title={data.title}
                            onLoadMore={handleLoadMore}
                            docs={documents}
                        />
                    ))}
                </div>
                <Statistics />
            </div>
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
            {/* <Subjects /> */}
        </div>
    );
}
